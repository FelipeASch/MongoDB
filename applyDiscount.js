const mongoose = require('mongoose');
const Product = require('./models/Product'); // Certifique-se de que o caminho está correto para o modelo de Produto

// Função para aplicar promoção a um produto
async function applyDiscount(productId, discount) {
    try {
        // Conecta ao MongoDB
        await mongoose.connect('mongodb://localhost:27017/somativa', {
        });

        // Atualiza o desconto do produto
        const result = await Product.findByIdAndUpdate(
            productId,
            {
                discount: discount,
                promotionEndDate: new Date('2024-12-31') // Data de término da promoção
            },
            { new: true } // Retorna o documento atualizado
        );

        if (result) {
            console.log('Promoção aplicada com sucesso:', result);
        } else {
            console.log('Produto não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao aplicar a promoção:', error.message);
    } finally {
        // Fecha a conexão com o banco de dados
        mongoose.connection.close();
    }
}

// Exemplo de uso da função
applyDiscount('673264bb1d6caa2ba8b18ea1', 20);
