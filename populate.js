const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Transaction = require('./models/Transaction');
const Review = require('./models/Review');

mongoose.connect("mongodb://localhost:27017/somativa")
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

async function populateDatabase() {
    try {
        await User.deleteMany({});
        await Product.deleteMany({});
        await Category.deleteMany({});
        await Transaction.deleteMany({});
        await Review.deleteMany({});

        const usersData = [
            { name: "Alice Silva", email: "alice1@gmail.com", password: "Alic@123", address: "Rua A, 123" },
            { name: "Bruno Oliveira", email: "bruno@gmail.com", password: "Brun@456", address: "Rua B, 456" },
            { name: "Carla Souza", email: "carla@gmail.com", password: "Carl@789", address: "Rua C, 789" },
            { name: "Daniel Lima", email: "daniel@gmail.com", password: "Dani@101", address: "Rua D, 101" },
            { name: "Evelyn Pereira", email: "evelyn@gmail.com", password: "Evel@102", address: "Rua E, 102" },
        ];

        const categoriesData = [
            { name: "Eletrônicos", subcategories: ["Smartphones", "Laptops"] },
            { name: "Vestuário", subcategories: ["Roupas Masculinas", "Roupas Femininas"] },
            { name: "Alimentos", subcategories: ["Cereais", "Snacks"] },
            { name: "Livros", subcategories: ["Ficção", "Não-Ficção"] },
            { name: "Móveis", subcategories: ["Sala", "Cozinha"] },
        ];

        const productsData = [
            { name: "Smartphone", description: "Celular com 128GB", price: 1500.00, quantityAvailable: 20, category: "Eletrônicos", subcategory: "Smartphones" },
            { name: "Laptop", description: "Laptop para trabalho", price: 3000.00, quantityAvailable: 15, category: "Eletrônicos", subcategory: "Laptops" },
            { name: "Camisa", description: "Camisa masculina", price: 50.00, quantityAvailable: 50, category: "Vestuário", subcategory: "Roupas Masculinas" },
            { name: "Cereal", description: "Cereal integral", price: 10.00, quantityAvailable: 100, category: "Alimentos", subcategory: "Cereais" },
            { name: "Livro de Ficção", description: "Livro emocionante", price: 25.00, quantityAvailable: 30, category: "Livros", subcategory: "Ficção" },
        ];

        const users = await User.insertMany(usersData);
        const categories = await Category.insertMany(categoriesData);

        productsData.forEach(product => {
            const category = categories.find(cat => cat.name === product.category);
            if (category) {
                product.category = category._id;
                product.subcategory = product.subcategory;
            }
        });

        const products = await Product.insertMany(productsData);

        const transactionsData = products.slice(0, 5).map((product, index) => ({
            user: users[index % users.length]._id,
            product: product._id,
            quantity: 1,
            totalPrice: product.price,
            status: product.quantityAvailable > 0 ? "completed" : "canceled"
        }));

        const transactions = await Transaction.insertMany(transactionsData);

        const reviewsData = transactions.map((transaction, index) => ({
            user: transaction.user,
            product: transaction.product,
            rating: Math.floor(Math.random() * 5) + 1,
            comment: `Ótimo produto ${index + 1}`
        }));

        await Review.insertMany(reviewsData);

        console.log("Dados populados com sucesso!");
    } catch (error) {
        console.error("Erro ao popular o banco de dados:", error);
    } finally {
        mongoose.connection.close();
    }
}
populateDatabase();
