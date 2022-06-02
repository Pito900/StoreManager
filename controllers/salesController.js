const express = require('express');
const salesFromService = require('../services/salesService'); // estamos pegando a função q vem do product service. Essa função pega a base de dados
const salesValidate = require('../middlewares/salesValidation');

const router = express.Router();
// a formatação async é necessária (sempre lembrar disso)
router.get('/', async (_req, res) => {
  const [sales] = await salesFromService.getAllSales();
  res.status(200).json(sales);
});

router.post('/', salesValidate.salesValidation, async (req, res) => {
  await salesFromService.createSale(req.body);
  res.status(201).json({ message: 'Item added successfully' });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [sales] = await salesFromService.getSalesById(id);
  if (!sales.length) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.status(200).json(sales);
});

module.exports = {
  router,
};
