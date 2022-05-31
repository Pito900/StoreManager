const express = require('express');

const router = express.Router();

router.use('/products', require('../controllers/productController').router);
router.use('/sales', require('../controllers/salesController').router);

module.exports = router;
