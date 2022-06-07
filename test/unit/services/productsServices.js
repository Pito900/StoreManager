const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const { PRODUCT_1, PRODUCT_2, UPGRATED_PRODUCT } = require('../mocks/productsMock');

describe('Os serviços de GET products', () => {
  describe('Quando a base de dados está vazia', () => {
    before(() => {
      sinon.stub(productsModel, 'getAllProducts').resolves([[], []]);
    });

    after(() => {
      productsModel.getAllProducts.restore();
    });

    it('Retorna um array vazio', async () => {
      const result = await productsService.getAllProducts();

      expect(result).to.be.an('array');
      expect(result[0]).to.be.empty;
    });
  });

  describe('Quando a base de dados não é vazia', () => {
    before(() => {
      sinon.stub(productsModel, 'getAllProducts').resolves([[PRODUCT_1, PRODUCT_2], []]);
    });

    after(() => {
      productsModel.getAllProducts.restore();
    });

    it('Retorna um array de objetos.', async () => {
      const result = await productsService.getAllProducts();

      expect(result).to.be.an('array');
      expect(result).not.to.be.empty;

      result[0].forEach((product) => expect(product).to.be.an('object'));
    });

    it('Cada objeto deve contar as chaves id, name e quantity', async () => {
      const result = await productsService.getAllProducts();

      result[0].forEach((product) => expect(product).to.include.all.keys('id', 'name', 'quantity'));
    });
  });
});


describe('Buscando produtos na base pelo id do produto', () => {
  describe('Quando não existe um produto com o id', () => {
    before(() => {
      sinon.stub(productsModel, 'getProductById').resolves([[], []]);
    });

    after(() => {
      productsModel.getProductById.restore();
    });

    it('Deve retornar um array vazio', async () => {
      const result = await productsService.getProductById(4234562);

      expect(result[0]).to.be.an('array');
      expect(result[0]).to.be.empty;
    });
  });

  describe('Quando existe o produto com o id na base', () => {
    before(() => {
      sinon.stub(productsModel, 'getProductById').resolves([[PRODUCT_1], []]);
    });

    after(() => {
      productsModel.getProductById.restore();
    });

    it('Deve retornar um objeto', async () => {
      const result = await productsService.getProductById(1);

      expect(result[0][0]).to.be.an('object');
    });

    it('O objeto deve conter as seguintes keys id, name e quantity', async () => {
      const result = await productsService.getProductById(1);

      expect(result[0][0]).to.include.all.keys('id', 'name', 'quantity');
    });
  });

  describe('Update um product', () => {
    const UPDATE__WRONG_ID = { id: 999, name: 'Capa de invisibilidade', quantity: 1 };
    const UPDATE_PRODUCT = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 4,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    };
    describe('Quando o id não existe na base', () => {
      before(() => {
        sinon.stub(productsService, 'updateProducts').resolves([[], []]);
      });
  
      after(() => {
        productsService.updateProducts.restore();
      });
  
      it('Deve retornar um vetor vazio', async () => {
        const result = await productsService.updateProducts(UPDATE__WRONG_ID.id, UPDATE__WRONG_ID.name, UPDATE__WRONG_ID.quantity);
    
        expect(result[0]).to.be.an('array');
        expect(result[0]).to.be.empty;
      });
    });
  
    describe('Quando o produto existe e o update é conseguido', () => {
      before(() => {
        sinon.stub(productsService, 'updateProducts').resolves([[UPDATE_PRODUCT], []]);
      });
  
      after(() => {
        productsService.updateProducts.restore();
      });
  
      it('Deve retornar o produto que sofreu o update', async () => {
        const result = await productsService.updateProducts(1,'Báculo', 1);

        expect(result[0][0]).to.be.an('object');
        expect(result[0][0]).to.have.property('affectedRows', 1)
      });
    });
  });


  describe('Delete um product', () => {
    const DELETED_PRODUCT_MODEL_RETURN = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    }
    const DELETED_WRONG_PRODUCT = {
      fieldCount: 0,
      affectedRows: 0,
      insertId: 0,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    }
  
    describe('Quando o id não é ligado a um produto', () => {
      before(() => {
        sinon.stub(productsModel, 'deleteProductId').resolves([DELETED_WRONG_PRODUCT, []]);
      });
  
      after(() => {
        productsModel.deleteProductId.restore();
      });
  
      it('Deve retornar o objeto de erro', async () => {
       const result = await productsService.deleteProductId(999);
        
        expect(result[0]).to.be.an('object');
        expect(result[0]).to.be.includes(DELETED_WRONG_PRODUCT); // ver o console.log desse retorno
        
      });
    });
  
    describe('Quando o produto pode ser deletado (id válido)', () => {
      before(() => {
        sinon.stub(productsModel, 'deleteProductId').resolves([DELETED_PRODUCT_MODEL_RETURN, undefined]);
      });
  
      after(() => {
        productsModel.deleteProductId.restore();
      });
  
      it('Deve retornar um objeto cuja a key affectedRows tem valor 1', async () => {
        const result = await productsService.deleteProductId(1);
  
        expect(result[0]).to.be.an('object');
        expect(result[0]).to.have.property('affectedRows', 1);
      });
    });
  });
});
