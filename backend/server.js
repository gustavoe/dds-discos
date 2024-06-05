const express = require('express');
const cors = require('cors');

const app = express();

// cors: acepta peticiones de otro dominio
const corsOptions = {
    origin: `http://localhost:${process.env.CLIENT_PORT}`
};
app.use(cors(corsOptions));

// json: analiza peticiones con content-type - application/json
app.use(express.json());

app.get('/', (req, res) => {
    res.json({mesage: 'Backend de DDiScos'});
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
    El servidor está corriendo en el puerto ${PORT} 
    En el equipo local http://localhost:${PORT}
    Presioná <ctrl> + <c> para detenerlo
    `)
});