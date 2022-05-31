const mysql = require('mysql2/promise');

// aqui estou criando minha conexão com a base de dados utilizando os dados de ambiente do docker-compose.yml
// a minha base de dados está rodando na porta 3306
const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || 'StoreManager',
});

module.exports = connection;