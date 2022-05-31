const express = require('express');

const router = express.Router();

router.use('/products', require('../controllers/productController').router);

module.exports = router;
