const axios = require('axios');

async function applyDiscount(productId,discount) {
    const url = `http://localhost:5000/api/products/${productId}/promotion`;

    const discountData = {
        discount: discount, 
        promotionEndDate: '2024-12-31' 
    };

    try {
        const response = await axios.put(url, discountData, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('Promoção aplicada com sucesso:', response.data);
    } catch (error) {
       
        if (error.response) {
            
            console.error('Erro de resposta:', error.response.status, error.response.data);
        } else if (error.request) {
          
            console.error('Erro de requisição:', error.request);
        } else {
           
            console.error('Erro:', error.message);
        }
    }
}

applyDiscount('67325f410521878e147c6cab',20);
