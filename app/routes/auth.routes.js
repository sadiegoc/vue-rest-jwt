const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// cadastro de um usuário
router.post('/register', register);

// login de um usuário
router.post('/login', login);

// rota do middleware de autorização
router.get('/authorization', protect, (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = router;