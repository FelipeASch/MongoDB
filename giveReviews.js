const mongoose = require('mongoose');
const User = require('./models/User'); 
const Product = require('./models/Product'); 
const Review = require('./models/Review'); 

async function enviarAvaliacao(userId, productId, rating, comment) {
  try {
   

    const usuario = await User.findById(userId);
    if (!usuario) {
      console.log('Usuário não encontrado.');
      return;
    }

    const produto = await Product.findById(productId);
    if (!produto) {
      console.log('Produto não encontrado.');
      return;
    }
 
    const avaliacao = new Review({
      user: usuario._id,
      product: produto._id,
      rating,
      comment
    });

  
    await avaliacao.save();

    console.log('Avaliação enviada com sucesso!');
    console.log(`Produto: ${produto.name}`);
    console.log(`Nota: ${rating}`);
    console.log(`Comentário: ${comment}`);
  } catch (error) {
    console.error('Erro ao enviar a avaliação:', error);
  } finally {
    mongoose.disconnect();
  }
}

enviarAvaliacao('67326425f5532ede132f2959', '67326425f5532ede132f2965', 5, 'Ótimo produtinho!');
