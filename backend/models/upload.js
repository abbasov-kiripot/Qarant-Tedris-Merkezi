import multer from 'multer';
import path from 'path';

// Dosya yüklemek için multer yapılandırması
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Yükleme klasörü
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Dosya ismi
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf, jpg, jpeg, png/; // İzin verilen dosya türleri
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Sadece PDF dosyalarına izin verilir!');
    }
  }
});

export default upload;
