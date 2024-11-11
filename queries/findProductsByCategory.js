
const Product = require('../models/Product');
const Category = require('../models/Category');

async function encontrarProdutosPorCategoria(categoryName) {

    try {
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            console.log('Categoria não encontrada');
            return;
        }

        const products = await Product.find({ category: category._id });
        console.log('Produtos encontrados:', products);
    } catch (error) {
        console.error('Erro ao encontrar produtos:', error);
    } finally {
        
    }
}

module.exports = {encontrarProdutosPorCategoria}
