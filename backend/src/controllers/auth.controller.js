import authService from '../services/auth.service.js'

const register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    authService.register(username, email, password)
  } catch (error) {
    res.status(400)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const login = async (req, res) => {}

const logout = async (req, res) => {}

export default {
  register,
  login,
  logout
}
