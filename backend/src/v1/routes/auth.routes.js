import { Router } from 'express'
import authController from '../../controllers/auth.controller.js'

const router = Router()

// Registrar un usuario
router.post('/register', authController.register)

// Autenticar un usuario
router.post('/login', authController.login)

export default router
