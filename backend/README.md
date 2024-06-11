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
---

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

#### Etapa 3: Creación de la app e inicialización de la base de datos
---

3.1. Vamos a crear la app separada de la funcionalidad del server propiamente dicha, la configuración de la base de datos y los modelos de datos. Comenzamos por crear la carpeta `app`, dentro de ésta las carpetas `app/config`, `app/controllers`, `app/models`, `app/routes`, y los archivos: `app/app.js`, `app/config/db.config.js`, `app/controllers/album.controller.js`, `app/models/album.model.js`, `app/routes/album.routes.js`. El árbol queda de esta manera:

```
app
|-- app.js
|-- config
|   `-- db.config.js
|-- controllers
|   `-- album.controller.js
|-- models
|   `-- album.model.js
`-- routes
    `-- album.routes.js
```

3.2. En el archivo `app/config/db.config.js` vamos a exponer un objeto que contiene los parámetros para la configuración de la base de datos

```js
const { logger } = require("sequelize/lib/utils/logger");

const dbConfig = {
    dialect: 'sqlite',
    storage: process.env.DB_LOCATION || './.datos/discos.db',
};

module.exports = dbConfig;
```

Podemos agregar otros parámetros también, por ejemplo: `logging:false` para no mostrar la salida de todos los comandos por consola.

3.3. 
En el archivo `app/app.js` vamos a inicializar sequelize usando los parámetros que extrajimos en el archivo `app/config/db.config.js`. El archivo `app/app.js` queda así

```js
const dbConfig = require("./config/db.config.js");

