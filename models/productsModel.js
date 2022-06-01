const connection = require('../db/connection');
// utilizando a base de dados que me conectei. Vamos pegar toda a tabela de produtos com o comando:
const getAllProducts = () => {
    const products = connection.execute(
        'SELECT * FROM StoreManager.products;',
    );
    return products;
};
 // Fiz parecido com oq foi ensinado na aula.
const getProductById = (id) => connection.execute(
        'SELECT * FROM StoreManager.products WHERE id = ?;', [id],
    );
// criando produto, assim como na aula.
const createProducts = async (name, quantity) => connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity],
);

// exportando essa função para utilizarmos na camada de serviço.
module.exports = {
    getAllProducts,
    getProductById,
    createProducts,
};
