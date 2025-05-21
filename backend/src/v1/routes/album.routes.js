import { Router } from 'express'
import albumController from '../../controllers/album.controller.js'
import verifyToken from '../../middleware/verifytoken.js'

const router = Router()

// Recuperar todos los álbumes
router.get('/', verifyToken, albumController.getAllAlbums)

// Recuperar un álbum por id
router.get('/:id', albumController.getAlbum)

// Crear un nuevo álbum
router.post('/', albumController.createAlbum)

// Actualizar un álbum
router.put('/:id', albumController.updateAlbum)

// Eliminar un álbum
router.delete('/:id', albumController.deleteAlbum)

export default router
