const mongoose = require('mongoose');
const { calcularMediaAvaliacoes } = require('./queries/productAverageReviews.js');
const { calcularTotalVendasPorCategoria } = require('./queries/totalSellsByProduct.js');
mongoose.connect("mongodb://localhost:27017/somativa")
    .then(async () => {
        console.log("Conectado ao MongoDB");

        await calcularMediaAvaliacoes();
        await calcularTotalVendasPorCategoria();

        mongoose.connection.close(); 
    })
    .catch(error => {
        console.error("Erro ao conectar ao MongoDB:", error);
    });
