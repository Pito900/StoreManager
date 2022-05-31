const connection = require('../db/connection');
// utilizando a base de dados que me conectei. Vamos pegar toda a tabela de produtos com o comando:
const getAllProducts = () => {
    const products = connection.execute(
        'SELECT * FROM StoreManager.products;',
    );
    return products;
};

// exportando essa função para utilizarmos na camada de serviço.
module.exports = {
    getAllProducts,
};
