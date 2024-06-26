import Pilar from '../models/pilares.model.js'
import returnClass from '../types/returnClass.js'
import { validationResult } from "express-validator"

export default class PilarController {
    static async index(req, res) {
        const pilares = await Pilar.findMany()
        let retorno = {}
        if (pilares) {
          retorno = new returnClass("OK", 200, true, false, pilares)
          return res.status(200).json(retorno)
        }
        else {
          retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
          return res.status(500).json(retorno)
        }
      }

    static async getOneById(req, res) {
      const erros = validationResult(req)
      if(!erros.isEmpty()){
        return res.status(400).json({erros: erros.array()})
      }
  
      const { idPilar } = req.params
      let retorno = {}
      const pilar = await Pilar.findUnique({
        where:   {
          id_pilar: Number(idPilar)
        }
      })
  
      if (pilar) {
        retorno = new returnClass("OK", 200, true, false, pilar)
        res.status(200).json(retorno)
      }
      else {
        retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
        res.status(500).json(retorno)
      }
    }

    static async getByList(req,res) {
      const erros = validationResult(req, res) 
      let retorno = {};
      if(!erros.isEmpty()) {
        return res.status(400).json({erros: erros.array()})
      }

      const { id_pilar:idPilar } = req.body

      if (!Array.isArray(idPilar) || idPilar.some(isNaN)) {
        retorno = new returnClass("Formato inválido!", 400, false, true, undefined)
        return res.status(400).json(retorno);
      }

      try {
        const pilares = await Pilar.findMany({
          where: {
            id_pilar: { in: idPilar.map(Number) }
          }, select : { nome_pilar: true }
        })

        retorno = new returnClass("Ok", 200, true, false, pilares)
        return res.status(200).json(retorno)
      } catch (error) {
        console.log(error)
        retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
        return res.status(500).json(retorno)
      }
    }
}