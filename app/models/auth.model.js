const db = require('../config/db.config');

// procura um usuário pelo id
// devolve id e username
const getUsernameIdById = (id, callback) => {
    db.query('SELECT id, username FROM users WHERE id = ?', [id], callback);
};

// procura um usuário pelo username
// devolve id, username e password
const getUserByUsername = (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
};

// cria um novo usuário
// user é um objeto que contém username e password
const createUser = (user, callback) => {
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [user.username, user.password], callback);
};

module.exports = { getUserByUsername, createUser, getUsernameIdById };