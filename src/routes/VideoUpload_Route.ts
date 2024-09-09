import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const router = Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload video route
router.post('/upload', upload.single('video'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Send the uploaded video URL back
  res.json({ videoUrl: `/videos/${req.file.filename}` });
});

// Serve uploaded videos statically
router.use('/videos', express.static(path.join(__dirname, '../../uploads')));

export default router;
