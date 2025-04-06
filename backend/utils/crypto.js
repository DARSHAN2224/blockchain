import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();
const algorithm = 'aes-256-cbc';
const secretKey = crypto
  .createHash('sha256') // convert string to 32-byte key
  .update(process.env.ENCRYPTION_SECRET)
  .digest();
  const iv = crypto.randomBytes(16);

export const encryptText = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf-8'), cipher.final()]);
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex')
  };
};

export const decryptText = ({  encryptedData,iv }) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, 'hex')),
    decipher.final()
  ]);
  return decrypted.toString('utf-8');
};
