const ProductManager = require('./productController/productManager');
const { Router } = require('express');
const bodyParser = require('body-parser');

const productController = new ProductManager('../../../../productos.json');

module.exports = (app) => {
  let router = new Router();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/products', router);

  router.get('/', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit);
      const productsList = await productController.getProducts(limit);
      const productsListParced = JSON.parse(productsList);
      res.send(productsListParced);
    } catch (error) {
      console.log(error);
    }
  });

  router.get('/:pid', async (req, res) => {
    try {
      const paramsID = parseInt(req.params.pid);
      const productId = await productController.getProductById(paramsID);
      if (productId) {
        const productIDParced = JSON.parse(productId);
        return res.send(productIDParced);
      }
      return res.send('no se econtro el producto con el ' + paramsID);
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const body = req.body;
      let a = await productController.addProduct(body);
      res.send(a);
    } catch (error) {
      console.log(error);
    }
  });

  router.put('/:pid', async (req, res) => {
    try {
      const paramsID = parseInt(req.params.pid);
      const body = req.body;
      const productUpdate = await productController.updateProduct(
        paramsID,
        body,
      );
      return productUpdate;
    } catch (error) {
      console.log(error);
    }
  });

  router.delete('/:pid', async (req, res) => {
    try {
      const paramsID = parseInt(req.params.pid);
      await productController.deleteProduct(paramsID);
      return;
    } catch (error) {
      console.log(error);
    }
  });
};
