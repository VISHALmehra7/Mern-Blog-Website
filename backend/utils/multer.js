import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); 
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); 
  }
});


const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    return cb(new Error("Only image files are allowed."));
  }
  cb(null, true); 
};


const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter
});

export default upload;
