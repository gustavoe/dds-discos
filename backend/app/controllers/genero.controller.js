const db = require("../app");
const Genero = db.generos;
const Op = db.Sequelize.Op;

// Crea y salva un género
exports.create = (req, res) => {
  // Validar la petición
  if (!req.body.nombre) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Crear un género
  const genero = {
    nombre: req.body.nombre,
  };

  // Salvar el género en la base de datos
  Genero.create(genero)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error creando el género."
      });
    });
};

// Recupera todos los géneros de la base de datos.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condicion = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

  Genero.findAll({ where: condicion })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error recuperando los géneros."
      });
    });
};

// Recupera un género por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Genero.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontró el género con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Ocurrió un error al recuperar el género con id=" + id
      });
    });
};

// Actualizar un género
exports.update = (req, res) => {
  const id = req.params.id;

  Genero.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡El género se actualizó exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo actualizar el género con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Ocurrió un error al actualizar el género con id=" + id
      });
    });
};

// Eliminar un género
exports.delete = (req, res) => {
  const id = req.params.id;

  Genero.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡El género se eliminó exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo borrar el género con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo borrar el género con id=" + id
      });
    });
};
