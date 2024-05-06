import express from 'express'
import ContatoController from '../controllers/contato.controller'

const router = express.Router()

// Rotas de contato
router.get('/', ContatoController.index())

export default router