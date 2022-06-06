const express = require('express');

const productsFromService = require('../services/productsService'); // estamos pegando a função q vem do product service. Essa função pega a base de dados

const router = express.Router();
// a formatação async é necessária (sempre lembrar disso)
const getAllProducts = async (_req, res) => {
  const [products] = await productsFromService.getAllProducts();
  if (!products) {
   return res.status(404).json([]);
  }
 return res.status(200).json(products);
};

// Vamos criar um método post para adicionar novos itens (toda a estrutura prévia já está montada)
const createProducts = async (req, res) => {
  try {
  const { name, quantity } = req.body;
  const [products] = await productsFromService.getAllProducts();
  if (products.some((product) => product.name === name)) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  await productsFromService.createProducts(name, quantity);
  const newProductsData = await productsFromService.getAllProducts();
  const [newProduct] = newProductsData[0].filter((product) => product.name === name 
   && product.quantity === quantity);
  res.status(201).json(newProduct);
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const [products] = await productsFromService.getProductById(id);
  if (!products || products.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  console.log(products[0]);
  return res.status(200).json(products[0]); // o zero é para tirar do vetor. Deixar apenas o objeto.
};

const updateProducts = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, quantity } = req.body;
      await productsFromService.updateProducts(id, name, quantity);
      const [allProducts] = await productsFromService.getProductById(id);
      if (!allProducts[0]) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json({ id, name, quantity });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

const deleteProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const [allProducts] = await productsFromService.getProductById(id);
    if (!allProducts[0]) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await productsFromService.deleteProductId(id);
    return res.status(204).json({ message: `product ${id} off` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  router,
  getAllProducts,
  getProductById,
  createProducts,
  updateProducts,
  deleteProductId,
};
