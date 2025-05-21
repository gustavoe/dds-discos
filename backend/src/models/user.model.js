import { DataTypes } from 'sequelize'
import db from '../database/db.init.js'

const User = db.sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      len: [5, 20]
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'users',
    timestamps: false
  }
)

export default User
