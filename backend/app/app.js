import dbConfig from "./config/db.config.js";

import Sequelize from "sequelize";
const sequelize = new Sequelize(dbConfig);

const db = {};

import albumModel from "./models/album.model.js";
import generoModel from "./models/genero.model.js";
import init from "./config/db.init.js";

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.albums = albumModel(sequelize, Sequelize);
db.generos = generoModel(sequelize, Sequelize);
db.init = init;

export default db;
