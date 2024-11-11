const mongoose = require('mongoose');
const Product = require('./models/Product');
const Review = require('./models/Review');

mongoose.connect('mongodb://localhost:27017/somativa', {
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

async function respondToReview(reviewId, answer) {
    try {
        const review = await Review.findById(reviewId).populate('product');

        if (!review) {
            console.log('Avaliação não encontrada');
            return;
        }

        review.answer = answer;
        await review.save();

        console.log('Resposta adicionada com sucesso:', answer);
    } catch (error) {
        console.error('Erro ao responder à avaliação:', error);
    } finally {
        mongoose.connection.close();
    }
}



respondToReview("673264bb1d6caa2ba8b18ead","Obrigado pelo feedback!");