const Sequelize = require('sequelize'); 
const sequelize = new Sequelize(dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
```

3.4. Finalmente invocamos el método `.sync` para crear la base de datos en el caso en que ésta no exista. Hacemos esto en el archivo `/server.js`

```js
...

const db = require('./app/app');

db.sequelize.sync()
  .then(() => {
    console.log("Base de datos sincronizada");
    // db.init(db);
  })
  .catch((err) => {
    console.log("Fallo al sincronizar la base de datos: " + err.message);
  });

...
```

Cuando ejecutemos el server se debería crear la base de datos en la locación que hayamos especificado (por defecto: `/.datos/discos.db`). Si abrimos la base de datos con algun visualizador o la herramienta de línea de comandos [`sqlite3`](https://sqlite.org/cli.html) encontraremos que no hay tablas creadas. Esto es porque todavía no hemos definido ningún modelo.


#### Etapa 4 Creando los modelos e inicializando los datos
---

4.1. Vamos a definir dos modelos: `album` y `genero` en los archivos: `/app/models/album.model.js` y `/app/models/genero.model.js`. De las dos alternativas que tiene Sequelize para definir modelos, vamos a declinarnos por el método `sequelize.define`

`/app/models/album.model.js`
```js
const albumModel = (sequelize, Sequelize) => {

    return sequelize.define("album", {
      id: { 
        type: Sequelize.DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true },
      artista: { 
        type: Sequelize.DataTypes.STRING 
      },
      titulo: { 
        type: Sequelize.DataTypes.STRING 
      },
      genero: { 
        type: Sequelize.DataTypes.STRING 
      },
      soporte: { 
        type: Sequelize.DataTypes.STRING 
      },
      precio: { 
        type: Sequelize.DataTypes.DECIMAL 
      },
      fecha_adquisicion: { 
        type: Sequelize.DataTypes.DATE 
      },
    });
  
};

module.exports = albumModel;
```

`/app/models/genero.model.js`


```js
const generoModel = (sequelize, Sequelize) => {
  
  return sequelize.define("genero", {
    id: { 
      type: Sequelize.DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true },
    nombre: { 
      type: Sequelize.DataTypes.STRING 
    }
  });

};

module.exports = generoModel;
```

4.2. Ahora invocamos a los métodos que definen los modelos desde nuestro programa `/app/app.js` que queda así:

```js
const dbConfig = require("./config/db.config.js");

const Sequelize = require('sequelize'); 
const sequelize = new Sequelize(dbConfig);

const db = {};

const albumModel = require('./models/album.model.js');
const generoModel = require('./models/genero.model.js');

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.albums = albumModel(sequelize, Sequelize); 
db.generos = generoModel(sequelize, Sequelize);;

module.exports = db;
```

Si en este momento iniciamos nuestro servidor se van a crear las tablas correspondientes a los dos modelos que acabamos de definir. Resulta obvio que éstas no contendrán datos, puesto que no hemos hecho nada para que contengan información.

4.3. En este paso vamos a construir un proceso de inicialización para que nuestras tablas contengan datos. Esto nos servirá para tener una aplicación funcional desde el inicio, sin necesidad de ingresar datos manualmente.

En el archivo `/app/config/db.init.js` vamos a inicializar las dos tablas con valores:

```js
const init = (db) => {
    const albums = db.albums;
    const generos = db.generos;

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
      

    albums.truncate();
    albums.bulkCreate([
        {artista: 'A-HA', titulo: 'Memorial Beach', genero: 'Rock', soporte: ' Vinilo ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'A-HA', titulo: 'Cast In Steel', genero: 'Rock', soporte: ' Vinilo ', precio: 800, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'AC/DC', titulo: 'Who Made Who', genero: 'Rock', soporte: ' CD ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'AC/DC', titulo: 'Fly On The Wall', genero: 'Rock', soporte: ' Vinilo ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Arctic Monkeys', titulo: 'Whatever People Say That Im', genero: 'Rock', soporte: ' Vinilo ', precio: 300, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Badu Erykah', titulo: 'Mama´s Gun', genero: 'Rock', soporte: ' Cassette ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Badu Erykah', titulo: 'Baduizm', genero: 'Rock', soporte: ' CD ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Bjork', titulo: 'Selma Songs', genero: 'Rock', soporte: ' CD ', precio: 600, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Bjork', titulo: 'Biophilia', genero: 'Rock', soporte: ' Cassette ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Chemical Brothers', titulo: 'We Are The Night', genero: 'Electronica', soporte: ' CD ', precio: 1700, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Chemical Brothers', titulo: 'Dig Your Own Hole', genero: 'Electronica', soporte: ' CD ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Chet Baker', titulo: 'Complete Recordings', genero: 'Jazz', soporte: ' Vinilo ', precio: 1700, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Chet Baker', titulo: 'Chet Baker Sings', genero: 'Jazz', soporte: ' CD ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Daft Punk', titulo: 'The Many Faces Of - 3 CDs', genero: 'Electronica', soporte: ' CD ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Daft Punk', titulo: 'Random Access Memories', genero: 'Electronica', soporte: ' CD ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Davis Miles', titulo: 'Walkin', genero: 'Jazz', soporte: ' CD ', precio: 1500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Davis Miles', titulo: 'In A Silent Way', genero: 'Jazz', soporte: ' Vinilo ', precio: 1500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Divididos', titulo: 'Divididos', genero: 'Nacional', soporte: ' Vinilo ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Divididos', titulo: 'Otro Le Travaladna', genero: 'Nacional', soporte: ' CD ', precio: 1000, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'El Mató a un Policía Motorizado', titulo: 'Un Millón de Euros', genero: 'Nacional', soporte: ' Vinilo ', precio: 400, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'El Mató a un Policía Motorizado', titulo: 'Navidad de Reserva', genero: 'Nacional', soporte: ' Vinilo ', precio: 700, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'El Mató a un Policía Motorizado', titulo: 'El Mató a un Policía Motorizado', genero: 'Nacional', soporte: ' Cassette ', precio: 1500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Foo Fighters', titulo: 'There Is Nothing Left To Lose', genero: 'Rock', soporte: ' CD ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Gorillaz', titulo: 'The Fall', genero: 'Rock', soporte: ' CD ', precio: 1000, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Gorillaz', titulo: 'The Now Now', genero: 'Rock', soporte: ' Cassette ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jimenez Carlitos La Mona', titulo: 'Cuarteto es la Mona', genero: 'Cuarteto', soporte: ' CD ', precio: 2500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jimenez Carlitos La Mona', titulo: 'El Agite', genero: 'Cuarteto', soporte: ' CD ', precio: 1200, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jimenez Carlitos La Mona', titulo: 'El Vicio de la Mona', genero: 'Cuarteto', soporte: ' Vinilo ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jimenez Carlitos La Mona', titulo: 'Selección Privada 72', genero: 'Cuarteto', soporte: ' CD ', precio: 1200, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jovenes Pordioseros', titulo: 'Vicio', genero: 'Nacional', soporte: ' CD ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jovenes Pordioseros', titulo: 'Sangre', genero: 'Nacional', soporte: ' CD ', precio: 800, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Jovenes Pordioseros', titulo: 'Probame', genero: 'Nacional', soporte: ' CD ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Motörhead', titulo: 'Bastards', genero: 'Metal', soporte: ' Vinilo ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Mötorhead', titulo: 'Welcome to the Bear Trap', genero: 'Metal', soporte: ' Vinilo ', precio: 1500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Mötorhead', titulo: 'Live at Brixton', genero: 'Metal', soporte: ' CD ', precio: 2500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'New Order', titulo: 'Waiting For The Sirens Call', genero: 'Electronica', soporte: ' Vinilo ', precio: 3000, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'New Order', titulo: 'Brotherhood', genero: 'Electronica', soporte: ' Vinilo ', precio: 3500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'New Order', titulo: 'Movement', genero: 'Electronica', soporte: ' Cassette ', precio: 3500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Nirvana', titulo: 'Nevermind', genero: 'Rock', soporte: ' CD ', precio: 3500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Nirvana', titulo: 'In Bloom Collection', genero: 'Rock', soporte: ' CD ', precio: 3900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pandolfo Palo', titulo: 'Antojo', genero: 'Nacional', soporte: ' Cassette ', precio: 3500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pandolfo Palo', titulo: 'A traves de los sueños', genero: 'Nacional', soporte: ' CD ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Patricio Rey Y Sus Redonditos De Ricota', titulo: 'Ultimo Bondi A Finisterre', genero: 'Nacional', soporte: ' CD ', precio: 3300, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Patricio Rey Y Sus Redonditos De Ricota', titulo: 'Momo Sampler', genero: 'Nacional', soporte: ' Vinilo ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pearl Jam', titulo: 'Binaural', genero: 'Rock', soporte: ' CD ', precio: 200, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pearl Jam', titulo: 'Riot Act', genero: 'Rock', soporte: ' Vinilo ', precio: 400, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pink Floyd', titulo: 'Obscured by Clouds', genero: 'Rock', soporte: ' Vinilo ', precio: 400, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Pixies', titulo: 'Trompe Le Monde', genero: 'Rock', soporte: ' CD ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Primus', titulo: 'Green Naugahyde', genero: 'Rock', soporte: ' Vinilo ', precio: 700, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Rage Against The Machine', titulo: 'The Battle of L.A', genero: 'Rock', soporte: ' Vinilo ', precio: 500, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Ramones The', titulo: 'Mondo Bizarro', genero: 'Rock', soporte: ' Cassette ', precio: 3900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Ramones The', titulo: 'Pleasent Dreams', genero: 'Rock', soporte: ' CD ', precio: 1800, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Soda Stereo', titulo: 'Canción Animal', genero: 'Nacional', soporte: ' CD ', precio: 1900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'Soda Stereo', titulo: 'Sueño Stereo', genero: 'Nacional', soporte: ' Cassette ', precio: 900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'ZZ Top', titulo: 'Eliminator', genero: 'Rock', soporte: ' CD ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'ZZ Top', titulo: 'Tejas', genero: 'Rock', soporte: ' CD ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
        {artista: 'ZZ Top', titulo: 'Fandango', genero: 'Rock', soporte: ' Vinilo ', precio: 2900, fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())},
    ]);

    generos.truncate();
    generos.bulkCreate([
        {nombre: 'Cuarteto'},
        {nombre: 'Electrónica'},
        {nombre: 'Jazz'},
        {nombre: 'Metal'},
        {nombre: 'Nacional'},
        {nombre: 'Rock'}
    ]);
}

module.exports = init;
```

En `/app/app.js` agregamos las líneas:

```js

...

const init = require('./config/db.init.js')

...

db.init = init;

...

```

Finalmente vamos a invocar este método pero solamante cuando nos interese inicializar los datos, de modo que vamos a usar un argumento para que pueda ser invocado de forma selectiva.

En `server.js` agregamos las líneas:

```js

...

const initData = process.argv.includes('--init-data');

...

db.sequelize.sync({force:true})
  .then(() => {
    console.log("Base de datos sincronizada");
    if (initData){
      db.init(db);
    }
  })
  .catch((err) => {
    console.log("Fallo al sincronizar la base de datos: " + err.message);
  });

...

```

Para que la inicialización se lleve a cabo, tenemos que invocar nuestra aplicación con:

```bash
npx nodemon server --init-data
```

o

```bash
node server --init-data
```

#### Etapa 5 Agregando controladores 
---

Ya tenemos la base de datos y el ORM funcionales, ahora vamos a crear los controladores que se encargarán de manejar las peticiones que entran y retornar la respuesta al cliente.

`/app/controllers/album.controller.js`
```js
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

```

y `/app/controllers/genero.controller.js`
```js
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
```

#### Etapa 6 Creando las rutas 
---

Usando Express routing vamos a crear las rutas de nuestra API en los archivos: 

`/app/routes/album.routes.js`
```js
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
```

y

`/app/routes/genero.routes.js`
```js
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
```

También en `/server.js` agregamos

```js

...

require("./app/routes/album.routes")(app);
require("./app/routes/genero.routes")(app);

...

```


#### Etapa 7 Testeando las APIs manualmente 
---

Vamos a usar el complemento de VS Code llamado REST Client para testear nuestras APIs manualmente. Podemos usar otras herramientas también como Postman, Imsomnia o Thunder Client, para este caso elegimos esta por su simpleza y por ser de código abierto. 

Para esto, creamos dos archivos http con las peticiones: `/http/albums.http` y `/http/generos.http`. Presionando <Ctrl> + <Alt> + <R> sobre cada petición, ésta será ejecutada contra el server (que debe estar funcionando)

El contenido del archivo `/http/albums.http`
```http
@protocol = http
@hostname = localhost
@port = 3000
@host = {{protocol}}://{{hostname}}:{{port}}
@apiUrl = api/albums/
@contentType = application/json


### Recuperar todos los álbumes
GET {{host}}/{{apiUrl}} HTTP/1.1

### Recuperar un álbum por id
GET {{host}}/{{apiUrl}}/2 HTTP/1.1

### Crear un álbum
POST {{host}}/{{apiUrl}} HTTP/1.1
content-type: {{contentType}}

{
    "titulo": "Nuevo Álbum",
    "artista": "Nuevo Artista"
}

### Actualizar un álbum
PUT {{host}}/{{apiUrl}}/58 HTTP/1.1
content-type: {{contentType}}

{
    "artista": "Artista Actualizado"
}

### Eliminar un álbum
DELETE {{host}}/{{apiUrl}}/58 HTTP/1.1

```

y el archivo `/http/generos.http`

```http
@protocol = http
@hostname = localhost
@port = 3000
@host = {{protocol}}://{{hostname}}:{{port}}
@apiUrl = api/generos/
@contentType = application/json


### Recuperar todos los géneros
GET {{host}}/{{apiUrl}} HTTP/1.1

### Recuperar un género por id
GET {{host}}/{{apiUrl}}/2 HTTP/1.1

### Crear un género
POST {{host}}/{{apiUrl}} HTTP/1.1
content-type: {{contentType}}

{
    "nombre": "folklore"
}

### Actualizar un género
PUT {{host}}/{{apiUrl}}/7 HTTP/1.1
content-type: {{contentType}}

{
    "nombre": "folklore actualizado"
}

### Eliminar un género
DELETE {{host}}/{{apiUrl}}/7 HTTP/1.1

```