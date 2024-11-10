const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/add', async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        
        const user = new User({ name, email, password, address });
        await user.save();

        res.status(201).json({ message: 'Usuário criado com sucesso!', user });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar usuário', error: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar usuário', error: error.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password, address },
            { new: true, runValidators: true }
        );

        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
        
        res.json({ message: 'Usuário atualizado com sucesso!', user });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar usuário', error: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        res.json({ message: 'Usuário excluído com sucesso!' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao excluir usuário', error: error.message });
    }
});

module.exports = router;
