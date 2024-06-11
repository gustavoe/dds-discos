const dbConfig = require("./config/db.config.js");

const Sequelize = require('sequelize'); 
const sequelize = new Sequelize(dbConfig);

const db = {};

const albumModel = require('./models/album.model.js');
const generoModel = require('./models/genero.model.js');
const init = require('./config/db.init.js')

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.albums = albumModel(sequelize, Sequelize); 
db.generos = generoModel(sequelize, Sequelize);;
db.init = init;

module.exports = db;