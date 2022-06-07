const sinon = require('sinon');
const { expect } = require('chai');
const database = require('../../../db/connection');
const salesModel = require('../../../models/salesModel');
const req = require('express/lib/request');

describe('Busca as vendas no BD', () => {
  describe('Quando o banco de dados está vazio', () => {
    before(() => {
        req.params = { id: 1 }
        sinon.stub(database, 'execute').resolves([[], []]);
      });
  
      after(() => {
        database.execute.restore();
      });
  

    it('Retorna um array vazio, pois ela busca todos em um banco vazio', async () => {
      const [result] = await salesModel.getAllSales();
      expect(result).to.be.an('array');
      expect(result).to.be.empty;
    });

    it('retorna um array vazio, pois o id n está ligado a uma venda', async () => {
      const result = await salesModel.getSalesById(1431324);
      expect(result[0]).to.be.an('array');
      expect(result[0]).to.be.empty;
    });
  })

  describe('Quando a base de dados n está vazia', ()=> {
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
      sinon.stub(database, 'execute').resolves([sales]);
    });

    after(() => {
      database.execute.restore();
    })
    
      it('deve retornar um objeto com as chaves saleId, date, productId e quantity', async () => {
        const [resultado] = await salesModel.getAllSales();
        expect(resultado[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });
  });
})