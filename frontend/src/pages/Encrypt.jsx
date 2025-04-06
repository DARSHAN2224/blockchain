import { useState, useRef } from "react";
import useEncryptionStore from "../store/encryptionStore.js";
import React from "react";
import toast from "react-hot-toast";

function Encrypt() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [encryptedText, setEncryptedText] = useState("");
  const [encodedImageUrl, setEncodedImageUrl] = useState("");
  const fileInputRef = useRef(null);
  const { encryptText, storeInImage } = useEncryptionStore();

  const handleEncrypt = async () => {
    if (!text.trim()) {
      toast.error("❗ Please enter text to encrypt.");
      return;
    }
    const encrypted = await encryptText(text);
    setEncryptedText(encrypted);
    toast.success("🔐 Text encrypted successfully!");
  };

  const handleStoreInImage = async () => {
    if (!text.trim()) {
      toast.error("❗ Enter text before storing in image.");
      return;
    }
    if (!image) {
      toast.error("❗ Please select or paste an image.");
      return;
    }
    try {
      const imageUrl = await storeInImage(text, image);
      setEncodedImageUrl(imageUrl);
      toast.success("🖼️ Data stored in image successfully!");
    } catch (error) {
      console.error("Store error:", error);
      toast.error("❌ Failed to store data in image.");
    }
  };

  const handleCopy = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("📋 Copied to clipboard!");
    } catch {
      toast.error("❌ Copy failed.");
    }
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
      <h2 className="text-3xl font-bold mb-4">🔐 Encrypt Data</h2>

      <input
        type="text"
        className="border p-2 rounded w-full mt-2"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        className="border p-2 w-full mt-2 rounded"
        onChange={(e) => setImage(e.target.files[0])}
        ref={fileInputRef}
      />

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          onClick={handleEncrypt}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Encrypt Text
        </button>
        <button
          onClick={handleStoreInImage}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Store in Image
        </button>
        <button
          onClick={handlePasteImage}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
        >
          📋 Paste Image
        </button>
      </div>

      {encryptedText && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Encrypted Text:</h3>
          <p className="break-all">{encryptedText}</p>
          <button
            onClick={() => handleCopy(encryptedText)}
            className="mt-3 bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-800"
          >
            Copy Text
          </button>
        </div>
      )}

      {encodedImageUrl && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Encoded Image:</h3>
          <img src={encodedImageUrl} alt="Encoded" className="w-full max-w-md border rounded" />
          <a
            href={encodedImageUrl}
            download="encrypted-image.png"
            className="inline-block mt-3 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}

export default Encrypt;
