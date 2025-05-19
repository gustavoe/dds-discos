import db from '../database/db.init.js'

const getAllGeneros = async () => {
  const allGeneros = await db.generos.findAll()
  return allGeneros
}

export default {
  getAllGeneros
}
