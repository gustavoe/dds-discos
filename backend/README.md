# dds-discos
Ejemplo de aplicación web Node.js y React 


## Construcción del backend 

Vamos a construir el backend usando las siguientes tecnologías:
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Sqlite 3](https://sqlite.org/)
* [Sequelize](https://sequelize.org/)

### Pasos

#### Etapa 1: Inicialización del proyecto
---

1.1. Usando la consola creamos la carpeta y nos movemos a la carpeta 

```bash
mkdir backend && cd backend
```

1.2. Inicializamos el proyecto npm

```bash
npm init -y
```

1.3. E instalamos los paquetes que usaremos para el desarrollo de la aplicación

```bash
npm i express cors sqlite3 sequelize 
```

1.4. Abrimos el editor de código para comenzar a escribir el servidor

```bash
code .
```

#### Etapa 2: Creación del servidor con Express

2.1. Creamos el archivo `server.js` en el cual vamos a codificar un servidor básico con Express

```javascript
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
```

2.2. Probamos el servidor ejecutando en la consola:

```bash
node server.js
```

y luego podemos usar la consola para probarlo

```bash
curl http://localhost:3000
{"mesage":"Backend de DDiScos"}%
```

o también un navegador y tipeamos `http://localhost:3000` en la caja de direcciones en donde deberíamos ver algo similar al mensaje de la consola.

2.3. Ahora vamos a completar y mejorar un poco nuestro servidor. En principio vamos mejorar la siguiente situación: hasta el momento si realizamos cambios en el código fuente necesitamos detener y volver a iniciar el servidor. Con el paquete [`nodemon`](https://www.npmjs.com/package/nodemon) podemos hacer que esto no sea necesario.

Para eso, vez de ejecutar el server usando `node server.js` vamos a usar  

```bash
npx nodemon server.js
```

Es posible que la primera vez que lo ejecutemos nos pida instalar. Vamos a observar que ahora cada vez que guardemos un archivo se reiniciará el servidor.

2.4. Vamos a extraer el valor del puerto de modo que, en vez de estar en duro en el código, esté en un archivo de entorno. 

> [!IMPORTANT]
> Vamos a asumir (al tiempo de escribir este tutorial) que estás corriendo una versión de Node.js posterior a la `20.6`. Si estás corriendo una versión anterior de Node.js, tenés que instalar la dependencia [dotenv](https://www.npmjs.com/package/dotenv), la forma de cargarlo cambia levemente y la podés ver en la documentación del paquete. A partir de la versión `21.7` de Node.js no necesitamos instalar ninguna dependencia ni especificar el archivo de configuración en la línea de comandos para gestionar este tipo de archivos. 

Para eso vamos a crear un archivo de entorno `.env` con el siguiente contenido

```env
PORT=3001
CLIENT_PORT=3002
```

> [!IMPORTANT]
> Este tipo de archivos se deben excluir del VCS mediante su inclusión en el archivo `.gitignore`. El motivo de esta práctica es que muy frecuentemente incluimos en estos archivos, passwords, keys y secrets que no debemos compartir de esta manera en el repositorio. 

En `server.js` cambiamos la línea en la que asignamos el puerto por

```js
const PORT = process.env.PORT || 3000;
```

y ejecutamos el proyecto pasando por parámetro el archivo de entorno correspondiente:

```bash
node --env-file=.env server.js
```
o

```bash
npx nodemon --env-file=.env server.js
```

2.5. Vamos a finalizar la construcción de la funcionalidad de server incluyendo algunos [middleware](http://expressjs.com/en/guide/using-middleware.html) que son necesarios para la mayoría de las APIs

* [cors](https://expressjs.com/en/resources/middleware/cors.html)
* [json](http://expressjs.com/es/api)

Por el momento el código de `server.js` queda así

```js
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
```

