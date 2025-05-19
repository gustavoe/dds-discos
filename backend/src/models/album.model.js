const albumModel = (sequelize, Sequelize) => {
  return sequelize.define(
    'album',
    {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      artista: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      titulo: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      genero: {
        type: Sequelize.DataTypes.STRING
      },
      soporte: {
        type: Sequelize.DataTypes.STRING
      },
      precio: {
        type: Sequelize.DataTypes.DECIMAL
      },
      fecha_adquisicion: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      }
    },
    {
      tableName: 'albums',
      timestamps: false
    }
  )
}

export default albumModel
