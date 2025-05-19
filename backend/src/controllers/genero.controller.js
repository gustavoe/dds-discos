import generoService from '../services/genero.service.js'

const getAllGeneros = async (req, res) => {
  try {
    const allGeneros = await generoService.getAllGeneros()
    res.send({ status: 'OK', data: allGeneros })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

export default {
  getAllGeneros
}
