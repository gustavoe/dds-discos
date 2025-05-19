import Genero from '../models/genero.model.js'

const getAllGeneros = async () => {
  const allGeneros = await Genero.findAll()
  return allGeneros
}

export default {
  getAllGeneros
}
