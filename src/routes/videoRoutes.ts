import { Router } from 'express';
import { serveUploadPage, serveWatchPage, uploadVideo, streamVideo } from '../controllers/videoController';

const router = Router();

// Route to serve the upload.html page
router.get("/t/upload", serveUploadPage);

// Route for video upload
router.post('/t/upload', uploadVideo);

// Route to serve the watch.html page
router.get('/t/watch/:fileName', serveWatchPage);

// Route to stream the video (this will be used inside the watch.html)
router.get('/t/video/:filename', streamVideo);
export default router;


// // Serve static HTML files
// app.get('/upload', (req, res) => {
//   res.sendFile(path.join(__dirname, './ui/upload.html'));
// });

// app.get('/watch', (req, res) => {
//   res.sendFile(path.join(__dirname, './watch.html'));
// });