
  const PRODUCT_1 = { "id": 1, "name": "Martelo de Thor", "quantity": 10 };
  const PRODUCT_2 = { "id": 2, "name": "Traje de encolhimento", "quantity": 20 };
  const PRODUCT_3 = { "id": 3, "name": "Escudo do Capitão América", "quantity": 30 };
  
  const UPGRATED_PRODUCT = { "id": 1, "name": "Báculo", "quantity": 1 };
  const DELETED_PRODUCT = { "id": 1, "name": "Martelo de Thor", "quantity": 10 };
  
  const PRODUCTS_LIST = [PRODUCT_1, PRODUCT_2];
  
  const errorMessages = {
    PRODUCT_NOT_FOUND: { status: 404, message: 'Product not found' },
  }
  module.exports = {
    errorMessages,
    UPGRATED_PRODUCT,
    PRODUCT_1,
    PRODUCT_2,
    PRODUCT_3,
    PRODUCTS_LIST,
  }