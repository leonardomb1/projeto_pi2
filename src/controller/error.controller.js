import returnClass from "../types/returnClass.js";

export default class ErrorController {
  static async index(req, res) {
    let retorno = new returnClass("NOT FOUND", 404, false, true, undefined);
    res.status(404).json(retorno)
  }
}