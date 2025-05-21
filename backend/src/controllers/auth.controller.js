import authService from '../services/auth.service.js'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const user = await authService.register(username, email, password)
    res.status(201).send({ status: 'OK', data: user })
  } catch (error) {
    res.status(400)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await authService.login(username, password)
    const secret = process.env.JWT_SECRET
    const token = jwt.sign(user, secret, { expiresIn: '10h' })
    res.status(200).send({ token })
  } catch (error) {
    res.status(401)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

export default {
  register,
  login
}
