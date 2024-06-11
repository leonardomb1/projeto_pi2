import { param } from "express-validator"


export const getOnePilarValidation = [
    param('idPilar').isNumeric().withMessage("ID do Pilar é obrigatório!")
]