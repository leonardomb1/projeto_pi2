import {body, param} from "express-validator"

export const getOneAnaliseValidation = [
    param('idAnalise').isNumeric().withMessage("ID da analise é obrigatório!")
]

export const getAnaliseByCartaoValidation = [
    param('idCartao').isNumeric().withMessage("ID do cartao é obrigatório!")
]
export const getAnaliseByUsuarioValidation = [
    param('idUsuario').isNumeric().withMessage("ID do Usuario é obrigatório!")
]
export const createAnaliseValidation = [
    body('valor_nota').isNumeric().withMessage("O valor da nota é obrigatório!"),
    body('status_analise').isNumeric().withMessage("Status da analise é obrigatório!"),
    body('data_analise').isNumeric().withMessage("Data da analise é obrigatória!"),
    body('idCartao').isNumeric().withMessage("ID do cartao é obrigatório!"),
    body('idUsuario').isNumeric().withMessage("ID do usuario é obrigatório!"),
]
export const updateAnaliseValidation = [
    param('idAnalise').isNumeric().withMessage("ID da analise é obrigatório!"),
    body('valor_nota').isNumeric().withMessage("O valor da nota é obrigatório!"),
    body('status_analise').isNumeric().withMessage("Status da analise é obrigatório!"),
    body('data_analise').isNumeric().withMessage("Data da analise é obrigatória!"),
    body('idCartao').isNumeric().withMessage("ID do cartao é obrigatório!"),
    body('idUsuario').isNumeric().withMessage("ID do usuario é obrigatório!"),
]


