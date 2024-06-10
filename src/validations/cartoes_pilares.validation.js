import { body } from "express-validator"


export const createCartaoPilarValidation = [
    body('id_cartao').isNumeric().withMessage('ID do Cartão é obrigatório!')
]
