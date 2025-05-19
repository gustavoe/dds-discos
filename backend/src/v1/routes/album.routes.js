import { Router } from 'express'
import albumController from '../../controllers/album.controller.js'

const router = Router()

// Recuperar todos los álbumes
router.get('/', albumController.getAllAlbums)

// Recuperar un álbum por id
router.get('/:id', albumController.getAlbum)

// Crear un nuevo álbum
router.post('/', albumController.createAlbum)

// Actualizar un álbum
router.put('/:id', albumController.updateAlbum)

// Eliminar un álbum
router.delete('/:id', albumController.deleteAlbum)

export default router
