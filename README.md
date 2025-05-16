# 🔐 Blockchain-Based Secure Data Storage with Image Encryption

A full-stack decentralized application (dApp) that **encrypts user data**, embeds it into an **image**, and allows **secure decryption** later. Built with **Node.js**, **React.js**, and **MongoDB**, this project integrates blockchain principles for data immutability and security, ensuring that your text data is **securely hidden inside images** — an innovative blend of **encryption + steganography + blockchain logic**.

🚀 Features

* 🔒 **Text Encryption** – Encrypt any text securely using AES or similar encryption methods.
* 🖼️ **Image Embedding** – Encrypted text is embedded into an image and stored.
* 🧠 **Decryption Functionality** – Retrieve and decrypt your data back from the image.
* 🛡️ **Blockchain Logic** – Ensures data immutability and traceability.
* 🧰 **Full Stack** – Node.js backend, React frontend, and MongoDB database.


🌐 Tech Stack

| Tech                              | Usage                             |
| --------------------------------- | --------------------------------- |
| **React.js**                      | Frontend UI for data input/output |
| **Node.js**                       | Backend API & encryption logic    |
| **MongoDB**                       | Stores metadata and image data    |
| **CryptoJS**                      | Text encryption/decryption        |
| **Multer**                        | Image upload handling             |
| **Steganography.js** (or similar) | Embed/extract text from image     |


🛠️ Project Structure

```
📦 blockchain-image-storage
├── client          # React Frontend
│   ├── components
│   ├── pages
│   └── ...
├── server          # Node.js Backend
│   ├── routes
│   ├── controllers
│   └── utils
├── models          # MongoDB Schemas
├── uploads         # Image upload directory
└── README.md
```

📸 How It Works

1. 🔏 **Encrypt Text & Upload Image**

* User types text and selects an image.
* Backend encrypts the text.
* Encrypted text is embedded into the image.
* Image is uploaded to the server/database.

2. 🔓 **Decrypt Text from Image**

* User selects the uploaded image.
* App extracts encrypted data.
* Text is decrypted and shown to the user.

📥 Installation

```bash
git clone https://github.com/DARSHAN2224/blockchain.git
cd blockchain-image-storage
```

⚙️ Backend Setup

```bash
cd server
npm install
npm start
```

💻 Frontend Setup

```bash
cd client
npm install
npm start
```

Make sure MongoDB is running locally or connected via a cloud DB URI.

---

🔍 Example Use Case

> Imagine a healthcare system where a doctor encrypts a diagnosis and embeds it in a patient's X-ray image. Only authorized users can later decrypt and view the sensitive data – **completely secure, tamper-proof, and embedded in plain sight.**

---

🧠 Future Scope

* Add Blockchain Smart Contract integration (Ethereum, Solidity).
* Integrate IPFS/Filecoin for decentralized image storage.
* Add facial or biometric authentication.
* Support for PDF/docx file embedding and extraction.

---

👨‍💻 Author

**Darshan P**
*Computer Science Student @ NCET*
🔗 AI | Blockchain | Web | ML Enthusiast

---

## 📜 License

This project is licensed under the MIT License - feel free to use, modify, and contribute!

---

## ⭐ Give it a Star!

If you find this project useful, inspiring, or interesting — please consider giving it a ⭐ on GitHub!

---
