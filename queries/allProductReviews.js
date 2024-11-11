const mongoose = require('mongoose');
const Review = require('../models/Review'); 

async function ReviewsProduto(productId) {
    try {
        await mongoose.connect('mongodb://localhost:27017/somativa', {
        
        });

        const reviews = await Review.find({ product: productId })

        if (reviews.length > 0) {
            console.log(`Avaliações para o produto ${productId}:`, reviews);
        } else {
            console.log(`Nenhuma avaliação encontrada para o produto ${productId}.`);
        }
    } catch (error) {
        console.error('Erro ao buscar avaliações:', error.message);
    } finally {
    
        mongoose.connection.close();
    }
}

module.exports = {ReviewsProduto}
