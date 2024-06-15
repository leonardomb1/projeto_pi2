import { Router } from 'express'

//CONTROLLER
import SetorController from '../controller/setores.controller.js'
import AnaliseController from '../controller/analises.controller.js'
import FuncionarioController from '../controller/funcionarios.controller.js'
import CartoesController from '../controller/cartoes.controller.js'
import UsuarioController from '../controller/usuarios.controller.js'
import CartoesPilaresController from '../controller/cartoes_pilares.controller.js'
import ErrorController from '../controller/error.controller.js'
import PilarController from '../controller/pilares.controller.js'

//VALIDATIONS
import {getOneSetorValidation, createSetorValidation, updateSetorValidation} from '../validations/setor.validation.js'
import {getOneFuncValidation, createFuncValidation, updateFuncValidation} from '../validations/funcionarios.validation.js'
import {getOneUserValidation, createUserValidation, updateUserValidation, loginUserValidation} from '../validations/usuarios.validation.js'
import {getOneCartaoValidation, createCartaoValidation, updateCartaoValidation, getCartaoByUserValidation, getByPilarValidation} from "../validations/cartoes.validation.js"
import {getOneAnaliseValidation, createAnaliseValidation, updateAnaliseValidation, getAnaliseByCartaoValidation} from "../validations/analises.validation.js"

import { createCartaoPilarValidation } from "../validations/cartoes_pilares.validation.js"
import { getOnePilarValidation} from "../validations/pilares.validation.js"


const router = Router()
// router.get('*', ErrorController.index)

// Rotas de Setor
router.get('/setor', SetorController.index)
router.get('/setor/:idSetor', getOneSetorValidation, SetorController.getOneById)
router.post('/setor', createSetorValidation, SetorController.create)
router.put('/setor/:idSetor', updateSetorValidation, SetorController.update) 
router.delete('/setor/:idSetor', getOneSetorValidation, SetorController.delete)

// Rotas de Analises
router.get('/analises', AnaliseController.index)
router.get('/analises/:idAnalise', getOneAnaliseValidation, AnaliseController.getOneById)
router.post('/analises',createAnaliseValidation, AnaliseController.create)
router.put('/analises/:idAnalise', updateAnaliseValidation, AnaliseController.update)
router.delete('/analises/:idAnalise', getOneAnaliseValidation, AnaliseController.delete)

// Rotas de Funcionarios
router.get('/funcionarios', FuncionarioController.index)
router.get('/funcionarios/:idFuncionario', getOneFuncValidation, FuncionarioController.getOneById)
router.post('/funcionarios', createFuncValidation, FuncionarioController.create)
router.put('/funcionarios/:idFuncionario', updateFuncValidation, FuncionarioController.update)
router.delete('/funcionarios/:idFuncionario', getOneFuncValidation, FuncionarioController.delete)

// Rotas de Cartoes
router.get('/cartoes', CartoesController.index)
router.get('/cartoes/:idCartao', getOneCartaoValidation, CartoesController.getOneById)
router.post('/cartoes', createCartaoValidation, CartoesController.create)
router.put('/cartoes/:idCartao', updateCartaoValidation, CartoesController.update)
router.get('/cartoes/user/:idUsuario', getCartaoByUserValidation, CartoesController.getManyByUserId)
router.delete('/cartoes/:idCartao', getOneCartaoValidation, CartoesController.delete)
router.get('/cartoes/funcSetor/:idCartao', getOneCartaoValidation, CartoesController.mostraSetorFuncionarioPeloCartao)
router.get('/cartoes/status/:idCartao', getOneCartaoValidation, CartoesController.mostraStatusCartao)
router.post('/cartoes/pilares', getByPilarValidation, CartoesController.mostraCartoesPorNomePilar)

// Rotas de Usuarios
router.get('/usuarios', UsuarioController.index)
router.get('/usuarios/:idUsuario', getOneUserValidation, UsuarioController.getOneById)
router.post('/usuarios', createUserValidation, UsuarioController.create)
router.post('/usuarios/login', loginUserValidation, UsuarioController.loginUser )
router.put('/usuarios/:idUsuario', updateUserValidation, UsuarioController.update)
router.delete('/usuarios/:idUsuario', getOneUserValidation, UsuarioController.delete)

// Rotas dos Pilares
router.get('/pilares', PilarController.index)
router.get('/pilares/:idPilar', getOnePilarValidation, PilarController.getOneById)
router.post('/pilares/buscar', PilarController.getByList)

// Rota do Cartão-Pilar
router.post('/cartaoPilar', createCartaoPilarValidation, CartoesPilaresController.create )


export default router
