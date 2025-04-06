import { useState, useRef } from "react";
import useEncryptionStore from "../store/encryptionStore.js";
import React from "react";
import toast from "react-hot-toast";

function Decrypt() {
  const [encryptedText, setEncryptedText] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const { decryptedText, storedImageData, decryptText, retrieveFromImage } = useEncryptionStore();

  const handleTextDecrypt = () => {
    if (!encryptedText.trim()) {
      toast.error("❗ Text is required for decryption.");
      return;
    }
    decryptText(encryptedText);
    toast.success("✅ Text decrypted!");
  };

  const handleImageRetrieve = () => {
    if (!image) {
      toast.error("❗ Please upload an image first.");
      return;
    }
    retrieveFromImage(image);
    toast.success("🖼️ Data retrieved from image!");
  };

  const handlePasteImage = async () => {
    const clipboardItems = await navigator.clipboard.read();
    for (const item of clipboardItems) {
      const blob = await item.getType("image/png");
      setImage(blob);
      toast.success("📥 Image pasted from clipboard.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">🔓 Decrypt Data</h2>

      {/* Decrypt Text */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold">Decrypt Encrypted Text</h3>
        <input
          type="text"
          className="border p-2 rounded w-full mt-2"
          placeholder="Enter encrypted text..."
          value={encryptedText}
          onChange={(e) => setEncryptedText(e.target.value)}
        />
        <button
          onClick={handleTextDecrypt}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-4 rounded transition"
        >
          Decrypt Text
        </button>
        {decryptedText && (
          <div className="mt-4 bg-gray-100 p-4 rounded shadow">
            <p className="font-medium text-gray-700">Decrypted Text:</p>
            <p>{decryptedText}</p>
          </div>
        )}
      </div>

      {/* Retrieve From Image */}
      <div>
        <h3 className="text-xl font-semibold">Retrieve Data from Image</h3>
        <input
          type="file"
          accept="image/*"
          className="border p-2 rounded w-full mt-2"
          onChange={(e) => setImage(e.target.files[0])}
          ref={fileInputRef}
        />

        <div className="flex gap-3 mt-4 flex-wrap">
          <button
            onClick={handleImageRetrieve}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            Retrieve from Image
          </button>
          <button
            onClick={handlePasteImage}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
          >
            📋 Paste Image
          </button>
        </div>

        {storedImageData && (
          <div className="mt-4 bg-gray-100 p-4 rounded shadow">
            <p className="font-medium text-gray-700">Data from Image:</p>
            <p>{storedImageData}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Decrypt;
