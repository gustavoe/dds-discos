import db from '../database/db.init.js'

const getAllGeneros = async () => {
  try {
    const allGeneros = await db.generos.findAll()
    return allGeneros
  } catch (error) {
    throw error
  }
}

export default {
  getAllGeneros
}
