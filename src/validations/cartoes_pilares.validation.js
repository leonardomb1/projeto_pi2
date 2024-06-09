import { body } from "express-validator"


export const createCartaoPilarValidation = [
    body('id_pilar').isNumeric().withMessage('ID do Cartão é obrigatório!'),
    body('id_cartao').isNumeric().withMessage('ID do Pilar é obrigatório!'),
]
