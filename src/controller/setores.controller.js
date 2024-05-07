import Setor from "../models/setores.model.js";

export default class SetorController {
  static async index(req, res) {
    const setores = await Setor.findMany()
    res.json(setores)
  }
}
