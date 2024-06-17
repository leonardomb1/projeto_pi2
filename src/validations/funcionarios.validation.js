import {body, param} from "express-validator"

export const getOneFuncValidation = [
    param("idFuncionario").isNumeric().withMessage("ID do setor é obrigatório!")
]

export const createFuncValidation = [
    body("nome_funcionario").isString().withMessage("Nome do funcionário é obrigatório!"),
    body("id_setor").isNumeric().withMessage("ID do setor é obrigatório")
]

export const updateFuncValidation = [
    param("idFuncionario").isNumeric().withMessage("ID do funcionario é obrigatório!"),
    body("nome_funcionario").isString().withMessage("Nome do funcionario é obrigatório!"),
    body("id_setor").isNumeric().withMessage("ID do setor é obrigatório!")
]
