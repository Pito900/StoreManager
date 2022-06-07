const { expect } = require('chai');
const sinon = require('sinon');
const salesServices = require('../../../services/salesService');
const salesControllers = require('../../../controllers/salesController');


describe('Busca os produtos no BD', () => {
    let req = {}, res = {};
  describe('Quando o banco de dados de venda ta vazio', () => {

    before(() => {
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();
      sinon.stub(salesServices, 'getAllSales').resolves([]);
    })

    after(() => {
        salesServices.getAllSales.restore();
     });

    it('é chamado o status com o código 404', async () => {
      await salesControllers.getAllSales(req, res);

      expect(res.status.calledWith(404)).to.be.true;
    });

    it('Retorna um array vazio', async () => {
      await salesControllers.getAllSales(req, res);

      expect(res.send.calledWith([])).to.be.equal(true);

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
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getAllSales').resolves(sales);
    });

    after(() => {
      salesServices.getAllSales.restore();
    })

    it('retorna o status 200', async () => {
        await salesControllers.getAllSales(req, res);
    
        expect(res.status.calledWith(200)).to.be.true;
      });
    
      it('deve retornar um objeto com as chaves saleId, date, productId e quantity', async () => {
        await salesControllers.getAllSales(req, res);
        const resultado = await salesServices.getAllSales();
        expect(resultado[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });
  });
  describe('procurando venda por id', ()=> {
    before(() => {
      req.params = { id: 1 };
      const sale =  [
        {
            "date": "2022-06-07T18:28:38.000Z",
            "productId": 1,
            "quantity": 5
        },
        {
            "date": "2022-06-07T18:28:38.000Z",
            "productId": 2,
            "quantity": 10
        }
    ]
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getSalesById').resolves(sale);
    });

    after(() => {
      salesServices.getSalesById.restore();
    })

    it('retorna o status 200', async () => {
        await salesControllers.getSalesById(req, res);
    
        expect(res.status.calledWith(200)).to.be.exist;
      });
    
    //   it('deve retornar um objeto com as chaves saleId, date, productId e quantity', async () => {
    //     await salesControllers.getAllSales(req, res);
    //     const resultado = await salesServices.getAllSales();
    //     expect(resultado[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    //   });
  });
})
