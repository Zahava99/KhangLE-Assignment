const express = require('express');
const router = express.Router();
const Category = require('../models/category.model');
const { webAuth, isAdmin } = require('../middlewares/webAuthMiddleware');
// Hiển thị danh sách categories
router.get('/',webAuth, async (req, res) => {
    try {
        const categories = await Category.find();
        res.render('category', { categories, user: req.user });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Hiển thị form tạo category
router.get('/add',webAuth, isAdmin, (req, res) => {
    res.render('category-add');
});

// Xử lý tạo category
router.post('/add',webAuth, isAdmin, async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        await newCategory.save();
        res.redirect('/category');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Hiển thị form cập nhật category
router.get('/edit/:id',webAuth, isAdmin, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.render('category-edit', { category });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Xử lý cập nhật category
router.post('/edit/:id',webAuth, isAdmin, async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, { name: req.body.name });
        res.redirect('/category');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Xử lý xóa category
router.get('/delete/:id',webAuth, isAdmin, async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.redirect('/category');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
