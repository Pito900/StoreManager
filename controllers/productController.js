const express = require('express');

const productsFromService = require('../services/productsService'); // estamos pegando a função q vem do product service. Essa função pega a base de dados
const productsValidate = require('../middlewares/productValidation'); // validação para o produto (name e quantidade).

const router = express.Router();
// a formatação async é necessária (sempre lembrar disso)
router.get('/', async (_req, res) => {
  const [products] = await productsFromService.getAllProducts();
  res.status(200).json(products);
});

// Vamos criar um método post para adicionar novos itens (toda a estrutura prévia já está montada)
router.post('/', productsValidate.productsValidation, async (req, res) => {
  try {
  const { name, quantity } = req.body;
  const [products] = await productsFromService.getAllProducts();
  if (products.some((product) => product.name === name)) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  productsFromService.createProducts(name, quantity);
  const newProductsList = await productsFromService.getAllProducts();
  const [newProduct] = newProductsList[0].filter((product) => product.name === name 
   && product.quantity === quantity);
  res.status(201).json(newProduct);
} catch (error) {
  res.status(500).json({ message: error.message });
}
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [products] = await productsFromService.getProductById(id);
  if (!products.length) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(products[0]); // o zero é para tirar do vetor. Deixar apenas o objeto.
});

module.exports = {
  router,
};
