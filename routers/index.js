const express = require('express');
const productsValidate = require('../middlewares/productValidation'); // validação para o produto (name e quantidade).

const router = express.Router();

router.use('/products', require('../controllers/productController').router);
router.use('/sales', require('../controllers/salesController').router);

const productController = require('../controllers/productController');

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productsValidate.productsValidation, productController.createProducts);
router.put('/products/:id', productsValidate.productsValidation, productController.updateProducts);
router.delete('/products/:id', productController.deleteProductId);

module.exports = router;
