
const mongoose = require('mongoose');
const { relatorioTransacoes } = require('./reports/transactionsReport'); 


mongoose.connect('mongodb://localhost:27017/somativa', {
  
})
.then(() => {
  console.log('Conectado ao MongoDB!');
  
  relatorioTransacoes();
})
.catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});
