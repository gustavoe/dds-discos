import albumService from '../services/album.service.js'

const getAllAlbums = async (req, res) => {
  const { genero } = req.query
  try {
    const allAllbums = await albumService.getAllAlbums(genero)
    res.send({ status: 'OK', data: allAllbums })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getAlbum = async (req, res) => {
  const {
    params: { id }
  } = req

  if (!id) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "El parámetro ':id' no puede estar vacío" }
    })
    return
  }

  try {
    const album = await albumService.getAlbum(id)
    res.send({ status: 'OK', data: album })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const createAlbum = async (req, res) => {
  const { body } = req

  if (
    !body.artista ||
    !body.titulo ||
    !body.genero ||
    !body.soporte ||
    !body.precio
  ) {
    res.status(400).send({
      status: 'FAILED',
      data: {
        error:
          "Uno de los datos siguientes está vacío en el body de la petición: 'artista', 'titulo', 'genero', 'soporte', 'precio'"
      }
    })
  }

  const nuevoAlbum = {
    artista: body.artista,
    titulo: body.titulo,
    genero: body.genero,
    soporte: body.soporte,
    precio: body.precio,
    fecha_adquisicion: body.fecha_adquisicion || new Date()
  }

  try {
    const album = await albumService.createAlbum(nuevoAlbum)
    res.status(201).send({ status: 'OK', data: album })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const updateAlbum = async (req, res) => {
  const {
    body,
    params: { id }
  } = req

  if (!id) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "El parámetro ':id' no puede estar vacío" }
    })
  }

  try {
    const albumActualizado = await albumService.updateAlbum(id, body)
    res.send({ status: 'OK', data: albumActualizado })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const deleteAlbum = async (req, res) => {
  const {
    params: { id }
  } = req

  if (!id) {
    res.status(400).send({
      status: 'FAILED',
      data: { error: "El parámetro ':id' no puede estar vacío" }
    })
  }

  try {
    await albumService.deleteAlbum(id)
    res.status(204).send({ status: 'OK' })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

export default {
  getAllAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum
}
