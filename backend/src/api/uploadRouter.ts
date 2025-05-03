import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const uploadRouter = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage with Multer
const upload = multer({ storage: multer.memoryStorage() });

uploadRouter.post('/', upload.single('image'), async (req:any, res:any) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Convert buffer to a format Cloudinary accepts
    const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'your_blog_uploads' // Optional folder organization
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ error: 'Error uploading file to Cloudinary' });
  }
});

module.exports = uploadRouter;