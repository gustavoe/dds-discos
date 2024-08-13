import express from "express";
import cors from "cors";

import db from "./src/database/db.init.js";

import v1AlbumRouter from "./src/v1/routes/album.routes.js";
import v1GeneroRouter from "./src/v1/routes/genero.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
const corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT}`,
};
app.use(cors(corsOptions));
app.use(express.json());

// rutas
app.get("/", (req, res) => {
  res.json({ mesage: "Backend de DDiScos" });
});
app.use("/api/v1/albums", v1AlbumRouter);
app.use("/api/v1/generos", v1GeneroRouter);

app.listen(PORT, () => {
  db.init(true, true).then(() =>
    console.log(`💿 Servidor corriendo en el puerto ${PORT}`),
  );
});
