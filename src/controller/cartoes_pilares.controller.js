import CartoesPilares from '../models/cartoes_pilares.model.js'
import Pilar from '../models/pilares.model.js'
import returnClass from '../types/returnClass.js'
import {validationResult} from "express-validator";

export default class CartoesPilaresController {
  static async create(req, res) {
      const erros = validationResult(req)
      if(!erros.isEmpty()){
        return res.status(400).json({erros: erros.array()})
      }
  
      const { id_cartao, nome_pilar } = req.body;
      let retorno = {};

      try {
        const createdCartoesPilares = [];
        for (const pilar of nome_pilar) {
          const pilarPeloNome = await Pilar.findFirst({
            where: {
              nome_pilar: pilar
            }
          });
          
          const cartaoPilar = await CartoesPilares.create({
            data: {
                id_cartao : id_cartao,
                id_pilar: pilarPeloNome.id_pilar
            }
          });
          createdCartoesPilares.push(cartaoPilar);
        }
  
        retorno = new returnClass("OK", 201, true, false, createdCartoesPilares);
        return res.status(201).json(retorno);
      } catch (error) {
        console.log(error);
        retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined);
        return res.status(500).json(retorno);
      }
  }
}


