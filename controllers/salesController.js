const express = require('express');
const salesFromService = require('../services/salesService'); // estamos pegando a função q vem do product service. Essa função pega a base de dados

const router = express.Router();
// a formatação async é necessária (sempre lembrar disso)
const getAllSales = async (_req, res) => {
  const [sales] = await salesFromService.getAllSales();
  console.log(sales);
  if (!sales) {
    return res.status(404).send([]);
   }
  res.status(200).json(sales);
};

const createSale = async (req, res) => {
  try {
      const saleCreated = await salesFromService.createSale(req.body);
      res.status(201).json(saleCreated);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const [sales] = await salesFromService.getSalesById(id);
  if (!sales.length) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.status(200).json(sales);
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const [allSales] = await salesFromService.getSalesById(id);
    if (!allSales[0]) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    const saleUpdated = await salesFromService.updateSale(Number(id), req.body[0]);
    return res.status(200).json(saleUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteSaleId = async (req, res) => {
  try {
    const { id } = req.params;
    const [allSales] = await salesFromService.getSalesById(id);
    if (!allSales[0]) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    await salesFromService.deleteSaleId(id);
    return res.status(204).json({ message: `Sale ${id} off` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  router,
  getAllSales,
  createSale,
  getSalesById,
  updateSale,
  deleteSaleId,
};
