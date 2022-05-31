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

module.exports = {
    getAllSales,
    getSalesById,
};