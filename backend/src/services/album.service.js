import db from '../database/db.init.js'

const getAllAlbums = async () => {
  const allAlbums = await db.albums.findAll()
  return allAlbums
}

const getAlbum = async (id) => {
  const album = await db.albums.findByPk(id)
  return album
}

const createAlbum = async (nuevoAlbum) => {
  const album = await db.albums.create(nuevoAlbum)
  return album
}

const updateAlbum = async (id, cambios) => {
  const albumsActualizados = await db.albums.update(cambios, {
    where: { id }
  })
  if (albumsActualizados[0] !== 1) {
    throw new Error(`No se pudo actualizar el álbum con id: ${id}`)
  } else {
    const albumActualizado = await db.albums.findByPk(id)
    return albumActualizado
  }
}

const deleteAlbum = async (id) => {
  const albumsEliminados = await db.albums.destroy({
    where: { id }
  })
  if (albumsEliminados !== 1) {
    throw new Error(`No se pudo eliminar el álbum con id: ${id}`)
  }
}

export default {
  getAllAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum
}
