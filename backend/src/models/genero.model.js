import { DataTypes } from 'sequelize'
import db from '../database/db.init.js'

const Genero = db.sequelize.define(
  'genero',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'generos',
    timestamps: false
  }
)

export default Genero
