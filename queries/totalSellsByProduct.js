const Transaction = require('../models/Transaction');

async function calcularTotalVendasPorCategoria() {
    try {
        const totalVendasPorCategoria = await Transaction.aggregate([
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
                    _id: '$productInfo.category',
                    quantidadeVendida: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'categoryInfo'
                }
            },
            { $unwind: '$categoryInfo' },
            {
                $project: {
                    _id: 0,
                    categoria: '$categoryInfo.name',  
                    quantidadeVendida: 1
                }
            }
        ]);

        console.log(totalVendasPorCategoria);
        return totalVendasPorCategoria;
    } catch (error) {
        console.error("Erro ao calcular total de vendas por categoria:", error);
        throw error;
    }
}

module.exports = { calcularTotalVendasPorCategoria };
