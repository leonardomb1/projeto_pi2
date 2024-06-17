import Analise from "../models/analises.model.js";
import returnClass from "../types/returnClass.js";

export default class AnaliseController {
  static async index(req, res) {
    const analises = await Analise.findMany()
    let retorno = {}
    if (analises) {
      retorno = new returnClass("OK", 200, true, false, analises)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      res.status(500).json(retorno)
    }
  }

  static async create(req, res) {
    const { valor_nota, id_cartao, id_usuario, status_analise, observacao } = req.body;
    let retorno = {};

    try {
      const createdAnalises = await Analise.create({
        data: {
            valor_nota,
            id_cartao,
            id_usuario,
            status_analise,
            observacao
        }
      });

      retorno = new returnClass("OK", 201, true, false, createdAnalises.id_analise);
      return res.status(201).json(retorno);
    } catch (error) {
      console.log(error);
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined);
      return res.status(500).json(retorno);
    }
  }


  static async getOneById(req, res) {
    const { idAnalise } = req.params
    let retorno = {}
    const analises = await Analise.findUnique({
      where: {
        id_analise: Number(idAnalise)
      }
    })

    if (analises) {
      retorno = new returnClass("OK", 200, true, false, analises)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Não encontrado", 404, false, true, undefined)
      res.status(404).json(retorno)
    }
  }

  static async update(req, res) {
    const { idAnalise } = req.params
    const { valor_nota, id_cartao, id_usuario, status, obs  } = req.body
    let retorno = {}
    try {
      const analises = await Analise.findUnique({
        where: {
          id_analise: Number(idAnalise)
        }
      })

      if (!analises) {
        retorno = new returnClass("Não encontrado", 404, false, true, undefined)
        return res.status(404).json(retorno)
      }

      const updatedAnalises = {
        ...analises,
        valor_nota,
        id_cartao,
        id_usuario,
        status,
        obs
      }

      retorno = new returnClass("Analise alterada com sucesso!", 200, true, false, updatedAnalises)
      return res.status(200).json(retorno)
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      return res.status(500).json(retorno)
    }
  }

  static async delete(req, res) {
    const { idAnalise } = req.params
    let retorno = {}

    try {
      const analises = await Analise.findUnique({
        where: {
            id_analise: Number(idAnalise)
        }
      })

      if (!analises) {
        retorno = new returnClass("Não encontrado", 404, false, true, undefined)
        return res.status(404).json(retorno)
      }

      Analise.delete(analises)
      retorno = new returnClass("OK", 204, true, false, undefined)
      return res.status(204).json(retorno)
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro interno do Servidor", 500, false, true, undefined)
      return res.status(500).json(retorno)
    }
  }
}
