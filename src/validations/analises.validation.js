import {body, param} from "express-validator"

export const getOneAnaliseValidation = [
    param('idAnalise').isNumeric().withMessage("ID da analise é obrigatório!")
]

export const getAnaliseByCartaoValidation = [
    param('idCartao').isNumeric().withMessage("ID do cartao é obrigatório!")
]
export const getAnaliseByAnalistaValidation = [
    param('idAnalista').isNumeric().withMessage("ID do analista é obrigatório!")
]
export const createAnaliseValidation = [
    param('valor_nota').isNumeric().withMessage("O valor da nota é obrigatório!"),
    param('status_analise').isNumeric().withMessage("Status da analise é obrigatório!"),
    param('data_analise').isNumeric().withMessage("Data da analise é obrigatória!"),
    param('idCartao').isNumeric().withMessage("ID do cartao é obrigatório!"),
    param('idAnalista').isNumeric().withMessage("ID do analista é obrigatório!"),
]
export const updateAnaliseValidation = [
    param('idAnalise').isNumeric().withMessage("ID da analise é obrigatório!"),
    param('valor_nota').isNumeric().withMessage("O valor da nota é obrigatório!"),
    param('status_analise').isNumeric().withMessage("Status da analise é obrigatório!"),
    param('data_analise').isNumeric().withMessage("Data da analise é obrigatória!"),
    param('idCartao').isNumeric().withMessage("ID do cartao é obrigatório!"),
    param('idAnalista').isNumeric().withMessage("ID do analista é obrigatório!"),
]


