
const Review = require('../models/Review');

async function calcularMediaAvaliacoes() {
    try {
        const mediaAvaliacoes = await Review.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'productInfo'
                }
            },
            { $unwind: '$productInfo' },
            {
                $group: {
                    _id: '$productInfo._id',
                    produto: { $first: '$productInfo.name' },
                    mediaAvaliacao: { $avg: '$rating' }
                }
            },
            {
                $project: {
                    _id: 0,
                    produto: 1,
                    mediaAvaliacao: { $round: ['$mediaAvaliacao', 2] }
                }
            }
        ]);

        console.log(mediaAvaliacoes);
        return mediaAvaliacoes;
    } catch (error) {
        console.error("Erro ao calcular a média de avaliações:", error);
        throw error;
    }
}

module.exports = { calcularMediaAvaliacoes };
