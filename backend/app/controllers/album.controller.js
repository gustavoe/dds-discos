const db = require("../app");
const Album = db.albums;
const Op = db.Sequelize.Op;

// Crea y salva un álbum
exports.create = (req, res) => {
  // Validar la petición
  if (!req.body.artista || !req.body.titulo) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Crear un álbum
  const album = {
    artista: req.body.artista,
    titulo: req.body.titulo,
    genero: req.body.genero,
    soporte: req.body.soporte,
    precio: req.body.precio,
    titulo: req.body.titulo,
    fecha_adquisicion: req.body.fecha_adquisicion ? req.body.fecha_adquisicion : new Date()
  };

  // Salvar el álbum en la base de datos
  Album.create(album)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error creando el álbum."
      });
    });
};

// Recupera todos los álbumes de la base de datos.
exports.findAll = (req, res) => {
  const titulo = req.query.titulo;
  var condicion = titulo ? { titulo: { [Op.like]: `%${titulo}%` } } : null;

  Album.findAll({ where: condicion })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error recuperando los álbumes."
      });
    });
};

// Recupera un álbum por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Album.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontró el álbum con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Ocurrió un error al recuperar el álbum con id=" + id
      });
    });
};

// Actualizar un álbum
exports.update = (req, res) => {
  const id = req.params.id;

  Album.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡El álbum se actualizó exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo actualizar el álbum con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Ocurrió un error al actualizar el álbum con id=" + id
      });
    });
};

// Eliminar un álbum
exports.delete = (req, res) => {
  const id = req.params.id;

  Album.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡El álbum se eliminó exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo borrar el álbum con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar el álbum con id=" + id
      });
    });
};
