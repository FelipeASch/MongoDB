const mongoose = require('mongoose');
const User = require('./models/User'); // Modelo do usuário
const Product = require('./models/Product'); // Modelo do produto
const Review = require('./models/Review'); // Modelo de avaliação

async function enviarAvaliacao(userId, productId, rating, comment) {
  try {
    // Conectando ao banco de dados
    await mongoose.connect('mongodb://localhost:27017/somativa', {
    });

    // Verificando se o usuário existe
    const usuario = await User.findById(userId);
    if (!usuario) {
      console.log('Usuário não encontrado.');
      return;
    }

    // Verificando se o produto existe
    const produto = await Product.findById(productId);
    if (!produto) {
      console.log('Produto não encontrado.');
      return;
    }

    // Criando a avaliação
    const avaliacao = new Review({
      user: usuario._id,
      product: produto._id,
      rating,
      comment
    });

    // Salvando a avaliação
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

// usuario, produto, nota e avaliação
enviarAvaliacao('67326425f5532ede132f2959', '67326425f5532ede132f2965', 5, 'Ótimo produtinho!');
