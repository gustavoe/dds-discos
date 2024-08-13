# dds-discos
Ejemplo de aplicación web Node.js y React

- [Etapa 1: Inicialización del proyecto](#etapa-1-inicialización-del-proyecto)
- [Etapa 2: Creación del servidor con Express](#etapa-2-creación-del-servidor-con-express)
- [Etapa 3: Creación de la app y las rutas](#etapa-3-creación-de-la-app-y-las-rutas)
- [Etapa 4: Base de Datos, Modelos y ORM](#etapa-4-base-de-datos-modelos-y-orm)
- [Etapa 5: Servicios y controladores](#etapa-5-servicios-y-controladores)

## Construcción del backend

Vamos a construir el backend usando las siguientes tecnologías:
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Sqlite 3](https://sqlite.org/)
* [Sequelize](https://sequelize.org/)

### Etapas

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
1.5. Nota sobre la nomenclatura: el plural en castellano de la palabra `álbum` es `álbumes` pero por simplicidad hemos preferido usar el plural en inglés, es decir: `albums` para los identificadores, rutas y archivos, mientras mantenemos el plural en español el los comentarios y mensajes.


#### Etapa 2: Creación del servidor con Express
---

2.1. Creamos el archivo `app.js` en el cual vamos a codificar un servidor básico con Express

```javascript
import express from "express";

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.json({mesage: 'Backend de DDiScos'});
})

app.listen(PORT, () => {
    console.log(`💿 Servidor corriendo en el puerto ${PORT}`)
});
```

Cómo estamos usando [ESModules](https://nodejs.org/api/esm.html) necesitamos que Node.js interprete los módulos de esa manera. Para esto vamos a editar nuestro archivo `package.json` agregando en el nivel superior el campo `type` con el valor `"module"`:

```json
...
"type": "module",
...
```

2.2. Probamos el servidor ejecutando en la consola:

```bash
node app.js
```

y luego podemos usar la consola para probarlo

```bash
curl http://localhost:3000
{"mesage":"Backend de DDiScos"}%
```

o también un navegador y tipeamos `http://localhost:3000` en la caja de direcciones en donde deberíamos ver algo similar al mensaje de la consola.

2.3. Ahora vamos a completar y mejorar un poco nuestro servidor. En principio vamos mejorar la siguiente situación: hasta el momento si realizamos cambios en el código fuente necesitamos detener y volver a iniciar el servidor. Usando la opción `--watch` disponible desde la versión v18.11 de Node.js de forma experimental:

Para eso, en vez de ejecutar el index usando `node app.js` vamos a usar:

```bash
node --watch app.js
```

> [!NOTE]
> Si esta opción no está disponible podemos usar el paquete [`nodemon`](https://www.npmjs.com/package/nodemon).


Para hacer un poco mejor esta situación podemos agregar [npm scripts] (https://docs.npmjs.com/cli/v10/commands/npm-run-script). Uno para iniciar el servidor y otro para iniciarlo de forma interactiva. El nodo `scripts` del `package.json` queda:

```json
...
"scripts": {
  "start": "node ./index",
  "dev": "node --watch ./index",
  "test": "echo \"Error: no test specified\" && exit 1"
},
...

```

y desde ahora podemos iniciar el servidor con:

```sh
npm start
```

o iniciarlo de forma interactiva para el desarrollo con

```sh
npm run dev
```

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

En `app.js` cambiamos la línea en la que asignamos el puerto por

```js
const PORT = process.env.PORT || 3000;
```

y ejecutamos el proyecto pasando por parámetro el archivo de entorno correspondiente:

```bash
node --env-file=.env app.js
```

también podemos incorporar esta opción en los scripts de nuestro `package.json`

```json
"scripts": {
  "start": "node --env-file=.env ./app",
  "dev": "node --watch --env-file=.env  ./app",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

2.5. Vamos a finalizar la construcción de la funcionalidad de index incluyendo algunos [middleware](http://expressjs.com/en/guide/using-middleware.html) que son necesarios para la mayoría de las APIs

* [cors](https://expressjs.com/en/resources/middleware/cors.html)
* [json](http://expressjs.com/es/api)

Por el momento el código de `app.js` queda así

```js
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
const corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT}`,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mesage: "Backend de DDiScos" });
});

app.listen(PORT, () => {
  console.log(`💿 Servidor corriendo en el puerto ${PORT}`);
});
```


#### Etapa 3: Creación de la app y las rutas
---

3.1. Adoptaremos una arquitectura en capas que, por su simplicidad, es adecuada para este proyecto inicial.


```txt
request               response
   │                    ▲
   │                    │
   ▼                    │
┌──────────────────────────┐
│          router          │
└──────────────────────────┘
   │                    ▲
   │                    │
   ▼                    │
┌──────────────────────────┐
│        controller        │
└──────────────────────────┘
   │                    ▲
   │                    │
   ▼                    │
┌──────────────────────────┐
│         services         │
└──────────────────────────┘
   │                    ▲
   │                    │
   ▼                    │
┌──────────────────────────┐
│        data access       │
└──────────────────────────┘
```

Los *routers* de Express pasan las peticiones a los *controllers* correspondientes.

Los *controllers* se encargan de todo lo que tiene que ver con HTTP: las peticiones y las respuestas que provienen de los endpoints.

La lógica de negocio se implementa en la capa de *services* que expone ciertos métodos que son invocados desde los *controllers*

La capa de *data access* se ocupa de la recuperación y persistencia de los datos en la base de datos.

3.2. Vamos a crear una estructura de directorios que de soporte a la arquitectura planteada. La estructura sería, más o menos así:

```
`-- src
    |-- controllers
    |-- database
    |-- models
    |-- services
    `-- v1
        `-- routes
```

La razón por la cual la carpeta `routes` está dentro de la carpeta `v1` es porque estamos implementando la buena práctica sobre el versionado de las APIs REST. Esto nos permite trabajar en sucesivas versiones sin necesidad de que los clientes que dependen de la versión actual tengan que adoptar esos cambios de forma inmediata y pueden seguir funcionando.

Para crear rápidamente esta estructura podemos ejecutar:

```sh
mkdir -p src/{database,controllers,models,services,v1/routes}
```

3.3. Comenzaremos, entonces, por escribir las rutas de la `v1` de nuestra API. Para eso vamos a crear dos archivos en la carpeta `/src/v1/routes`: `album.routes.js`, `genero.routes.js`

`/src/v1/routes/album.routes.js`
```js
import { Router } from "express";

const router = Router();

// Recuperar todos los álbumes
router.get("/", (req, res) => {
  res.send("Recuperar todos los álbumes");
});

// Recuperar un álbum por id
router.get("/:id", (req, res) => {
  res.send("Recuperar un álbum por id");
});

// Crear un nuevo álbum
router.post("/", (req, res) => {
  res.send("Crear un nuevo álbum");
});

// Actualizar un álbum
router.put("/:id", (req, res) => {
  res.send("Actualizar un álbum");
});

// Eliminar un álbum
router.delete("/:id", (req, res) => {
  res.send("Eliminar un álbum");
});

export default router;
```

`/src/v1/routes/genero.routes.js`
```js
import { Router } from "express";

const router = Router();

// Recuperar todos los géneros
router.get("/", (req, res) => {
  res.send("Recuperar todos los géneroes");
});

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
```

3.4. Necesitamos agregar las rutas usando el router de Express, para eso agregamos las siguientes líneas en `app.js`

```js
...
app.use("/api/v1/albums", v1AlbumRouter);
app.use("/api/v1/generos", v1GeneroRouter);
...
```

3.5. Vamos a usar el complemento de VS Code llamado REST Client para testear nuestras APIs manualmente. Podemos usar otras herramientas también como Bruno,  Postman, Imsomnia o Thunder Client. En este caso elegimos ésta por su simpleza y por que corre en el mismo entorno de desarrollo.

Para esto, creamos dos archivos http con las peticiones que vamos a testear: `/http/albums.http` y `/http/generos.http`. Las peticiones están separadas entre si por `###`. Presionando <Ctrl> + <Alt> + <R> sobre cada petición, ésta será ejecutada contra el server (que debe estar funcionando)

El contenido del archivo `/http/albums.http`
```http
@protocol = http
@hostname = localhost
@port = 3001
@host = {{protocol}}://{{hostname}}:{{port}}
@apiUrl = api/v1/albums/
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
@port = 3001
@host = {{protocol}}://{{hostname}}:{{port}}
@apiUrl = api/v1/generos/
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

El resultado esperado es obtener `200 OK` como status para cada una de las peticiones y el mensaje provisorio que retornamos para cada una de ellas.

#### Etapa 4: Base de Datos, Modelos y ORM
---

4.1. En esta etapa comenzaremos desde "abajo" respecto del diagrama de arquitectura en capas que planteamos en el punto [3.1.](#### Etapa 3: Creación de la app y las rutas) con el acceso a datos.

4.2. Comenzamos creando un archivo que contendrá la configuración de la base de datos. En este caso estamos usando Sqlite, pero podríamos crear configuraciones para otras bases de datos y cambiar entre ellas de ser necesario.

`src/database/db.config.sqlite.js`
```js
const dbConfig = {
  dialect: "sqlite",
  storage: process.env.DB_LOCATION || "./data/discos.db",
  logging: process.env.DB_LOGGING === "true" || false,
};

export default dbConfig;
```

El valor de `logging` determina si Sequelize muestra por consola la salida de las operaciones de base de datos. Puede ser útil para la depuración pero también puede resultar molesto cuando no lo necesitamos. Entonces podemos incluir esa configuración en el archivo `.env`. Hay que tener en cuenta que los valores del archivo de entorno no se parsean a `bool` o `number` de modo que con esta comparación resolvemos ese problema de forma sencilla.

4.3. En otro archivo `db.init.js` vamos a escribir el código que nos permita inicializar el acceso a datos usando Sequelize. Vamos a hacer esto invocando al método `sync` que sincroniza la estructura de la base de datos con el modelo definido. Si pasamos true como parámetro se forzará esta sincronización. Más adelante haremos que este parámetro sea configurable.

`src/database/db.init.js`
```js
import dbConfig from "./db.config.sqlite.js";

import Sequelize from "sequelize";
const sequelize = new Sequelize(dbConfig);

const db = {};

const init = async () => {
  sequelize
    .sync(true)
    .then(() => {
      console.log("Base de datos sincronizada");
    })
    .catch((err) => {
      console.log("Fallo al sincronizar la base de datos: " + err.message);
    });
}

db.init = init;
export default db;
```

Necesitamos invocar el método `init` cuando iniciamos el servidor, de modo que vamos a incluir estas líneas en el archivo `app.js`

```js
...
import db from './src/database/db.init.js'
...
app.listen(PORT, () => {
  db.init(true, true).then(()=>
    console.log(`💿 Servidor corriendo en el puerto ${PORT}`)
  )
});
...
```

Si, en este punto, iniciamos el servidor, se creará la base de datos si no existe. Aunque ésta estará vacía.

4.4. Vamos a crear los modelos de las dos entidades con las que vamos a trabajar `albums` y `generos` en los archivos `src/models/album.model.js` y `src/models/genero.model.js`

`src/models/album.model.js`
```js
const albumModel = (sequelize, Sequelize) => {
  return sequelize.define(
    "album",
    {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      artista: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      genero: {
        type: Sequelize.DataTypes.STRING,
      },
      soporte: {
        type: Sequelize.DataTypes.STRING,
      },
      precio: {
        type: Sequelize.DataTypes.DECIMAL,
      },
      fecha_adquisicion: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
    },
    {
      tableName: "albums",
      timestamps: false,
    },
  );
};

export default albumModel;
```

`src/models/genero.model.js`
```js
const generoModel = (sequelize, Sequelize) => {
  return sequelize.define(
    "genero",
    {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "generos",
      timestamps: false,
    },
  );
};

export default generoModel;
```

E incluimos los imports y llamadas correspondientes en el archivo `db.init.js`

```js
import albumModel from "../models/album.model.js";
import generoModel from "../models/genero.model.js";

db.albums = albumModel(sequelize, Sequelize);
db.generos = generoModel(sequelize, Sequelize);
...
```

Si, nuevamente iniciamos el servidor, se crearán las tablas correspondientes a los dos modelos definidos.

4.5. Finalmente vamos a crear algunos datos iniciales valiéndonos de dos archivos JSON que contienen datos de álbumes y géneros respectivamente.
Como estamos usando ES Modules no tenemos la misma facilidad para incorporar archivos JSON que con CommonJS Modules en el momento de escribir esta guía. Una de las alternativas es usar el módulo `fs`, leer el archivo JSON y luego parsearlo a JSON con `JSON.parse()`. Vamos a escribir un módulo con un método `seed()` que nos permita inicializar las tablas con datos. Esta operación va a sobrescribir los datos y cambios existentes, por lo tanto no la querremos invocar cada vez que iniciemos el servidor. De modo que tendremos un parámetro booleano para indicar si queremos o no inicializar los datos.

El archivo `src/database/db.seed.js` queda así:

```js
import fs from "fs";

const albumsDataFile = fs.readFileSync("./src/database/seed/albums.json");
const generosDataFile = fs.readFileSync("./src/database/seed/generos.json");
const albumsData = JSON.parse(albumsDataFile);
const generosData = JSON.parse(generosDataFile);

const seed = (db) => {
  const albums = db.albums;
  const generos = db.generos;

  albums.truncate();
  albums.bulkCreate(albumsData);

  generos.truncate();
  generos.bulkCreate(generosData);
};

export default seed
```

Vamos a agregar dos parámetros al método `init()` que ya escribimos. Uno de ellos será para forzar (o no) la sincronización de la estructura de la base de datos, el otro para invocar condicionalmente al método `seed()` que inicializa los datos

El archivo `src/database/db.init.js` queda ahora

```js
import dbConfig from "./db.config.sqlite.js";

import Sequelize from "sequelize";
const sequelize = new Sequelize(dbConfig);

const db = {};

import albumModel from "../models/album.model.js";
import generoModel from "../models/genero.model.js";
import dbSeed from "./db.seed.js";

db.albums = albumModel(sequelize, Sequelize);
db.generos = generoModel(sequelize, Sequelize);

const init = async (force, seed) => {
  sequelize
    .sync({ force: force })
    .then(() => {
      console.log("Base de datos sincronizada");
      if (seed) {
        dbSeed(db);
      }
    })
    .catch((err) => {
      console.log("Fallo al sincronizar la base de datos: " + err.message);
    });
};

db.init = init;
export default db
```

4.6. Para obtener datos más realistas vamos a incluir una actualización de el campo `fecha_adquisicion` con fechas aleatorias dentro de cierto rango. Hacemos esto luego de haber insertado los datos en la tabla. Tenemos que recorrer los datos uno a uno con el fin de generar una fecha aleatoria para cada una de las ocurrencias.

El archivo `src/database/db.seed.js` queda así:

```js
import fs from "fs";
import Sequelize from "sequelize";

const albumsDataFile = fs.readFileSync("./src/database/seed/albums.json");
const generosDataFile = fs.readFileSync("./src/database/seed/generos.json");
const albumsData = JSON.parse(albumsDataFile);
const generosData = JSON.parse(generosDataFile);

const seed = (db) => {
  const albums = db.albums;
  const generos = db.generos;

  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }

  albums.truncate();
  albums.bulkCreate(albumsData);

  albums.findAll().then((allAlbums) =>
    allAlbums.forEach((album) => {
      albums.update(
        {
          fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date()),
        },
        { where: { id: album.id } },
      );
    }),
  );

  generos.truncate();
  generos.bulkCreate(generosData);
};

export default seed;
```

#### Etapa 5: Servicios y controladores
---

5.1. Ya implementada la capa de acceso a datos vamos a implementar las capas de servicios y controladores. Lo vamos a hacer en ese órden y vamos a comenzar con *géneros*, cuya interfaz es más sencilla.
El archivo `src/services/genero.service.js` queda:

```js
import db from "../database/db.init.js";

const getAllGeneros = async () => {
  try {
    const allGeneros = await db.generos.findAll();
    return allGeneros;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllGeneros,
};
```

El controller de género implementado en `src/controllers/genero.controller.js`

```js
import generoService from "../services/genero.service.js";

const getAllGeneros = async (req, res) => {
  const { mode } = req.query;
  try {
    const allGeneros = await generoService.getAllGeneros();
    res.send({ status: "OK", data: allGeneros });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export default {
  getAllGeneros,
};
```

Finalmente modificamos el router para asociar la ruta a este controller. El archivo `src/v1/routes/genero.routes.js` queda:

```js
import { Router } from "express";
import generoController from "../../controllers/genero.controller.js";

const router = Router();

...

// Recuperar todos los géneros
router.get("/", generoController.getAllGeneros);

...

export default router;
```

Ya podemos probar el endpoint usando REST Client u otra herramienta.

5.2. Ahora que ya implementamos todas las capas para *géneros* vamos a implementar todas las operaciones para *álbumes*

El archivo `src/services/album.service.js` queda:

```js
import db from "../database/db.init.js";

const getAllAlbums = async () => {
  try {
    const allAlbums = await db.albums.findAll();
    return allAlbums;
  } catch (error) {
    throw error;
  }
};

const getAlbum = async (id) => {
  try {
    const album = await db.albums.findByPk(id);
    return album;
  } catch (error) {
    throw error;
  }
};

const createAlbum = async (nuevoAlbum) => {
  try {
    const album = await db.albums.create(nuevoAlbum);
    return album;
  } catch (error) {
    throw error;
  }
};

const updateAlbum = async (id, cambios) => {
  try {
    const albumsActualizados = await db.albums.update(cambios, {
      where: { id: id },
    });
    if (albumsActualizados[0] !== 1) {
      throw new Error(`No se pudo actualizar el álbum con id: ${id}`);
    } else {
      const albumActualizado = await db.albums.findByPk(id);
      return albumActualizado;
    }
  } catch (error) {
    throw error;
  }
};

const deleteAlbum = async (id) => {
  try {
    const albumsEliminados = await db.albums.destroy({
      where: { id: id },
    });
    if (albumsEliminados !== 1) {
      throw new Error(`No se pudo eliminar el álbum con id: ${id}`);
    }
  } catch (error) {
    throw error;
  }
};

export default {
  getAllAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
```

El controller `src/controllers/album.controller.js`

```js
import albumService from "../services/album.service.js";

const getAllAlbums = async (req, res) => {
  const { genero } = req.query;
  try {
    const allAllbums = await albumService.getAllAlbums();
    res.send({ status: "OK", data: allAllbums });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAlbum = async (req, res) => {
  const {
    params: { id },
  } = req;

  if (!id) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "El parámetro ':id' no puede estar vacío" },
    });
    return;
  }

  try {
    const album = await albumService.getAlbum(id);
    res.send({ status: "OK", data: album });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createAlbum = async (req, res) => {
  const { body } = req;

  if (
    !body.artista ||
    !body.titulo ||
    !body.genero ||
    !body.soporte ||
    !body.precio
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "Uno de los datos siguientes está vacío en el body de la petición: 'artista', 'titulo', 'genero', 'soporte', 'precio'",
      },
    });
  }

  const nuevoAlbum = {
    artista: body.artista,
    titulo: body.titulo,
    genero: body.genero,
    soporte: body.soporte,
    precio: body.precio,
    fecha_adquisicion: body.fecha_adquisicion || new Date(),
  };

  try {
    const album = await albumService.createAlbum(nuevoAlbum);
    res.status(201).send({ status: "OK", data: album });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateAlbum = async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  if (!id) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "El parámetro ':id' no puede estar vacío" },
    });
  }

  try {
    const albumActualizado = await albumService.updateAlbum(id, body);
    res.send({ status: "OK", data: albumActualizado });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteAlbum = async (req, res) => {
  const {
    params: { id },
  } = req;

  if (!id) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "El parámetro ':id' no puede estar vacío" },
    });
  }

  try {
    const albumsEliminados = await albumService.deleteAlbum(id);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export default {
  getAllAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
```

El archivo de router `src/v1/routes/album.routes.js` queda:

```js
import { Router } from "express";
import albumController from "../../controllers/album.controller.js";

const router = Router();

// Recuperar todos los álbumes
router.get("/", albumController.getAllAlbums);

// Recuperar un álbum por id
router.get("/:id", albumController.getAlbum);

// Crear un nuevo álbum
router.post("/", albumController.createAlbum);

// Actualizar un álbum
router.put("/:id", albumController.updateAlbum);

// Eliminar un álbum
router.delete("/:id", albumController.deleteAlbum);

export default router;
```
