import {asyncHandler} from "../utils/asyncHandler.js";
import { encryptText, decryptText } from "../utils/crypto.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import EncrptData from "../models/User.js"
import Jimp from "jimp";
import path from "path";
import fs from "fs"
// Encrypt and Store
export const encryptData = asyncHandler(async (req, res) => {
  const { plainText } = req.body;

  if (!plainText) {
    throw new ApiError("",400, "Missing plain text to encrypt.");
  }

  const encrypted = encryptText(plainText);
  const ifexist=await EncrptData.findOne(encrypted)
  //update the existing one 
  // Save to MongoDB
  const newEncryptedData = new EncrptData({
    encryptedData: encrypted.encryptedData,
    iv: encrypted.iv
  });

  await newEncryptedData.save();

  res.status(200).json(new ApiResponse(200, {
    encryptedText: encrypted.encryptedData
  }, "Data encrypted and stored successfully."));
});

// Decrypt
export const decryptData = asyncHandler(async (req, res) => {
  const { encryptedCode } = req.body; // Encrypted text entered by user
  console.log(encryptedCode);
  
  if (!encryptedCode) {
    throw new ApiError("",400, "Encrypted code is required.");
  }

  // Find matching encrypted data in DB
  const record = await EncrptData.findOne({ encryptedData: encryptedCode });

  if (!record) {
    throw new ApiError("",404, "Encrypted data not found in database.");
  }

  const { encryptedData, iv } = record;

  try {
    const decrypted = decryptText({ encryptedData, iv });
    res.status(200).json(new ApiResponse(200, {
      decryptedText: decrypted
    }, "Decryption successful."));
  } catch (error) {
    throw new ApiError("",401, "Decryption failed", "Invalid format or key.");
  }
});




function stringToBinary(str) {
  return str.split('').map(char =>
    char.charCodeAt(0).toString(2).padStart(8, '0')
  ).join('');
}

export const storeEncryptedInImage = asyncHandler(async (req, res) => {
  const { plainText } = req.body;
  const image = req.file;
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file);

  if (!plainText || !image) {
    throw new ApiError("", 400, "Text or image file is missing.");
  }

  // Add delimiter at the end
  const secret = plainText + '|END|';
  const binaryData = stringToBinary(secret);

  const img = await Jimp.read(image.path);
  let pixelIndex = 0;

  for (let i = 0; i < binaryData.length; i += 3) {
    const x = pixelIndex % img.bitmap.width;
    const y = Math.floor(pixelIndex / img.bitmap.width);
    if (y >= img.bitmap.height) break;

    const pixel = Jimp.intToRGBA(img.getPixelColor(x, y));

    pixel.r = (pixel.r & 0xFE) | parseInt(binaryData[i] || '0');
    pixel.g = (pixel.g & 0xFE) | parseInt(binaryData[i + 1] || '0');
    pixel.b = (pixel.b & 0xFE) | parseInt(binaryData[i + 2] || '0');

    img.setPixelColor(Jimp.rgbaToInt(pixel.r, pixel.g, pixel.b, pixel.a), x, y);
    pixelIndex++;
  }

  const outputPath = path.join("uploads", "encoded_" + path.parse(image.originalname).name + ".png");
  await img.writeAsync(outputPath);

  // Send image for download
  res.download(outputPath, "Encrypted_Image.png", err => {
    if (err) {
      throw new ApiError("",500, "Error sending the file.");
    }

    // Optional: delete the file after sending
    // fs.unlink(outputPath, () => {});
  });
});
// Extract & decrypt from image
function binaryToString(binary) {
  let result = '';
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.slice(i, i + 8);
    result += String.fromCharCode(parseInt(byte, 2));
  }
  return result;
}


export const decryptFromImage = asyncHandler(async (req, res) => {
  const image = req.file;
  if (!image) throw new ApiError("", 400, "No image provided.");

  const img = await Jimp.read(image.path);
  const binaryData = [];

  for (let y = 0; y < img.bitmap.height; y++) {
    for (let x = 0; x < img.bitmap.width; x++) {
      const pixel = Jimp.intToRGBA(img.getPixelColor(x, y));

      binaryData.push((pixel.r & 1).toString());
      binaryData.push((pixel.g & 1).toString());
      binaryData.push((pixel.b & 1).toString());
    }
  }

  const extractedText = binaryToString(binaryData.join(''));
  const endIndex = extractedText.indexOf('|END|');
  
  if (endIndex === -1) {
    throw new ApiError("", 400, "No end delimiter found. Possibly corrupted image.");
  }

  const plainText = extractedText.substring(0, endIndex);

  return res.status(200).json(new ApiResponse(200, {
    text: plainText
  }, "Text extracted from image successfully."));
});
