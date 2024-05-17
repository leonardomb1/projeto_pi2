import Cartoes from "../models/cartoes.model.js";
import returnClass from "../types/returnClass.js";

export default class CartoesController {
  static async index(req, res) {
    const cartoes = await Cartoes.findMany()
    let retorno = {}
    if (cartoes) {
      retorno = new returnClass("OK", 200, true, false, cartoes)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      res.status(500).json(retorno)
    }
  }

  static async create(req, res) {
    const { id_usuario, desc_problema, desc_ideia } = req.body;
    let retorno = {};

    if (!req.body || !req.body.id_usuario) {
      const retorno = new returnClass("Necessário informar campo obrigatório!", 400, false, true, undefined);
      return res.status(400).json(retorno);
    }

    try {
      const createdCartoes = await Cartoes.create({
        data: {
            id_usuario,
            desc_problema,
            desc_ideia
        }
      });

      retorno = new returnClass("Sucesso!", 201, true, false, createdCartoes);
      return res.status(201).json(retorno);
    } catch (error) {
      console.log(error);
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined);
      return res.status(500).json(retorno);
    }
  }


  static async getOneById(req, res) {
    const { idCartoes } = req.params
    let retorno = {}
    const cartoes = await Cartoes.findUnique({
      where: {
        id_cartoes: Number(idCartoes)
      }
    })

    if (cartoes) {
      retorno = new returnClass("OK", 200, true, false, cartoes)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      res.status(500).json(retorno)
    }
  }

  static async update(req, res) {
    const { idCartoes } = req.params
    const { id_usuario, desc_problema, desc_ideia  } = req.body
    let retorno = {}
    try {
      const cartoes = await Cartoes.findUnique({
        where: {
          id_cartao: Number(idCartoes)
        }
      })

      if (!cartoes) {
        retorno = new returnClass("Cartão inexistente!", 404, false, true, undefined)
        return res.status(404).json(retorno)
      }

      const updatedCartoes = {
        ...cartoes,
        id_usuario,
        desc_problema,
        desc_ideia
      }

      retorno = new returnClass("Cartão alterado com sucesso!", 200, true, false, updatedCartoes)
      return res.status(200).json(retorno)
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      return res.status(500).json(retorno)
    }
  }

  static async delete(req, res) {
    const { idCartao } = req.params
    let retorno = {}

    try {
      const cartoes = await Cartoes.findUnique({
        where: {
            id_cartao: Number(idCartao)
        }
      })

      if (!cartoes) {
        retorno = new returnClass("Cartão inexistente!", 404, false, true, undefined)
        return res.status(404).json(retorno)
      }

      Cartoes.delete(cartoes)
      retorno = new returnClass("Cartão deletado com sucesso", 204, true, false, undefined)
      return res.status(204).json(retorno)
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro interno do Servidor", 500, false, true, undefined)
      return res.status(404).json(retorno)
    }
  }
}
