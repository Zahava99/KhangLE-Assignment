const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const upload = require('../middlewares/uploadMiddleware');
const { webAuth, isAdmin } = require('../middlewares/webAuthMiddleware');
// Lấy danh sách sản phẩm
router.get('/',webAuth, async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products, user: req.user });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Form thêm sản phẩm
router.get('/add',webAuth, isAdmin, (req, res) => {
    res.render('product-add');
});

// Xử lý thêm sản phẩm
router.post('/add', upload.single('image'),webAuth, isAdmin, async (req, res) => {
    try {
        const { name, price, categoryId } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        const newProduct = new Product({ name, price, categoryId, image });
        await newProduct.save();
        res.redirect('/products');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Form sửa sản phẩm
router.get('/edit/:id',webAuth, isAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Sản phẩm không tồn tại');
        res.render('product-edit', { product });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Xử lý cập nhật sản phẩm
router.post('/edit/:id', upload.single('image'),webAuth, isAdmin, async (req, res) => {
    try {
        const { name, price, categoryId } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).send('Sản phẩm không tồn tại');

        product.name = name;
        product.price = price;
        product.categoryId = categoryId;

        if (req.file) {
            product.image = `/uploads/${req.file.filename}`;
        }

        await product.save();
        res.redirect('/products');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Xóa sản phẩm
router.get('/delete/:id',webAuth, isAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
