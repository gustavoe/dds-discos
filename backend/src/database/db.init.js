import dbConfig from './db.config.sqlite.js'

import Sequelize from 'sequelize'

import albumModel from '../models/album.model.js'
import generoModel from '../models/genero.model.js'
import dbSeed from './db.seed.js'
const sequelize = new Sequelize(dbConfig)

const db = {}

db.albums = albumModel(sequelize, Sequelize)
db.generos = generoModel(sequelize, Sequelize)

const init = async (force, seed) => {
  sequelize
    .sync({ force })
    .then(() => {
      console.log('Base de datos sincronizada')
      if (seed) {
        dbSeed(db)
      }
    })
    .catch((err) => {
      console.log('Fallo al sincronizar la base de datos: ' + err.message)
    })
}

db.init = init
export default db
