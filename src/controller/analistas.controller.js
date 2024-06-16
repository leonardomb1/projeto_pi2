import Analista from "../models/analistas.model.js";
import returnClass from "../types/returnClass.js";

export default class AnalistaController {
  static async index(req, res) {
    const analistas = await Analista.findMany()
    let retorno = {}
    if (analistas) {
      retorno = new returnClass("OK", 200, true, false, analistas)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      res.status(500).json(retorno)
    }
  }

  static async create(req, res) {
    const { idAnalista, idSetor } = req.body;
    let retorno = {};

    if (!req.body || !req.body.idAnalista) {
      const retorno = new returnClass("Necessário informar campo obrigatório!", 400, false, true, undefined);
      return res.status(400).json(retorno);
    }

    try {
      const createdAnalista = await Analista.create({
        data: {
            idAnalista,
            idSetor
        }
      });

      retorno = new returnClass("OK", 201, true, false, createdAnalista);
      return res.status(201).json(retorno);
    } catch (error) {
      console.log(error);
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined);
      return res.status(500).json(retorno);
    }
  }


  static async getOneById(req, res) {
    const { idAnalista } = req.params
    let retorno = {}
    const analista = await Setor.findUnique({
      where: {
        id_analista: Number(idAnalista)
      }
    })

    if (analista) {
      retorno = new returnClass("OK", 200, true, false, analista)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Não encontrado", 404, false, true, undefined)
      res.status(404).json(retorno)
    }
  }

  static async update(req, res) {
    const { idAnalista } = req.params
    const { idSetor } = req.body
    let retorno = {}
    try {
      const analista = await Analista.findUnique({
        where: {
          id_analista: Number(idAnalista)
        }
      })

      if (!analista) {
        retorno = new returnClass("Analista inexistente!", 404, false, true, undefined)
        return res.status(404).json(retorno)
      }

      const updatedAnalista = {
        ...analista,
        idSetor
      }

      retorno = new returnClass("Analista alterado com sucesso!", 200, true, false, updatedAnalista)
      return res.status(200).json(retorno)
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      return res.status(500).json(retorno)
    }
  }

  static async delete(req, res) {
    const { idAnalista } = req.params
    let retorno = {}

    try {
      const analista = await Analista.findUnique({
        where: {
          id_analista: Number(idAnalista)
        }
      })

      if (!analista) {
        retorno = new returnClass("Analista inexistente!", 404, false, true, undefined)
        return res.status(404).json(retorno)
      }

      Analista.delete(analista)
      retorno = new returnClass("Analista deletado com sucesso", 204, true, false, undefined)
      return res.status(204).json(retorno)
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro interno do Servidor", 500, false, true, undefined)
      return res.status(404).json(retorno)
    }
  }
}