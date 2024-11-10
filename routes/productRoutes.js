const express = require('express');
const router = express.Router();
router.get('/category/:categoryName', async (req, res) => {
    const { categoryName } = req.params;
    const category = await Category.findOne({ name: categoryName });
    if (!category) return res.status(404).json({ msg: 'Categoria não encontrada' });

    const products = await Product.find({ category: category._id });
    res.json(products);
})
router.post('/add', async (req, res) => {
    const { name, description, price, quantityAvailable, categoryName, subcategory } = req.body;

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
});

module.exports = router;