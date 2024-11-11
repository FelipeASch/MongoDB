const mongoose = require('mongoose');
const Product = require('./models/Product'); 

async function applyDiscount(productId, discount) {
    try {
        
        await mongoose.connect('mongodb://localhost:27017/somativa', {
        });

      
        const result = await Product.findByIdAndUpdate(
            productId,
            {
                discount: discount,
                promotionEndDate: new Date('2024-12-31') 
            },
            { new: true } 
        );

        if (result) {
            console.log('Promoção aplicada com sucesso:', result);
        } else {
            console.log('Produto não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao aplicar a promoção:', error.message);
    } finally {

        mongoose.connection.close();
    }
}

applyDiscount('673264bb1d6caa2ba8b18ea2', 20);
