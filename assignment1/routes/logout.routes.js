const express = require('express');
const router = express.Router();
// Route API để logout
router.get('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error while logging out' });
        }
        // Sau khi logout thành công, chuyển hướng về trang login
        res.redirect('/login');
    });
});
module.exports = router