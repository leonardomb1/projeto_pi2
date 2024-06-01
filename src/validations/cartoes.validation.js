import {body, param} from "express-validator"

export const getOneCartaoValidation = [
    param('idCartao').isNumeric().withMessage("ID do cartão é obrigatório!")
]

export const createCartaoValidation = [
    body('id_usuario').isNumeric().withMessage('ID do usuário é obrigatório!'),
    body('desc_problema').isString().withMessage('Descreva o problema a ser resolvido!'),
    body('desc_ideia').isString().withMessage('Descreva a ideia para solucianar o problema!')    
]

export const updateCartaoValidation = [
    param('idCartao').isNumeric().withMessage("ID do cartão é obrigatório!"),
    body('id_usuario').isNumeric().withMessage("ID do usuário é obrigatório!"),
    body('desc_problema').isString().withMessage("Descreva o problema a ser resolvido!"),
    body('desc_ideia').isString().withMessage("Descreva a ideia para solucionar o problema!")
]