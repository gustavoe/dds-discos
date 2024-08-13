import { Router } from "express";
import generoController from "../../controllers/genero.controller.js";

const router = Router();

// Recuperar todos los géneros
router.get("/", generoController.getAllGeneros);

// Recuperar un género por id
router.get("/:id", (req, res) => {
  res.send("Recuperar un género por id");
});

// Crear un nuevo género
router.post("/", (req, res) => {
  res.send("Crear un nuevo género");
});

// Actualizar un género
router.put("/:id", (req, res) => {
  res.send("Actualizar un género");
});

// Eliminar un género
router.delete("/:id", (req, res) => {
  res.send("Eliminar un género");
});

export default router;
