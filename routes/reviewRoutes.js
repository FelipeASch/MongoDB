const express = require('express');
const router = express.Router();

router.get('/product/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate('user', 'name');
    res.json(reviews);
});
module.exports = router;