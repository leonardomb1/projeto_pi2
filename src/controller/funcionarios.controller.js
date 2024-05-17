import Funcionario from "../models/funcionarios.model.js";
import returnClass from "../types/returnClass.js";

export default class FuncionarioController {
  static async index(req, res) {
    const funcionarios = await Funcionario.findMany()
    let retorno = {}
    if (analises) {
      retorno = new returnClass("OK", 200, true, false, funcionarios)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      res.status(500).json(retorno)
    }
  }

  static async create(req, res) {
    const { nome_funcionario, id_setor } = req.body;
    let retorno = {};

    if (!req.body || !req.body.valor_nota) {
      const retorno = new returnClass("Necessário informar campo obrigatório!", 400, false, true, undefined);
      return res.status(400).json(retorno);
    }

    try {
      const createdFuncionarios = await Funcionario.create({
        data: {
            nome_funcionario,
            id_setor
        }
      });

      retorno = new returnClass("Sucesso!", 201, true, false, createdFuncionarios);
      return res.status(201).json(retorno);
    } catch (error) {
      console.log(error);
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined);
      return res.status(500).json(retorno);
    }
  }


  static async getOneById(req, res) {
    const { idFuncionario } = req.params
    let retorno = {}
    const funcionarios = await Funcionario.findUnique({
      where: {
        id_funcionario: Number(idFuncionario)
      }
    })

    if (funcionarios) {
      retorno = new returnClass("OK", 200, true, false, funcionarios)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      res.status(500).json(retorno)
    }
  }

  static async update(req, res) {
    const { idFuncionario } = req.params
    const { nome_funcionario, id_setor } = req.body
    let retorno = {}
    try {
      const funcionarios = await Funcionario.findUnique({
        where: {
          id_funcionario: Number(idFuncionario)
        }
      })

      if (!funcionarios) {
        retorno = new returnClass("Funcionario inexistente!", 404, false, true, undefined)
        return res.status(404).json(retorno)
      }

      const updatedFuncionarios = {
        ...funcionarios,
        nome_funcionario,
        id_setor
      }

      retorno = new returnClass("Funcionario alterado com sucesso!", 200, true, false, updatedFuncionarios)
      return res.status(200).json(retorno)
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      return res.status(500).json(retorno)
    }
  }

  static async delete(req, res) {
    const { idFuncionario } = req.params
    let retorno = {}

    try {
      const funcionarios = await Funcionario.findUnique({
        where: {
            id_funcionario: Number(idFuncionario)
        }
      })

      if (!funcionarios) {
        retorno = new returnClass("Funcionario inexistente!", 404, false, true, undefined)
        return res.status(404).json(retorno)
      }

      Funcionario.delete(funcionarios)
      retorno = new returnClass("Funcionario deletado com sucesso", 204, true, false, undefined)
      return res.status(204).json(retorno)
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro interno do Servidor", 500, false, true, undefined)
      return res.status(404).json(retorno)
    }
  }
}
