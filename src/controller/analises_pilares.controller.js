import AnalisePilares from "../models/analises_pilares.model.js"
import returnClass from "../types/returnClass.js";
import { validationResult } from "express-validator"

export default class AnalisePilaresController {
    static async create(req, res) {
        const erros = validationResult(req)
        if(!erros.isEmpty()){
          return res.status(400).json({erros: erros.array()})
        }
      
        const { id_analise, id_pilar } = req.body
        let retorno = {}
        let qtdeIgnorada = 0

        for (const pilar of id_pilar) {
            const procuraSeAprovado = await AnalisePilares.findFirst({
                where: {
                    id_pilar: pilar
                }
            })
            
            if (procuraSeAprovado) {
                qtdeIgnorada++
                continue
            }

            await AnalisePilares.create({
                data: {
                    id_analise: id_analise,
                    id_pilar: pilar
                }
            })
        }

        if (qtdeIgnorada < id_pilar.length) { 
            retorno = new returnClass("OK", 200, true, false, {qtde_pilares: (id_pilar.length - qtdeIgnorada)})
            res.status(200).json(retorno)
        } else if (qtdeIgnorada === id_pilar.length) {
            retorno = new returnClass("Aprovação do Pilar já realizada!", 409, false, true, undefined)
            res.status(409).json(retorno)
        }
        else {
            retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
            res.status(500).json(retorno)
        }
    }
}
  