const mongoose = require('mongoose');
const User = require('./models/User'); // Modelo do usuário
const Product = require('./models/Product'); // Modelo do produto
const Transaction = require('./models/Transaction'); // Modelo de transação

async function comprarProduto(userId, productId, quantidade) {
  try {
    await mongoose.connect('mongodb://localhost:27017/somativa', {
    });

    // Encontrando o usuário
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

   
    if (produto.quantityAvailable < quantidade) {
      console.log('Estoque insuficiente.');
      return;
    }

    // Criando a transação
    const transacao = new Transaction({
      user: usuario._id,
      product: produto._id,
      quantity: quantidade,
      price: produto.price*quantidade,
      date: new Date()
    });

    // Salvando a transação
    await transacao.save();

    // Atualizando o estoque do produto
    produto.quantityAvailable -= quantidade;
    await produto.save();

    
    console.log(`Compra realizada com sucesso!`);
    console.log(`Produto: ${produto.name}`);
    console.log(`Quantidade comprada: ${quantidade}`);
    console.log(`Preço total: ${produto.price*quantidade-usuario.points}`)
    console.log(`Novo estoque: ${produto.quantityAvailable}`);

    usuario.points = 0
    usuario.points += Number((produto.price*quantidade*(5/100)).toFixed(2));
    await usuario.save();


  } catch (error) {
    console.error('Erro ao realizar a compra:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Exemplo de chamada para a função de compra (substitua com valores reais de usuário e produto)
comprarProduto('67325f410521878e147c6c9e', '67325f410521878e147c6cab', 2); // Exemplo: Compra 2 unidades
