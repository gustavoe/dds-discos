const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json({mesage: 'Backend de DDiScos'});
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`
    El servidor está corriendo en el puerto ${PORT} 
    En el equipo local http://localhost:${PORT}
    Presioná <ctrl> + <c> para detenerlo
    `)
});