import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadRouter = express.Router();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

uploadRouter.post('/', upload.single('image'), (req, res) => {
  if (req.file) {
    console.log("Uploaded file path:", req.file.path);
    res.status(200).json({ url: `/uploads/${req.file.filename}` });
  } else {
    res.status(500).json({ error: "Error uploading file" });
  }
});

module.exports = uploadRouter;
