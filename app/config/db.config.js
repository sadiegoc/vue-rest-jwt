const mysql = require('mysql2');

// configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rest_api'
});

// conecta ao banco de dados
connection.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
     }

     console.log('Conectado ao banco de dados como id: ' + connection.threadId);
});

module.exports = connection;