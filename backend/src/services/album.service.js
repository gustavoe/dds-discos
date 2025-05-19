import Album from '../models/album.model.js'

const getAllAlbums = async () => {
  const allAlbums = await Album.findAll()
  return allAlbums
}

const getAlbum = async (id) => {
  const album = await Album.findByPk(id)
  return album
}

const createAlbum = async (nuevoAlbum) => {
  const album = await Album.create(nuevoAlbum)
  return album
}

const updateAlbum = async (id, cambios) => {
  const albumsActualizados = await Album.update(cambios, {
    where: { id }
  })
  if (albumsActualizados[0] !== 1) {
    throw new Error(`No se pudo actualizar el álbum con id: ${id}`)
  } else {
    const albumActualizado = await Album.findByPk(id)
    return albumActualizado
  }
}

const deleteAlbum = async (id) => {
  const albumsEliminados = await Album.destroy({
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
