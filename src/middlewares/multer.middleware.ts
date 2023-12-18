import multer from 'multer';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const UploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 5_000_000,
  },
});

export { UploadMiddleware };
