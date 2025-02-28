const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Trang login
router.get('/', (req, res) => {
  res.render('login');
});

// Xử lý login và tạo JWT token
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra thông tin người dùng (giả sử là hợp lệ)
  const user = { id: 1, username, role: 'admin' }; // Giả sử người dùng này là admin

  // Tạo token
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Lưu token vào session
  req.session.token = token;

  // Chuyển hướng tới trang dashboard
  res.redirect('/dashboard');
});

module.exports = router;
