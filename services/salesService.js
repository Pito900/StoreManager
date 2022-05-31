const salesFromModel = require('../models/salesModel'); // importando que executa o select para pegarmos todos os produtos

const getAllSales = () => {
   const products = salesFromModel.getAllSales(); // extraindo a função do objeto importado
   return products;
};

const getSalesById = (id) => salesFromModel.getSalesById(id);

// essa função, que retorna toda a tabela de produtos, vamos exportar para termos acesso na camada de controle.
module.exports = {
    getAllSales,
    getSalesById,
};