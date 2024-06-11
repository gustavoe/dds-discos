module.exports = app => {
    const albums = require("../controllers/album.controller");
  
    var router = require("express").Router();
  
    // Crear un nuevo álbum
    router.post("/", albums.create);
  
    // Recuperar todos los álbumes
    router.get("/", albums.findAll);
  
    // Recuperar un álbum por id
    router.get("/:id", albums.findOne);
  
    // Actualizar un álbum
    router.put("/:id", albums.update);
  
    // Eliminar un álbum
    router.delete("/:id", albums.delete);
  
    app.use('/api/albums', router);
};