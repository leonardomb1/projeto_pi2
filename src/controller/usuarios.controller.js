import Usuario from "../models/usuarios.model.js";
import returnClass from "../types/returnClass.js";
import { validationResult } from "express-validator"

export default class UsuarioController {
  //MOSTRA USUARIOS
  static async index(req, res) {
    const usuarios = await Usuario.findMany()
    let retorno = {}

    if (usuarios) {
      retorno = new returnClass("OK", 200, true, false, usuarios)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      res.status(500).json(retorno)
    }
  }

  //MOSTRA USUARIO
  static async getOneById(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() })
    }

    const { idUsuario } = req.params
    let retorno = {}
    const usuarios = await Usuario.findUnique({
      where: {
        id_usuario: Number(idUsuario)
      }
    })

    if (usuarios) {
      retorno = new returnClass("OK", 200, true, false, usuarios)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      res.status(500).json(retorno)
    }
  }

  static async loginUser(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() })
    }

    let retorno = {}

    const { nome_usuario: nomeUsuario, senha_usuario: senhaUsuario } = req.body

    const login = await Usuario.findFirst({
      where: {
        nome_usuario: nomeUsuario,
        senha_usuario: senhaUsuario
      }
    })

    if (login !== null) {
      retorno = new returnClass("OK", 200, true, false, login.id_usuario)
      return res.status(200).json(retorno)
    } else {
      retorno = new returnClass("Não Autorizado", 401, false, true, null)
      return res.status(401).json(retorno)
    }
  }

  //CRIA USUARIO
  static async create(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() })
    }

    const { nome_usuario, senha_usuario, id_funcionario } = req.body;
    let retorno = {};

    try {
      const createdUsuario = await Usuario.create({
        data: {
          nome_usuario,
          senha_usuario,
          id_funcionario
        }
      });
      retorno = new returnClass("Sucesso!", 201, true, false, createdUsuario);
      return res.status(201).json(retorno);
    } catch (error) {
      console.log(error);
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined);
      return res.status(500).json(retorno);
    }
  }

  //EDITA USUARIO
  static async update(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() })
    }

    const { idUsuario } = req.params
    const { nome_usuario, senha_usuario, id_funcionario } = req.body
    let retorno = {}

    const usuarios = await Usuario.findUnique({
      where: {
        id_usuario: Number(idUsuario)
      }
    })

    if (!usuarios) {
      retorno = new returnClass("Usuario inexistente!", 404, false, true, undefined)
      return res.status(404).json(retorno)
    }

    try {
      const updateUsuario = await Usuario.update({
        where: {
          id_usuario: Number(idUsuario)
        },
        data: req.body
      })
      return res.status(200).json({ message: "Funcionário atualizado com sucesso!", updateUsuario })
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      return res.status(500).json(retorno)
    }
  }


  //DELETA USUARIO
  static async delete(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() })
    }

    const { idUsuario } = req.params
    let retorno = {}

    const usuarios = await Usuario.findUnique({
      where: {
        id_usuario: Number(idUsuario)
      }
    })

    if (!usuarios) {
      retorno = new returnClass("Usuario inexistente!", 404, false, true, undefined)
      return res.status(404).json(retorno)
    }

    try {
      await Usuario.delete({
        where: {
          id_usuario: Number(req.params.idUsuario)
        }
      })
      res.json({ message: "Usuario deletado com sucesso!" })
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro interno do Servidor", 500, false, true, undefined)
      return res.status(404).json(retorno)
    }
  }
}
