const express = require('express');
const router = express.Router();
router.post('/purchase', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Produto não encontrado' });

    if (product.quantityAvailable < quantity) {
        return res.status(400).json({ msg: 'Estoque insuficiente para o produto solicitado' });
    }

    const transaction = new Transaction({
        user: userId,
        product: productId,
        quantity
    });
    await transaction.save();

    product.quantityAvailable -= quantity;
    await product.save();

    res.json({ msg: 'Transação realizada com sucesso' });
});
module.exports = router;