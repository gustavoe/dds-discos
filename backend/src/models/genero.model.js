const generoModel = (sequelize, Sequelize) => {
  return sequelize.define(
    "genero",
    {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "generos",
      timestamps: false,
    },
  );
};

export default generoModel;
