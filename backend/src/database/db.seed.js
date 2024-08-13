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
