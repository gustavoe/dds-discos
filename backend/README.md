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

```javascript filename=server.js
sasa
sasa
sa
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

2.4. 