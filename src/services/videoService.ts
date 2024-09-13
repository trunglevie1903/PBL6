import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

// Stream video in chunks
export const streamVideoChunk = (videoPath: string, req: Request, res: Response) => {
  try {
    if (!fs.existsSync(videoPath)) {
      return res.status(404).send('Video not found.');
    }

    const stat = fs.statSync(videoPath);
    const total = stat.size;
    const range = req.headers.range;

    if (!range) {
      return res.status(400).send('Requires Range header');
    }

    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : total - 1;
    const chunkSize = (end - start) + 1;

    // Ensure the correct MIME type for the video
    const ext = path.extname(videoPath);
    const mimeType = ext === '.mp4' ? 'video/mp4' : 'video/webm';

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': mimeType,  // Dynamically set MIME type
    };

    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, { start, end });
    stream.pipe(res);

  } catch (err) {
    console.error('Error streaming video:', err);
    res.status(500).send('Server error.');
  }
};
