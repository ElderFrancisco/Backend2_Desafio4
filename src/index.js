const express = require('express');
const PORT = 8080;
const routes = require('./routes');
const bodyParser = require('body-parser');

class Server {
  constructor() {
    this.app = express();
    this.settings();
    this.routes();
  }

  settings() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  routes() {
    routes(this.app);
  }

  listen() {
    this.app.listen(PORT, () => console.log(`http://localhost:${PORT}...`));
  }
}

module.exports = new Server();
