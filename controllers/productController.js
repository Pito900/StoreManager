const express = require('express');
const productsFromService = require('../services/productsService'); // estamos pegando a função q vem do product service. Essa função pega a base de dados

const router = express.Router();
// a formatação async é necessária (sempre lembrar disso)
router.get('/', async (_req, res) => {
  const [products] = await productsFromService.getAllProducts();
  res.status(200).json(products);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [products] = await productsFromService.getProductById(id);
  res.status(200).json(products[0]); // o zero é para tirar do vetor. Deixar apenas o objeto.
});

module.exports = {
  router,
};
