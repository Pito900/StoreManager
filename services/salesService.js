const salesFromModel = require('../models/salesModel'); // importando que executa o select para pegarmos todos os produtos

const getAllSales = () => {
   const products = salesFromModel.getAllSales(); // extraindo a função do objeto importado
   return products;
};

const getSalesById = (id) => salesFromModel.getSalesById(id);

const createSale = async (reqBody) => {
    salesFromModel.createSale(); // aqui estou criando uma nova linha na tabela sale
    const lastSaleId = await salesFromModel.getLastSaleId();
    // agora, para cada reqBody vou criar um produto na tabela sale_products. Lembrando q o req.body vai vir como vetor
    reqBody.map(async (rbItem) => {
        await salesFromModel.createSaleProduct(lastSaleId, rbItem);
    });
    // essa função retorna a estrutura a estrutura q vou precisa para a função do controller, para por na API oq foi colocado na base de dados.
    return { id: lastSaleId, itemsSold: reqBody };
};

// essa função, que retorna toda a tabela de produtos, vamos exportar para termos acesso na camada de controle.
module.exports = {
    getAllSales,
    getSalesById,
    createSale,
};