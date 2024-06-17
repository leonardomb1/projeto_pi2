import {body, param} from 'express-validator'

export const createSetorValidation = [
    body('nome_setor').isString().withMessage('Nome do setor é obrigatório')
    
]

export const getOneSetorValidation = [
    param("idSetor").isNumeric().withMessage("ID do setor é obrigatório")
]

export const updateSetorValidation = [
    param("idSetor").isNumeric().withMessage("ID do setor é obrigatório"),
    body("nome_setor").isString().withMessage("Nome do setor é obrigatório")
]