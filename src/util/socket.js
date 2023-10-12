const http = require('http');
const socketIO = require('socket.io');

const ProductManager = require('../components/products/productController/productManager');
const productController = new ProductManager('../../../../productos.json');

module.exports = (server) => {
  console.log('aca');
  const io = socketIO(server);
  io.on('connection', async (socket) => {
    console.log('Cliente conectado');
    socket.emit('productos', await productController.getProducts());
  });
};
