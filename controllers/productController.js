const express = require('express');
const productsFromService = require('../services/productsService'); // estamos pegando a função q vem do product service. Essa função pega a base de dados

const router = express.Router();
// a formatação async é necessária (sempre lembrar disso)
router.get('/', async (_req, res) => {
  const [products] = await productsFromService.getAllProducts();
  res.status(200).json(products);
});

module.exports = {
  router,
};
