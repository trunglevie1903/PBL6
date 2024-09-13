import { Request, Response } from 'express';
import {  streamVideoChunk } from '../services/videoService';
import multer from 'multer';
import path from "path";

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos/');
  },
  filename: (req, file, cb) => {
    // cb(null, `${Date.now()}-${file.originalname}`);
    cb(null, `${Date.now()}.mp4`);
  }
});

const upload = multer({ storage }).single('video');

// Video upload handler
export const uploadVideo = (req: Request, res: Response) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading video.' });
    }

    const videoFilePath = req.file?.path;
    if (!videoFilePath) {
      return res.status(400).json({ message: 'No video file provided.' });
    }

    return res.status(200).json({ message: 'Video uploaded successfully', filePath: videoFilePath });
  });
};

// Stream video controller
export const streamVideo = (req: Request, res: Response) => {
  const { filename } = req.params;
  const videoPath = `uploads/videos/${filename}.mp4`;
  streamVideoChunk(videoPath, req, res);
};

// Serve the watch.html page with dynamic video
export const serveWatchPage = (req: Request, res: Response) => {
  const { fileName } = req.params;
  
  // Serve the watch.html file with the video name dynamically
  const watchPagePath = path.join(__dirname, '../ui/watch.html');
  res.sendFile(watchPagePath);
};

export const serveUploadPage = (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../ui/upload.html'));
};