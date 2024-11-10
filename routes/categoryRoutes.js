const express = require('express');
const router = express.Router();
router.post('/add', async (req, res) => {
    const { name, subcategories } = req.body;

    const newCategory = new Category({ name, subcategories });
    await newCategory.save();

    res.json(newCategory);
});
module.exports = router;