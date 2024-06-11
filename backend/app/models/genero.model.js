const generoModel = (sequelize, Sequelize) => {
  
  return sequelize.define("genero", {
    id: { 
      type: Sequelize.DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true },
    nombre: { 
      type: Sequelize.DataTypes.STRING 
    }
  });

};

module.exports = generoModel;

