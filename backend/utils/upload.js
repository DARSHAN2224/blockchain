import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = "./uploads/";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now()+ext);
  },
});

export const upload=multer({storage:storage, fileFilter: (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only images are allowed!'), false);
  }
  cb(null, true);
  }
})