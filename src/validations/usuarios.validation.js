import {body, param} from "express-validator"

export const getOneUserValidation = [
    param("idUsuario").isNumeric().withMessage("ID do usuário é obrigatório!")
]

export const createUserValidation = [
    body("nome_usuario").isString().withMessage("Nome de usuário é obrigatório!"),
    body("senha_usuario").isString().withMessage("Senha é obrigatório!"),
    body("id_funcionario").isNumeric().withMessage("ID do funcionário é obrigatório!")
]

export const loginUserValidation = [
    body("nome_usuario").isString().withMessage("Nome de usuário é obrigatório!"),
    body("senha_usuario").isString().withMessage("Senha é obrigatório!")
]

export const updateUserValidation = [
    param("idUsuario").isNumeric().withMessage("ID do usuário é obrigatório!"),
    body("nome_usuario").isString().withMessage("Nome do usuário é obrigatóriO!"),
    body("senha_usuario").isString().withMessage("Senha é obrigatória"),
    body("id_funcionario").isNumeric().withMessage("ID do funcionário é obrigatório!")
]