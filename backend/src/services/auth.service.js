import bcrypt from 'bcrypt'
import User from '../models/user.model.js'

const register = async (username, email, password) => {
  const passwordHashed = await bcrypt.hash(password, 10)
  const datosUser = {
    username,
    email,
    password: passwordHashed
  }
  const user = await User.create(datosUser)
  return user
}

const login = async (username, password) => {
  const user = await User.findOne({ where: { username } })
  if (!user) {
    throw new Error('¡Credenciales inválidas!')
  }
  const loggedIn = await bcrypt.compare(password, user.password)
  if (!loggedIn) {
    throw new Error('¡Credenciales inválidas!')
  }
  const { password: _, ...datosUser } = user.dataValues
  return datosUser
}

const logout = async () => {
}

export default {
  register,
  login,
  logout
}
