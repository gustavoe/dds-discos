const express = require('express');
const cors = require('cors');

const app = express();

const initData = process.argv.includes('--init-data');

// cors: acepta peticiones de otro dominio
const corsOptions = {
    origin: `http://localhost:${process.env.CLIENT_PORT}`
};
app.use(cors(corsOptions));

// json: analiza peticiones con content-type - application/json
app.use(express.json());


const db = require('./app/app');

db.sequelize.sync()
  .then(() => {
    console.log("Base de datos sincronizada");
    if (initData){
      db.init(db);
    }
  })
  .catch((err) => {
    console.log("Fallo al sincronizar la base de datos: " + err.message);
  });


app.get('/', (req, res) => {
    res.json({mesage: 'Backend de DDiScos'});
})

require("./app/routes/album.routes")(app);
require("./app/routes/genero.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
    El servidor está corriendo en el puerto ${PORT} 
    En el equipo local http://localhost:${PORT}
    Presioná <ctrl> + <c> para detenerlo
    `)
});