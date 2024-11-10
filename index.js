const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect("mongodb://localhost:27017/somativa")
.then(() => {
    console.log("Conectado")
})
.catch (() => {
    console.log("Não conectado")
})
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/category', require('./routes/categoryRoutes'));