const { expect } = require('chai');
const sinon = require('sinon');

const database = require('../../../db/connection');
const productsModel = require('../../../models/productsModel');
const { PRODUCT_1, PRODUCT_2 } = require('../mocks/productsMock');

describe('Listar todos os produtos da base de dados', () => {
    describe('Base de dados vazia.', () => {
      before(() => {
        sinon.stub(database, 'execute').resolves([[], []]);
      });
  
      after(() => {
        database.execute.restore();
      });
  
      it('Retorna um array vazio', async () => {
        const result = await productsModel.getAllProducts();
  
        expect(result).to.be.an('array');
        expect(result[0]).to.be.an('array');
        expect(result[1]).to.be.an('array');
        expect(result[0]).to.be.empty;
      });
    });
  
    describe('Quando a base de dados não for vazia.', () => {
      before(() => {
        sinon.stub(database, 'execute').resolves([[PRODUCT_1, PRODUCT_2], []]);
      });
  
      after(() => {
        database.execute.restore();
      });
  
      it('Retorna um array de objetos (no elemento zero)', async () => {
        const result = await productsModel.getAllProducts();
  
        expect(result).to.be.an('array');
        expect(result[0]).to.be.an('array');
        expect(result[1]).to.be.an('array');
        expect(result[0]).not.to.be.empty;
  
        result[0].forEach((product) => expect(product).to.be.an('object'));
      });
  
      it('Cada objeto deve contar as chaves id, name e quantity', async () => {
        const result = await productsModel.getAllProducts();
  
        result[0].forEach((product) => expect(product).to.include.all.keys('id', 'name', 'quantity'));
      });
    });
  });

  describe('Buscando produtos na base pelo id do produto', () => {
    describe('Quando não existe um produto com o id', () => {
      before(() => {
        sinon.stub(database, 'execute').resolves([[], []]);
      });
  
      after(() => {
        database.execute.restore();
      });
  
      it('Deve ser retornado um array vazio', async () => {
        const result = await productsModel.getProductById(4123415);
  
        expect(result).to.be.an('array');
        expect(result[0]).to.be.an('array');
        expect(result[1]).to.be.an('array');
        expect(result[0]).to.be.empty;
      });
    });
  
    describe('Quando o id passado existe na base', () => {
      before(() => {
        sinon.stub(database, 'execute').resolves([[PRODUCT_1], []]);
      });
  
      after(() => {
        database.execute.restore();
      });
  
      it('Retorna um vetor aonde com apenas um objeto', async () => {
        const result = await productsModel.getProductById(1);
  
        expect(result).to.be.an('array');
        expect(result[0]).to.be.an('array');
        expect(result[1]).to.be.an('array');
        expect(result[0]).not.to.be.empty;
  
        expect(result[0][0]).to.be.an('object');
        expect(result[0][1]).to.be.undefined;
      });
  
      it('O objeto deve contar as chaves id, name e quantity', async () => {
        const result = await productsModel.getProductById(1);
  
        expect(result[0][0]).to.include.all.keys('id', 'name', 'quantity');
      });
    });
  });

  describe('Testando a camada MODEL criando um novo produto', () => {
    const CREATE_PRODUCT = { name: 'Capa de invisibilidade', quantity: 1 };
    const CREATE_PRODUCT_MODEL = {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 4,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    };
  
    describe('Produto criado com sucesso', () => {
      before(() => {
        sinon.stub(database, 'execute').resolves([[CREATE_PRODUCT_MODEL], undefined]);
      });
  
      after(() => {
        database.execute.restore();
      });
  
      it('Deve retornar um array com um só objeto', async () => {
        const result = await productsModel.createProducts(CREATE_PRODUCT);
  
        expect(result).to.be.an('array');
        expect(result[0]).to.be.an('array');
        expect(result[0]).not.to.be.empty;
        expect(result[0][0]).to.be.an('object');
        expect(result[0][1]).to.be.undefined;
      });
  
      it('O objeto deve ter um insertedId numérico e diferente de zero.', async () => {
        const result = await productsModel.createProducts(CREATE_PRODUCT);
  
        expect(result[0][0]).to.have.property('insertId');
        expect(result[0][0].insertId).to.be.a('number');
        expect(result[0][0].insertId).to.not.equal(0);
      });
    });
    describe('Update um produto', () => {
      const UPDATED_PRODUCT_ARGS = { id: 1, name: 'Martelo de Thor', quantity: 1 };
      const UPDATED_PRODUCT_MODEL_RETURN = { // isso vem dos consoles log que dei no controller
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      };
    
      describe('Quando é possível dar o update', () => {
        before(() => {
          sinon.stub(database, 'execute').resolves([[UPDATED_PRODUCT_MODEL_RETURN], undefined]);
        });
    
        after(() => {
          database.execute.restore();
        });
    
        it('Retorna um array com apenas um objeto', async () => {
          const result = await productsModel.updateProducts(UPDATED_PRODUCT_ARGS);
    
          expect(result).to.be.an('array');
          expect(result[0]).to.be.an('array');
          expect(result[0]).not.to.be.empty;
          expect(result[0][0]).to.be.an('object');
          expect(result[0][1]).to.be.undefined;
        });
    
        it('A key affectedRows key tem que ter valor 1', async () => {
          const result = await productsModel.updateProducts(UPDATED_PRODUCT_ARGS);
    
          expect(result[0][0]).to.have.property('affectedRows', 1);
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
  };

  describe('Quando podemos deletar um produto', () => {
    before(() => {
      sinon.stub(database, 'execute').resolves([[DELETED_PRODUCT_MODEL_RETURN], undefined]);
    });

    after(() => {
      database.execute.restore();
    });

    it('Retorna uma array com apenas um objeto', async () => {
      const result = await productsModel.deleteProductId(1);

      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('array');
      expect(result[0]).not.to.be.empty;
      expect(result[0][0]).to.be.an('object');
      expect(result[0][1]).to.be.undefined;
    });

    it('A key affectedRows deve ter valor 1', async () => {
      const result = await productsModel.deleteProductId(1);

      expect(result[0][0]).to.have.property('affectedRows', 1);
    });
  });
});

});