const { expect } = require('chai');
const sinon = require('sinon');
const { PRODUCTS_LIST, UPGRATED_PRODUCT, PRODUCT_1, CREATED_PRODUCT, PRODUCT_3 } = require('../mocks/productsMock');
const productController = require('../../../controllers/productController');
const productsService = require('../../../services/productsService');

describe('Testando o controller do endpoint GET /products', () => {
    let req = {}, res = {};
  
    describe('Quando não há produtos na base de dados', () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'getAllProducts').resolves([]);
      });
  
      after(() => {
        productsService.getAllProducts.restore();
      });
  
      it('O status code deve retornar 200', async () => {
        await productController.getAllProducts(req, res);
  
        expect(res.status.calledWith(404)).to.be.true;
      });
  
      it('Deve retornar um array vazio', async () => {
        await productController.getAllProducts(req, res);
  
        expect(res.json.calledWith([])).to.be.true;
      });
    });
  
    describe('Quando a base de dados não está vazia', () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'getAllProducts').resolves([PRODUCTS_LIST]);
      });
  
      after(() => {
        productsService.getAllProducts.restore();
      });
  
      it('O status code deve retornar 200', async () => {
        await productController.getAllProducts(req, res);
  
        expect(res.status.calledWith(200)).to.be.true;
      });
  
      it('Deve retornar um array.', async () => {
        await productController.getAllProducts(req, res);
        expect(res.json.calledWith(sinon.match.array)).to.be.true;
        expect(res.json.calledWith([PRODUCTS_LIST][0])).to.be.true;
      });
    });
  });

  describe('Testando o controller do endpoint GET /products/:id', () => {
    let req = {}, res = {}, next;
  
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
  
    describe('Quando o id pesquisado consta na base de dados', () => {
      before(() => {
        req.params = { id: 1 };
        sinon.stub(productsService, 'getProductById').resolves([PRODUCT_1]);
      });
  
      after(() => {
        productsService.getProductById.restore();
      });
  
      it('Deve retornar o status 200', async () => {
        await productController.getProductById(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });
  
      it('deve retornar o produto', async () => {
       await productController.getProductById(req, res);
       expect(res.json.calledWith(PRODUCT_1[0])).to.be.true;
      });
    });
  
    describe('Quando o produto com esse id não existe', () => {
      before(() => {
        req.params = { id: 42 };
        sinon.stub(productsService, 'getProductById').resolves([]);
      });
  
      after(() => {
        productsService.getProductById.restore();
      });
  
      it('O produto não é encontrado usando o id especificado', async () => {
        await productController.getProductById(req, res);
        expect(res.status.calledWith(404)).to.be.true;
      });
    });


    describe('Testando o controller com endpoint PUT /products/:id', () => {
      let req = {}, res = {}, next;
    
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });
    
      describe('Quando o produto não existe na base de dados', () => {
        before(() => {
          req.params = { id: 999 };
          req.body = { name: 'Product 1', quantity: 1 };
          sinon.stub(productsService, 'getProductById').resolves([[], []]);
        });
    
        after(() => {
          productsService.getProductById.restore();
        });
    
        it('O id não esta relacionado a um produto', async () => {
          await productController.updateProducts(req, res);
  
          expect(res.status.calledWith(404)).to.be.true;
        });
      });
    
      describe('Quando o update do produto é feito com sucesso', () => {
        before(() => {
          req.params = { id: 1 };
          req.body = { name: 'Báculo', quantity: 1 };
          sinon.stub(productsService, 'getProductById').resolves([[UPGRATED_PRODUCT], []]);
        });
    
        after(() => {
          productsService.getProductById.restore();
        });
    
        it('SDeve retornar um status 200', async () => {
          await productController.updateProducts(req, res);
    
          expect(res.status.calledWith(200)).to.be.true;
        });
    
        it('deve retornar o produto que sofreu a alteração', async () => {
          await productController.updateProducts(req, res);
          const objeto = await productsService.getProductById(1);
          
          expect(objeto[0][0]).to.be.an('object');
          expect(objeto[0][0]).to.have.property('id', 1);
          expect(objeto[0][0]).to.have.property('name', 'Báculo');
          expect(objeto[0][0]).to.have.property('quantity', 1);
        });
      });
    });

    
    describe('Testando o controller do endpoint DELETE /products/:id', () => {
      let req = {}, res = {}, next;
    
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });
    
      describe('Quando o produto não existe na base de dados', () => {
        before(() => {
          req.params = { id: 999 };
          sinon.stub(productsService, 'deleteProductId').resolves([]);
        });
    
        after(() => {
          productsService.deleteProductId.restore();
        });
    
        it('O id do produto não tem relação com nenhum produto da base', async () => {
          await productController.deleteProductId(req, res);
    
          expect(res.status.calledWith(404)).to.be.true;
        });
      });
      
      describe('Quando o id é válido e podemos deletar itens', () => {
        before(() => {
          req.params = { id: 1 };
          sinon.stub(productsService, 'deleteProductId').resolves([ { affectedRows: 1 } ])
        });
    
        after(() => {
          productsService.deleteProductId.restore();
        });
    
        it('Deve ser retornado o status 204', async () => {
          await productController.deleteProductId(req, res, next);
    
          expect(res.status.calledWith(204)).to.be.true;
        });
      });
    });
  });

