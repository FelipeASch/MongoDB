
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');

router.get('/category/:categoryName', async (req, res) => {
    const { categoryName } = req.params;
    try {
        const category = await Category.findOne({ name: categoryName });
        if (!category) return res.status(404).json({ msg: 'Categoria não encontrada' });

        const products = await Product.find({ category: category._id });
        res.json(products);
    } catch (error) {
        console.error("Erro ao buscar produtos por categoria:", error);
        res.status(500).json({ msg: 'Erro ao buscar produtos' });
    }
});

router.post('/add', async (req, res) => {
    const { name, description, price, quantityAvailable, categoryName, subcategory } = req.body;

    try {
        const category = await Category.findOne({ name: categoryName });
        if (!category) return res.status(404).json({ msg: 'Categoria não encontrada' });

        const newProduct = new Product({
            name,
            description,
            price,
            quantityAvailable,
            category: category._id,
            subcategory
        });

        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        res.status(500).json({ msg: 'Erro ao adicionar produto' });
    }
});

router.put('/:productId/promotion', async (req, res) => {
    const { discount, promotionEndDate } = req.body;
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ msg: 'Produto não encontrado' });
        }

        product.discount = discount;
        product.price = product.price - product.price*20/100;
        product.promotionEndDate = new Date(promotionEndDate);
        await product.save();

        res.json({ msg: 'Promoção aplicada com sucesso', product });
    } catch (error) {
        console.error("Erro ao aplicar promoção:", error);
        res.status(500).json({ msg: 'Erro ao aplicar promoção' });
    }
});

module.exports = router;
