import { Router } from 'express'

//CONTROLLER
import SetorController from '../controller/setores.controller.js'
import AnaliseController from '../controller/analises.controller.js'
import AnalistaController from '../controller/analistas.controller.js'
import FuncionarioController from '../controller/funcionarios.controller.js'
import CartoesController from '../controller/cartoes.controller.js'
import UsuarioController from '../controller/usuarios.controller.js'
import ErrorController from '../controller/error.controller.js'

//VALIDATIONS
import {getOneSetorValidation, createSetorValidation, updateSetorValidation} from '../validations/setor.validation.js'
import {getOneFuncValidation, createFuncValidation, updateFuncValidation} from '../validations/funcionarios.validation.js'

const router = Router()
// router.get('*', ErrorController.index)

// Rotas de Setor
router.get('/setor', SetorController.index) //OK
router.get('/setor/:idSetor', getOneSetorValidation, SetorController.getOneById) //OK
router.post('/setor', createSetorValidation, SetorController.create) //Ok
router.put('/setor/:idSetor', updateSetorValidation, SetorController.update) 
router.delete('/setor/:idSetor', getOneSetorValidation, SetorController.delete)

// Rotas de Analises
router.get('/analises', AnaliseController.index)
router.get('/analises/:idAnalise', AnaliseController.getOneById)
router.post('/analises', AnaliseController.create)
router.put('/analises/:idAnalise', AnaliseController.update)
router.delete('/analises/:idAnalise', AnaliseController.delete)

// Rotas de Analistas
router.get('/analistas', AnalistaController.index)
router.get('/analistas/:idAnalista', AnalistaController.getOneById)
router.post('/analistas', AnalistaController.create)
router.put('/analistas/:idAnalista', AnalistaController.update)
router.delete('/analistas/:idAnalista', AnalistaController.delete)

// Rotas de Funcionarios
router.get('/funcionarios', FuncionarioController.index)
router.get('/funcionarios/:idFuncionario', getOneFuncValidation, FuncionarioController.getOneById)
router.post('/funcionarios', createFuncValidation, FuncionarioController.create)
router.put('/funcionarios/:idFuncionario', updateFuncValidation, FuncionarioController.update)
router.delete('/funcionarios/:idFuncionario', getOneFuncValidation, FuncionarioController.delete)

// Rotas de Cartoes
router.get('/cartoes', CartoesController.index)
router.get('/cartoes/:idCartoes', CartoesController.getOneById)
router.post('/cartoes', CartoesController.create)
router.put('/cartoes/:idCartoes', CartoesController.update)
router.delete('/cartoes/:idCartoes', CartoesController.delete)

// Rotas de Usuarios
router.get('/usuarios', UsuarioController.index)
router.get('/usuarios/:idUsuario', UsuarioController.getOneById)
router.post('/usuarios', UsuarioController.create)
router.put('/usuarios/:idUsuario', UsuarioController.update)
router.delete('/usuarios/:idUsuario', UsuarioController.delete)

export default router
