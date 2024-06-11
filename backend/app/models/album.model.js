const albumModel = (sequelize, Sequelize) => {

    return sequelize.define("album", {
      id: { 
        type: Sequelize.DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true },
      artista: { 
        type: Sequelize.DataTypes.STRING 
      },
      album: { 
        type: Sequelize.DataTypes.STRING 
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
        type: Sequelize.DataTypes.DATE 
      },
    });
  
};

module.exports = albumModel;

