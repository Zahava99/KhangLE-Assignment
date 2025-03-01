const express = require('express');
const router = express.Router();
const webAuth = require('../middlewares/webAuthMiddleware');

// Middleware xác thực cho Web
router.get('/', webAuth, (req, res) => {
  
  res.render('dashboard', { user: req.user });
});

module.exports = router;
