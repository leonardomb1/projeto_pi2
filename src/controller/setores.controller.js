import Setor from "../models/setores.model.js";
import returnClass from "../types/returnClass.js";
import {validationResult} from "express-validator"


export default class SetorController {
//MOSTRA SETORES
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

//MOSTRA SETOR
  static async getOneById(req, res) {
    const erros = validationResult(req)
    if(!erros.isEmpty()){
      return res.status(400).json({erros: erros.array()})
    }

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
      retorno = new returnClass("Não encontrado", 404, false, true, undefined)
      res.status(404).json(retorno)
    }
  }

  //CRIA SETOR
  static async create(req, res) {
    const erros = validationResult(req)
    let retorno = {}
    if (!erros.isEmpty()){
      return res.status(400).json({erros: erros.array()})
    }
    try{
      const { nome_setor } = req.body;
      const createdSetor = await Setor.create({
        data: {
          nome_setor        
        }
      })
      res.json(createdSetor)
    } catch(error){
      retorno = new returnClass("Este setor já está cadastrado!", 409, false, true, undefined)
      return res.status(409).json(retorno)
    }
    }

  //EDITA SETOR
  static async update(req, res) {
    const erros = validationResult(req)
    if(!erros.isEmpty()){
      return res.status(400).json({erros: erros.array()})
    }
    const { idSetor } = req.params
    let retorno = {}
    const setor = await Setor.findUnique({
      where: {
        id_setor: Number(idSetor)
      }
    })

    if (!setor){
      return res.status(404).json({message:"Setor inexistente!"})
    }

    try{
      const updateSetor = await Setor.update({
        where:{
          id_setor: Number(idSetor)
        },
        data: req.body
      })
      return res.status(200).json({message:"Setor atualizado com sucesso!", updateSetor})
    } catch {
      let retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      return res.status(500).json(retorno)
    }
  }

//DELETA SETOR
  static async delete(req, res) {
    const erros = validationResult(req)
    if(!erros.isEmpty()){
      return res.status(400).json({erros: erros.array()})
    }

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
      await Setor.delete({
        where: {
          id_setor: Number(req.params.idSetor)
        }
      })
      res.json({message: "Setor deletado com sucesso!"})
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro interno do Servidor", 500, false, true, undefined)
      return res.status(500).json(retorno)
    }
  }
}
