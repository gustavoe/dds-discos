import fs from 'fs'

import db from '../database/db.init.js'
import Album from '../models/album.model.js'
import Genero from '../models/genero.model.js'

const albumsDataFile = fs.readFileSync('./src/database/seed/albums.json', 'utf-8')
const generosDataFile = fs.readFileSync('./src/database/seed/generos.json', 'utf-8')
const albumsData = JSON.parse(albumsDataFile)
const generosData = JSON.parse(generosDataFile)

const seed = async () => {
  await db.init(true)

  function randomDate (start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
  }

  await Album.truncate()
  await Album.bulkCreate(albumsData)

  await Album.findAll().then((allAlbums) =>
    allAlbums.forEach((album) => {
      Album.update(
        {
          fecha_adquisicion: randomDate(new Date(2024, 0, 1), new Date())
        },
        { where: { id: album.id } }
      )
    })
  )

  await Genero.truncate()
  await Genero.bulkCreate(generosData)
}

seed()
