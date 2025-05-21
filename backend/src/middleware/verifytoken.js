import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  const header = req.header('Authorization') || ''
  const token = header.split(' ')[1]
  if (!token) {
    res.status(401).send({ message: 'No autorizado' })
  }
  try {
    const secret = process.env.JWT_SECRET
    const payload = jwt.verify(token, secret)
    // req.username = payload.username
    next()
  } catch (error) {
    res.status(401).send({ message: 'No autorizado' })
  }
}

export default verifyToken
