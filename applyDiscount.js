const axios = require('axios');

async function applyDiscount() {
    const productId = '67317df2c4c536f22ad12988'; // Substitua pelo ID real do produto
    const url = `http://localhost:5000/api/products/67317df2c4c536f22ad12988/promotion`;

    const discountData = {
        discount: 20, // Percentual de desconto
        promotionEndDate: '2024-12-31' // Data de término da promoção
    };

    try {
        const response = await axios.put(url, discountData, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('Promoção aplicada com sucesso:', response.data);
    } catch (error) {
        // Exibe o erro completo
        if (error.response) {
            // Erro de resposta do servidor (4xx ou 5xx)
            console.error('Erro de resposta:', error.response.status, error.response.data);
        } else if (error.request) {
            // Nenhuma resposta foi recebida
            console.error('Erro de requisição:', error.request);
        } else {
            // Outro tipo de erro
            console.error('Erro:', error.message);
        }
    }
}

applyDiscount();
