import Funcionario from "../models/funcionarios.model.js";
import returnClass from "../types/returnClass.js";
import { validationResult } from "express-validator";

export default class FuncionarioController {
//MOSTRA FUNCIONARIOS
  static async index(req, res) {
    const funcionarios = await Funcionario.findMany()
    let retorno = {}

    if (funcionarios) {
      retorno = new returnClass("OK", 200, true, false, funcionarios)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, funcionarios)
      res.status(500).json(retorno)
    }
  }

 //MOSTRA FUNCIONARIO
 static async getOneById(req, res) {
  const erros = validationResult(req)
  if(!erros.isEmpty()){
    return res.status(400).json({erros: erros.array()})
  }

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

//CRIA FUNCIONARIO
  static async create(req, res) {
    const erros = validationResult(req)
    let retorno = {};
    if(!erros.isEmpty()){
      return res.status(400).json({erros: erros.array()})
    }
    const { nome_funcionario, id_setor } = req.body;

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

//EDITA FUNCIONARIO
  static async update(req, res) {
    const erros = validationResult(req)
    if(!erros.isEmpty()){
      return res.status(400).json({erros: erros.array()})
    }

    const { idFuncionario } = req.params
    let retorno = {}

    const funcionarios = await Funcionario.findUnique({
        where: {
          id_funcionario: Number(idFuncionario)
        }
      })

      if (!funcionarios) {
        retorno = new returnClass("Funcionario inexistente!", 404, false, true, undefined)
        return res.status(404).json(retorno)      
      }

      try {
        const updateFuncionario = await Funcionario.update({
          where: {
            id_funcionario: Number(idFuncionario)
          },
          data: req.body
        })
      return res.status(200).json({message:"Funcionário atualizado com sucesso!", updateFuncionario})
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      return res.status(500).json(retorno)
    }
  }

//DELETA FUNCIONARIO
  static async delete(req, res) {
    const erros = validationResult(req)
    if(!erros.isEmpty()){
      return res.status(400).json({erros: erros.array()})
    }

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
      await Funcionario.delete({
        where: {
          id_funcionario: Number(req.params.idFuncionario)
        }
      })
      res.json({message: "Funcionario deletado com sucesso!"})

    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro interno do Servidor", 500, false, true, undefined)
      return res.status(404).json(retorno)
    }
  }
}
