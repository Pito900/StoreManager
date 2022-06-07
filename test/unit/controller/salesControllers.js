const { expect } = require('chai');
const sinon = require('sinon');
const salesServices = require('../../../services/salesService');
const salesControllers = require('../../../controllers/salesController');


describe('Busca os produtos no BD', () => {
  describe('Quando o banco de dados de venda ta vazio', () => {
    let req = {}, res = {};

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

    it('é chamado o send com a mensagem "Sale not found"', async () => {
      await salesControllers.getAllSales(req, res);

      expect(res.send.calledWith([])).to.be.equal(true);

    });
  })
})
