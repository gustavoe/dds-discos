import { DataTypes } from 'sequelize'
import db from '../database/db.init.js'

const Album = db.sequelize.define(
  'album',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    artista: {
      type: DataTypes.STRING,
      allowNull: false
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genero: {
      type: DataTypes.STRING
    },
    soporte: {
      type: DataTypes.STRING
    },
    precio: {
      type: DataTypes.DECIMAL
    },
    fecha_adquisicion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'albums',
    timestamps: false
  }
)

export default Album
