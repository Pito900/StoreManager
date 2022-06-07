const sinon = require('sinon');
const { expect } = require('chai');
const salesModels = require('../../../models/salesModel');
const salesServices = require('../../../services/salesService');

describe('Busca as vendas no BD', () => {
  describe('Quando o banco de dados está vazio', () => {
    
    before(() => {
      sinon.stub(salesModels, 'getAllSales').resolves([[]]);
    });

    after(() => {
      salesModels.getAllSales.restore();
    })

    it('Retorna um array vazio.', async () => {
      const [result] = await salesServices.getAllSales();
      expect(result).to.be.an('array');
      expect(result).to.be.empty;
    });
  })

  describe('Quando há vendas no banco de dados', ()=> {

    before(() => {
      const sales = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]
      sinon.stub(salesModels, 'getAllSales').resolves(sales);
    });

    after(() => {
      salesModels.getAllSales.restore();
    })

      it('deve retornar um objeto com as chaves saleId, date, productId e quantity', async () => {
        const [resultado] = await salesServices.getAllSales();
        expect(resultado).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });
  });

  describe('quando é passado um id como parâmetro e há resultado correspondente', ()=> {
    const sale = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
    ]

    before(() => {
      sinon.stub(salesModels, 'getSalesById').resolves(sale);
    });

    after(() => {
      salesModels.getSalesById.restore();
    })

      it('deve retornar um objeto da venda referente ao id', async () => {
        const [resultado] = await salesModels.getSalesById(1);
        expect(resultado.saleId).to.be.equal(1);
      });
  });
})