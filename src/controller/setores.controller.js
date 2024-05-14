import Setor from "../models/setores.model.js";
import returnClass from "../types/returnClass.js";

export default class SetorController {
  static async index(req, res) {
    const setores = await Setor.findMany()
    let retorno = {}
    if (setores) {
      retorno = new returnClass("OK", 200, true, false, setores)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      res.status(500).json(retorno)
    }
  }

  static async create(req, res) {
    const { nome_setor } = req.body;
    let retorno = {};

    if (!req.body || !req.body.nome_setor) {
      const retorno = new returnClass("Campo 'nome_setor' é obrigatório", 400, false, true, undefined);
      return res.status(400).json(retorno);
    }

    try {
      const createdSetor = await Setor.create({
        data: {
          nome_setor
        }
      });

      retorno = new returnClass("Sucesso!", 201, true, false, createdSetor);
      return res.status(201).json(retorno);
    } catch (error) {
      console.log(error);
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined);
      return res.status(500).json(retorno);
    }
  }


  static async getOneById(req, res) {
    const { idSetor } = req.params
    let retorno = {}
    const setor = await Setor.findUnique({
      where: {
        id_setor: Number(idSetor)
      }
    })

    if (setor) {
      retorno = new returnClass("OK", 200, true, false, setor)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      res.status(500).json(retorno)
    }
  }

  static async update(req, res) {
    const { idSetor } = req.params
    const { nome_setor } = req.body
    let retorno = {}
    try {
      const setor = await Setor.findUnique({
        where: {
          id_setor: Number(idSetor)
        }
      })

      if (!setor) {
        retorno = new returnClass("Setor inexistente!", 404, false, true, undefined)
        return res.status(404).json(retorno)
      }

      const updatedSetor = {
        ...setor,
        nome_setor
      }

      retorno = new returnClass("Setor alterado com sucesso!", 200, true, false, updatedSetor)
      return res.status(200).json(retorno)
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      return res.status(500).json(retorno)
    }
  }

  static async delete(req, res) {
    const { idSetor } = req.params
    let retorno = {}

    try {
      const setor = await Setor.findUnique({
        where: {
          id_setor: Number(idSetor)
        }
      })

      if (!setor) {
        retorno = new returnClass("Setor inexistente!", 404, false, true, undefined)
        return res.status(404).json(retorno)
      }

      Setor.delete(setor)
      retorno = new returnClass("Setor deletado com sucesso", 204, true, false, undefined)
      return res.status(204).json(retorno)
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro interno do Servidor", 500, false, true, undefined)
      return res.status(404).json(retorno)
    }



  }
}
