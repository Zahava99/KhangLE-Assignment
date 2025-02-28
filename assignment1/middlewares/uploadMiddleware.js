// middlewares/uploadMiddleware.js

const multer = require('multer');
const path = require('path');

// Cấu hình lưu trữ hình ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Lưu hình ảnh vào thư mục 'uploads'
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Đặt tên file là thời gian hiện tại cộng với phần mở rộng của file
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Kiểm tra loại file (chỉ cho phép hình ảnh)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Nếu file hợp lệ
  } else {
    cb(new Error('Chỉ hỗ trợ hình ảnh'), false); // Nếu file không hợp lệ
  }
};

// Cấu hình Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Giới hạn kích thước file 5MB
});

module.exports = upload;
