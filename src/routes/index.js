const productsApi = require('../components/products');
const cartsApi = require('../components/cart');
const webSocket = require('../components/webSocket');

module.exports = (app) => {
  webSocket(app);
  productsApi(app);
  cartsApi(app);
  app.get('/', (req, res) => res.send('Hello world!'));
};
