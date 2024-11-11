// runTransactionReport.js
const mongoose = require('mongoose');
const { relatorioTransacoes } = require('./reports/transactionsReport'); // Importa a função para gerar o relatório

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/somativa', {
  
})
.then(() => {
  console.log('Conectado ao MongoDB!');
  // Rodar o relatório de transações
  relatorioTransacoes();
})
.catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});
