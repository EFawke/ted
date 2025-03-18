import express from 'express';
import multer from 'multer';
import path from 'path';

const uploadRouter = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/')); // Change path as needed
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

uploadRouter.post('/', upload.single('image'), (req, res) => {
  if (req.file) {
    console.log("Uploaded file path:", req.file.path);

    // Send back a URL that can be accessed in the browser
    res.status(200).json({ url: `/uploads/${req.file.filename}` });
  } else {
    res.status(500).json({ error: "Error uploading file" });
  }
});


module.exports = uploadRouter;