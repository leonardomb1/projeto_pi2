import CartoesPilares from '../models/cartoes_pilares.model.js'
import returnClass from '../types/returnClass.js'

export default class CartoesPilaresController {
    static async create(req, res) {
        const erros = validationResult(req)
        if(!erros.isEmpty()){
          return res.status(400).json({erros: erros.array()})
        }
    
        const { id_cartao, id_pilar } = req.body;
        let retorno = {};
    
        try {
          const createdCartoesPilares = await CartoesPilares.create({
            data: {
                id_pilar,
                id_cartao
            }
          });
    
          retorno = new returnClass("Sucesso!", 201, true, false, createdCartoesPilares);
          return res.status(201).json(retorno);
        } catch (error) {
          console.log(error);
          retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined);
          return res.status(500).json(retorno);
        }
    }
}
