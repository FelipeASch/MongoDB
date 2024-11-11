const mongoose = require('mongoose');
const { calcularMediaAvaliacoes } = require('./queries/productAverageReviews.js');
const { calcularTotalVendasPorCategoria } = require('./queries/totalSellsByProduct.js');
const { encontrarProdutosPorCategoria } = require('./queries/findProductsByCategory.js');
const { ReviewsProduto } = require('./queries/allProductReviews.js');
mongoose.connect("mongodb://localhost:27017/somativa")
    .then(async () => {
        console.log("Conectado ao MongoDB");

        await calcularMediaAvaliacoes();
        await calcularTotalVendasPorCategoria();
        await encontrarProdutosPorCategoria("Livros");
        await ReviewsProduto("673264bb1d6caa2ba8b18ea1");

        mongoose.connection.close(); 
    })
    .catch(error => {
        console.error("Erro ao conectar ao MongoDB:", error);
    });
