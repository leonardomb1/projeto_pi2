import {body, param} from "express-validator"

export const getOneAnalistaValidation = [
    param('idAnalista').isNumeric().withMessage("ID do analista é obrigatório!")
]

export const createAnalistaValidation = [
    body('idAnalista').isNumeric().withMessage("ID do analista é obrigatório!"),
    body('idSetor').isNumeric().withMessage("ID do setor é obrigatório!")
]

export const updateAnalistaValidation = [
    param('idAnalista').isNumeric().withMessage("ID do analista é obrigatório!"),
    body('idSetor').isNumeric().withMessage("ID do setor é obrigatório!")
]

export const deleteAnalistaValidation = [
    param('idAnalista').isNumeric().withMessage("ID do analista é obrigatório!")
]