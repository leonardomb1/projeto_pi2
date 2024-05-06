import { getContatos } from "../models/contato.model.js";

export default class ContatoController {
  static index(req, res) {
    res.json(getContatos());
  }
}
