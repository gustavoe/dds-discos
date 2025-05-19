import Sequelize from 'sequelize'
import dbConfig from './db.config.sqlite.js'

const sequelize = new Sequelize(dbConfig)

const init = async (force) => {
  await sequelize
    .sync({ force })
    .then(() => {
      console.log('Base de datos sincronizada')
    })
    .catch((err) => {
      console.log('Fallo al sincronizar la base de datos: ' + err.message)
    })
}

export default { sequelize, init }
