import { Router } from 'express'
import authController from '../../controllers/auth.controller.js'

const router = Router()

// Registrar un usuario
router.get('/register', authController.register)

// Autenticar un usuario
router.get('/login', authController.login)

// Cerrar la sesión
router.post('/logout', authController.logout)

export default router
