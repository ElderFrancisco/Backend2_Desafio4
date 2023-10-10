const express = require('express');
const http = require('http');
const PORT = 8080;
const routes = require('./routes');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const ProductManager = require('./components/products/productController/productManager');

const productController = new ProductManager('../../../../productos.json');

class Server {
  constructor() {
    this.app = express();
    this.settings();
    this.routes();
    this.server = http.createServer(this.app);
    this.io = null;
    this.initializeSocket();
  }

  settings() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.engine('handlebars', exphbs.engine());
    this.app.set('view engine', 'handlebars');
    this.app.set('views', __dirname + '/views');
    this.app.use(express.static(__dirname + 'public'));
  }

  routes() {
    routes(this.app);
  }

  initializeSocket() {
    this.io = socketIO(this.server);

    this.io.on('connection', (socket) => {
      console.log('Cliente conectado');

      productController
        .getProducts()
        .then((products) => {
          socket.emit('initial products', products);

          socket.on('new product', (newProduct) => {
            console.log('Nuevo producto recibido:', newProduct);
            this.io.emit('new product', newProduct);
          });

          socket.on('delete product', (productId) => {
            console.log('Nuevo producto eliminado:', productId);
            this.io.emit('delete product', productId);
          });
        })
        .catch((error) => {
          console.log(`[ERROR] -> ${error}`);
        });
    });
  }

  listen() {
    this.server.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  }
}

module.exports = new Server();
