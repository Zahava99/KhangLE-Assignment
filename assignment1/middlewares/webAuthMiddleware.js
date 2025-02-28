// webAuthMiddleware.js
const jwt = require('jsonwebtoken');

module.exports.webAuth = (req, res, next) => {
    if (!req.session.token) return res.redirect('/dashboard/login');  // Kiểm tra session token cho web

    try {
        const decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);
        req.user = decoded;  // Lưu thông tin người dùng vào req.user
        next();  // Tiếp tục với request
    } catch (error) {
        res.redirect('/dashboard/login');  // Nếu token không hợp lệ, redirect đến login
    }
};
