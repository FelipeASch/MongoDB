const mongoose = require('mongoose');
const User = require('./models/User'); 
const Product = require('./models/Product'); 
const Transaction = require('./models/Transaction'); 

async function comprarProduto(userId, productId, quantidade) {
  try {
    await mongoose.connect('mongodb://localhost:27017/somativa', {
    });

   
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

  
    const transacao = new Transaction({
      user: usuario._id,
      product: produto._id,
      quantity: quantidade,
      price: (produto.price*quantidade-produto.price*(produto.discount/100)*quantidade)-usuario.points,
      date: new Date()
    });

    
    await transacao.save();

    
    produto.quantityAvailable -= quantidade;
    await produto.save();

    
    console.log(`Compra realizada com sucesso!`);
    console.log(`Produto: ${produto.name}`);
    console.log(`Quantidade comprada: ${quantidade}`);
    console.log(`Preço total: ${(produto.price*quantidade-produto.price*(produto.discount/100)*quantidade)-usuario.points}`)
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

// usuario, produto, quantidade
comprarProduto('673264bb1d6caa2ba8b18e97', '673264bb1d6caa2ba8b18ea2', 1); 
