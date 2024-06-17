import { body } from "express-validator"

export const createAnalisePilarValidation = [
    body('id_analise').isNumeric().withMessage("Id da análise é obrigatório!"),
    body('id_pilar').isNumeric().withMessage("Id do pilar é obrigatório!"),
]