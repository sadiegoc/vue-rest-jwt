const jwt = require('jsonwebtoken');
const Auth = require('../models/auth.model');

const protect = async (req, res, next) => {
    // verifica se foi enviado, no header da requisição, o token necessário para acessar a página
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // verifica se o token enviado é válido com base na chave 'secretkey'
            // lembrar de alterar a 'secretkey' para uma chave mais segura armazenada em .env
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'secretkey');

            // pega o usuário pelo id encontrado no token
            await Auth.getUsernameIdById(decoded.id, (error, results) => {
                if (results.length > 0) {
                    next();
                }
            });
        } catch (error) {
            res.status(401).json({ message: 'token inválido' });
        }
    } else {
        res.status(401).json({ message: 'sem token, autorização negada' });
    }
}

module.exports = { protect };