import AnalisePilares from "../models/analises_pilares.model.js"
import Generic from '../models/generic.model.js'
import returnClass from "../types/returnClass.js";
import { validationResult } from "express-validator"

export default class AnalisePilaresController {
    static async create(req, res) {
        const erros = validationResult(req)
        if(!erros.isEmpty()){
          return res.status(400).json({erros: erros.array()})
        }
      
        const { id_analise, id_pilar } = req.body
        console.log(req.body)
        let retorno = {}
        let qtdeIgnorada = 0
        console.log("aqui1")
        for (const pilar of id_pilar) {
            const procuraSeAprovado = await Generic.$queryRaw`
                ;WITH base AS (
                    SELECT
                        *
                    FROM "Cartoes" AS "CA"
                    WHERE EXISTS (
                        SELECT 1
                        FROM "Analises" AS "AN"
                        WHERE 
                            "AN".id_cartao = "CA".id_cartao AND
                            "AN".id_analise = ${id_analise}
                    )
                )

                SELECT
                    *
                FROM base AS "ba"
                LEFT OUTER JOIN "Analises" AS "AN"
                    ON  "AN".id_cartao = "ba".id_cartao
                INNER JOIN "Analises_Pilares" AS "ANP" 
                    ON "ANP".id_analise = "AN".id_analise 
                WHERE "ANP".id_pilar = ${pilar};`

            if (procuraSeAprovado > 0) {
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

            retorno = new returnClass("OK", 201, true, false, {qtde_pilares: (id_pilar.length - qtdeIgnorada)})
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
  