const express = require('express');
const http = require('http');
const PORT = 8080;
const routes = require('./routes');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const utilSocket = require('./util/socket');

class Server {
  constructor() {
    this.app = express();
    this.settings();
    this.routes();
    this.server = http.createServer(this.app);
    this.utilSocket();
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

  utilSocket() {
    utilSocket(this.server);
  }

  listen() {
    this.server.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  }
}

module.exports = new Server();
