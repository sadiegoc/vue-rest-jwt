const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rest_api'
});

connection.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
     }

     console.log('Conectado ao banco de dados como id: ' + connection.threadId);
});

module.exports = connection;