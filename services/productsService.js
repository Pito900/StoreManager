const productsFromModel = require('../models/productsModel'); // importando que executa o select para pegarmos todos os produtos

const getAllProducts = () => {
   const products = productsFromModel.getAllProducts(); // extraindo a função do objeto importado
   return products;
};

const getProductById = (id) => productsFromModel.getProductById(id);

const createProducts = (name, quantity) => productsFromModel.createProducts(name, quantity);

const updateProducts = (id, name, quantity) => productsFromModel.updateProducts(id, name, quantity);

const deleteProductId = (id) => productsFromModel.deleteProductId(id);

// essa função, que retorna toda a tabela de produtos, vamos exportar para termos acesso na camada de controle.
module.exports = {
    getAllProducts,
    getProductById,
    createProducts,
    updateProducts,
    deleteProductId,
};
