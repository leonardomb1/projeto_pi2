import { Router } from 'express'
import SetorController from '../controller/setores.controller.js'

const router = Router()

router.get('/setor', SetorController.index)

export default router