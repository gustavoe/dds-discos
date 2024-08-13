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
