const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth.model');

const generateToken = (id) => {
    /*
    alterações futuras:
        trocar 'secretkey' por uma chave secreta mais segura
        salvar nas variáveis de ambiente .env
    */
    return jwt.sign({ id }, 'secretkey', { expiresIn: '1h' });
};

// registro de um usuário
exports.register = async (req, res) => {
    // pegando do body as informações para registro de um novo usuário
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ message: 'username or password are empty' });

    try {
        // verifica se já existe o usuário
        await Auth.getUserByUsername(username, async (error, results) => {
            if (error) return res.status(500).json({ message: 'error to register user' });

            if (results.length == 0) {
                // codifica a senha antes de salvar no banco de dados
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
        
                // objeto usuário com a senha já codificada
                // pronto para ser salvo no banco de dados
                const userToSave = { username: username, password: hashedPassword };
        
                // realiza o registro no banco de dados
                await Auth.createUser(userToSave, (error, results) => {
                    if (error) return res.status(500).json({ message: 'error to register user' });

                    // envia o token de login para o usuário caso a conta seja criada com sucesso
                    const token = generateToken(results.insertId);
                    return res.status(200).json({
                        id: results.insertId,
                        username: username,
                        token
                    });
                });
        
            } else return res.status(401).json({ message: 'this username already exists' });
        });

    } catch (error) {
        return res.status(500).json({ message: 'error: create new user' });
    }
};

// login de um usuário
exports.login = async (req, res) => {
    // extrai do body as informações
    const { username, password } = req.body;

    if (!username || !password) res.status(400).json({ message: 'username or password are empty' });

    try {
        // verifica se o usuário existe
        await Auth.getUserByUsername(username, async (error, results) => {
            if (error) return res.status(400).json({ message: 'error to find user' });
            if (results.length === 0) return res.status(401).json({ message: 'username or password are incorrects' });

            // verifica se a senha está correta
            const validPassword = await bcrypt.compare(password, results[0].password); // decodifica a senha no banco de dados e compara com a senha digitada pelo usuário
            if (!validPassword) return res.status(401).json({ message: 'username or password are incorrects' });
    
            // envia o token de login para o usuário
            const token = generateToken(results[0].id);
            return res.status(200).json({
                id: results[0].id,
                username: results[0].username,
                token
            });
        });

    } catch (error) {
        res.status(500).json({ message: 'error: user login' })
    }
};