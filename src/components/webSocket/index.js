//
//
const ProductManager = require('../products/productController/productManager');
const productController = new ProductManager('../../../../productos.json');
const http = require('http');
const socketIo = require('socket.io');

module.exports = (app) => {
  const server = http.createServer(app);
  const io = socketIo(server);

  app.get('/', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit);
      const productsList = await productController.getProducts(limit);
      const productsListParced = JSON.parse(productsList);
      res.render('home', { productsListParced });
    } catch (error) {
      console.log(error);
    }
  });

  app.get('/realtimeproducts', async (req, res) => {
    try {
      const productslIST = await productController.getProducts();
      const products = JSON.parse(productslIST);
      res.render('realTimeProducts', { products });
    } catch (error) {
      console.log(`[ERROR] -> ${error}`);
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  });
};
