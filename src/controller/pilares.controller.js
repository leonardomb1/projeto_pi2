import Pilar from '../models/pilares.model.js'
import returnClass from '../types/returnClass.js'
import { validationResult } from 'express-validator'

export default class PilarController {
    static async index(req, res) {
        const pilares = await Cartoes.findMany()
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
}