const express = require('express');
const productsValidate = require('../middlewares/productValidation'); // validação para o produto (name e quantidade).
const salesValidate = require('../middlewares/salesValidation');

const router = express.Router();

router.use('/products', require('../controllers/productController').router);
router.use('/sales', require('../controllers/salesController').router);

const productController = require('../controllers/productController');
const salesController = require('../controllers/salesController');

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productsValidate.productsValidation, productController.createProducts);
router.put('/products/:id', productsValidate.productsValidation, productController.updateProducts);
router.delete('/products/:id', productController.deleteProductId);

router.get('/sales', salesController.getAllSales);
router.get('/sales/:id', salesController.getSalesById);
router.post('/sales', salesValidate.salesValidation, salesController.createSale);
router.put('/sales/:id', salesValidate.salesValidation, salesController.updateSale);
router.delete('/sales/:id', salesController.deleteSaleId);

module.exports = router;
