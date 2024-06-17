import {body, param} from "express-validator"

export const getOnePontuacaoValidation = [
    param('id_analisePontuacao').isNumeric().withMessage("ID da pontuacao é obrigatório!")
]

export const createPontuacaoValidation = [
    body('valor_nota').isNumeric().withMessage("O valor da nota é obrigatório!"),
    body('status_analise').isNumeric().withMessage("Status da analise é obrigatório!"),
    body('devolutiva_pontuacao').isString().withMessage("Devolutiva é obrigatória!"),
    body('id_cartao').isNumeric().withMessage("ID do cartao é obrigatório!"),
]
export const updatePontuacaoValidation = [
    param('id_analisePontuacao').isNumeric().withMessage("ID da pontuacao é obrigatório!"),
    body('pontuacao').isNumeric().withMessage("A pontuacao é obrigatório!"),
    body('devolutiva_pontuacao').isNumeric().withMessage("Devoutiva é obrigatória!"),
    body('idCartao').isNumeric().withMessage("ID do cartao é obrigatório!"),
   
]
