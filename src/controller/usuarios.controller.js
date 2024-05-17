import Usuario from "../models/usuarios.model.js";
import returnClass from "../types/returnClass.js";

export default class UsuarioController {
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

  static async create(req, res) {
    const { nome_usuario, senha_usuario, id_funcionario } = req.body;
    let retorno = {};

    if (!req.body || !req.body.nome_usuario) {
      const retorno = new returnClass("Necessário informar campo obrigatório!", 400, false, true, undefined);
      return res.status(400).json(retorno);
    }

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


  static async getOneById(req, res) {
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

  static async update(req, res) {
    const { idUsuario } = req.params
    const { nome_usuario, senha_usuario, id_funcionario } = req.body
    let retorno = {}
    try {
      const usuarios = await Usuario.findUnique({
        where: {
          id_usuario: Number(idUsuario)
        }
      })

      if (!usuarios) {
        retorno = new returnClass("Usuario inexistente!", 404, false, true, undefined)
        return res.status(404).json(retorno)
      }

      const updatedSetor = {
        ...setor,
        nome_usuario,
        senha_usuario,
        id_funcionario
      }

      retorno = new returnClass("Usuario alterado com sucesso!", 200, true, false, updatedSetor)
      return res.status(200).json(retorno)
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      return res.status(500).json(retorno)
    }
  }

  static async delete(req, res) {
    const { idUsuario } = req.params
    let retorno = {}

    try {
      const usuarios = await Usuario.findUnique({
        where: {
          id_usuario: Number(idUsuario)
        }
      })

      if (!usuarios) {
        retorno = new returnClass("Usuario inexistente!", 404, false, true, undefined)
        return res.status(404).json(retorno)
      }

      Usuario.delete(usuarios)
      retorno = new returnClass("Usuario deletado com sucesso", 204, true, false, undefined)
      return res.status(204).json(retorno)
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro interno do Servidor", 500, false, true, undefined)
      return res.status(404).json(retorno)
    }
  }
}
