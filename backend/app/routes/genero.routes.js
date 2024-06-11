module.exports = app => {
    const generos = require("../controllers/genero.controller");
  
    var router = require("express").Router();
  
    // Crear un nuevo género
    router.post("/", generos.create);
  
    // Recuperar todos los géneros
    router.get("/", generos.findAll);
  
    // Recuperar un género por id
    router.get("/:id", generos.findOne);
  
    // Actualizar un género
    router.put("/:id", generos.update);
  
    // Eliminar un género
    router.delete("/:id", generos.delete);
  
    app.use('/api/generos', router);
};