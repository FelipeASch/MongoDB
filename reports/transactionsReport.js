const mongoose = require('mongoose');
const Transaction = require('../models/Transaction'); 
const User = require('../models/User');
const Product = require('../models/Product');

async function relatorioTransacoes() {
  try {
    const transacoes = await Transaction.find().populate('user').populate('product');
    
    if (transacoes.length === 0) {
      console.log('Nenhuma transação encontrada.');
    } else {
      console.log('Relatório de Transações:');
      transacoes.forEach(transacao => {
        console.log(`ID da Transação: ${transacao._id}`);
        console.log(`Usuário: ${transacao.user ? transacao.user.name : 'Não disponível'}`);
        console.log(`Produto: ${transacao.product ? transacao.product.name : 'Não disponível'}`);
        console.log(`Quantidade: ${transacao.quantity}`);
        console.log(`Preço: ${transacao.price}`);
        console.log(`Data: ${transacao.date}`);
        console.log('------------------------');
        
      });
    }
  } catch (error) {
    console.error('Erro ao gerar relatório de transações:', error);
  } finally {
    mongoose.disconnect();
  }
}

module.exports = { relatorioTransacoes };
