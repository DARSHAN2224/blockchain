import { upload } from "../utils/upload.js";
import { Router } from 'express';
const router =  Router();
import {
  encryptData,
  decryptData,
  storeEncryptedInImage,
  decryptFromImage
} from "../controller/mainController.js";

router.post("/encrypt", encryptData);
router.post("/decrypt", decryptData);

// Image routes
router.post("/encrypt-image", upload.single("image"), storeEncryptedInImage);
router.post("/decrypt-image", upload.single("image"), decryptFromImage);

export default router;
