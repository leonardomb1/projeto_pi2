import Setor from "../models/setores.model.js";
import returnClass from "../types/returnClass.js";

export default class SetorController {
  static async index(req, res) {
    const setores = await Setor.findMany()
    let retorno = {}
    if(setores) {
      retorno = new returnClass("OK", 200, true, false, setores)
      res.status(200).json(retorno)
    } 
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, setores)
      res.status(500).json(retorno)
    }
  }
}
