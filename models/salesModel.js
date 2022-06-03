const connection = require('../db/connection');

// Essa tabela vai ser ordenada de forma crescente pelo id (até no caso de empate).
// fiz primeiro no workbench e dps mandei pra k.
const getAllSales = () => {
    const sales = connection.execute(
        `SELECT 
            sl.id AS saleId, 
            sl.date AS date, 
            sp.product_id AS productId, 
            sp.quantity AS quantity
        FROM StoreManager.sales AS sl
        INNER JOIN StoreManager.sales_products AS sp ON  sl.id = sp.sale_id
        ORDER BY 
            id ASC,
            product_id ASC;
        `,
    );
    return sales;
};

const getSalesById = (id) => connection.execute(
    `SELECT 
    sl.date AS date, 
    sp.product_id AS productId, 
    sp.quantity AS quantity
FROM StoreManager.sales AS sl
INNER JOIN StoreManager.sales_products AS sp ON  sl.id = sp.sale_id
WHERE id = ?
ORDER BY 
    product_id ASC;`, [id],
);

// os dois proximos creat são para cria um post no /sale (pois temos duas tabelas que juntamos para obter a nossa api)
// Pegando o ultimo id..https://stackoverflow.com/questions/12125385/last-inserted-id-from-specific-table
// quando eu criar uma nova linha em sale com o creatSale, vou usar get lastSaleId 
const getLastSaleId = async () => {
        const [lastSaleId] = await connection.execute(
            'SELECT id FROM sales ORDER BY  id DESC LIMIT 1',
        );
        return Number(lastSaleId[0].id);
};
// criando o aleProduct
const createSaleProduct = (id, { productId, quantity }) => connection.execute(`
      INSERT INTO sales_products(sale_id, product_id, quantity) VALUES (?, ?, ?)`,
      [id, productId, quantity]);
// esse é para a data q ta na tabela sale
const createSale = async () => {
    await connection.execute(
        'INSERT INTO sales (date) VALUES (NOW())',
    );
};

// update Sale

const updateSales = async (saleId, { productId, quantity }) => connection.execute(
    `UPDATE sales_products SET quantity = ?
    WHERE product_id = ? AND sale_id = ?
    ;`, [quantity, productId, saleId],
);

// delete sale 
const deleteSaleId = async (id) => connection.execute(
    'DELETE FROM sales WHERE id = ?;', [id],
);

module.exports = {
    getAllSales,
    getSalesById,
    createSaleProduct,
    createSale,
    getLastSaleId,
    updateSales,
    deleteSaleId,
};