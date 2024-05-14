import { Router } from 'express'
import SetorController from '../controller/setores.controller.js'
import ErrorController from '../controller/error.controller.js'

const router = Router()
// router.get('*', ErrorController.index)

// Rotas de Setor
router.get('/setor', SetorController.index)
router.get('/setor/:idSetor', SetorController.getOneById)
router.post('/setor', SetorController.create)
router.put('/setor/:idSetor', SetorController.update)
router.delete('/setor/:idSetor', SetorController.delete)

export default router
