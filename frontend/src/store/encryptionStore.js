import { create } from "zustand";
import axios from "axios";

const useEncryptionStore = create((set) => ({
  encryptedText: "",
  decryptedText: "",
  storedImageData: "",
  
  encryptText: async (text) => {
    try {
      const response = await axios.post("http://localhost:5000/v1/encrypt", { plainText:text });
      return response.data.data.encryptedText;
    } catch (error) {
      console.error("Error encrypting data:", error);
    }
  },

  decryptText: async (encryptedText) => {
    try {
      const response = await axios.post("http://localhost:5000/v1/decrypt", {encryptedCode: encryptedText });
      set({ decryptedText: response.data.data.decryptedText });
    } catch (error) {
      console.error("Error decrypting data:", error);
    }
  },

  storeInImage: async (text, image) => {
    console.log(text);
    
    const formData = new FormData();
    formData.append('plainText', text); // ✅ this should match backend: req.body.plainText
    formData.append('image', image);    // ✅ this should match backend: req.file
  
    const response = await axios.post('http://localhost:5000/v1/encrypt-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob', // so we can generate a downloadable image
    });
  
    return URL.createObjectURL(response.data); // for preview
  },

  retrieveFromImage: async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    // console.log(image);
    
    try {
      const response = await axios.post("http://localhost:5000/v1/decrypt-image", formData,{ 
         headers: {
        'Content-Type': 'multipart/form-data',
      }});
      console.log(response);

      set({ storedImageData: response.data.data.text });
    } catch (error) {
      console.error("Error retrieving data from image:", error);
    }
  },
}));

export default useEncryptionStore;
