const db = require('../config/db.config');

const getUsernameIdById = (id, callback) => {
    db.query('SELECT id, username FROM users WHERE id = ?', [id], callback);
};

const getUserByUsername = (username, callback) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], callback);
};

const createUser = (user, callback) => {
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [user.username, user.password], callback);
};

module.exports = { getUserByUsername, createUser, getUsernameIdById };