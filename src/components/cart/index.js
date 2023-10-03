const CartManager = require('./cartController/cartManager');
const { Router } = require('express');
const bodyParser = require('body-parser');

const cartController = new CartManager('../../../../carrito.json');

module.exports = (app) => {
  let router = new Router();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/cart', router);

  router.post('/', async (req, res) => {
    const body = req.body;
    const cart = await cartController.createNewCart(body);
    res.send(cart);
  });

  router.get('/:cid', async (req, res) => {
    const idParam = parseInt(req.params.cid);
    const cartId = await cartController.getCartById(idParam);
    res.send(cartId);
  });

  router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const Carts = await cartController.getCarts(limit);
    res.send(Carts);
  });

  router.post('/:cid/product/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const updatedCart = await cartController.updateCart(cid, pid);
    res.send(updatedCart);
  });
};
