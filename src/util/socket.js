const socketIO = require('socket.io');

const ProductManager = require('../components/products/productController/productManager');
const productController = new ProductManager('../../../../productos.json');

module.exports = (server) => {
  const io = socketIO(server);

  io.on('connection', async (socket) => {
    console.log('Cliente conectado');

    socket.emit('productos', await productController.getProducts());

    socket.on('newProduct', async (product) => {
      const newProduct = await productController.addProduct(product);
      if (!newProduct) {
        console.log('completa los datos');
      }
      socket.emit('productos', await productController.getProducts());
    });
  });
};
