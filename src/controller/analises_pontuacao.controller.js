import Pontuacao from "../models/cartoes_pontuacao.models.js";
import returnClass from "../types/returnClass.js";
import { validationResult } from "express-validator";

function calculatePoints() {
  // Get references to form elements
  var form = document.getElementById('quizForm');
  var q1 = form.querySelector('input[name="q1"]:checked');
  var q2 = form.querySelector('input[name="q2"]:checked');
  var q3 = form.querySelector('select[name="q3"]');

  // Initialize total points
  var totalPoints = 0;

  // Calculate points based on selected answers
  if (q1) {
    totalPoints += parseInt(q1.value);
  }
  if (q2) {
    totalPoints += parseInt(q2.value);
  }
  if (q3) {
    totalPoints += parseInt(q3.value);
  }

  // Display total points
  var totalPointsDisplay = document.getElementById('totalPoints');
  totalPointsDisplay.textContent = totalPoints;
}
export default class AnalisePontuacaoController {
static async create(req, res) {
  const erros = validationResult(req)
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() })
  }

  const { id_analisePontuacao, pontuacao, id_cartao } = req.body;
  let retorno = {};

  try {
    const createdPontuacao = await Cartoes.create({
      data: {
        id_analisePontuacao,
        pontuacao,
        id_cartao,
        devolutiva_pontuacao,
      }
    });

    retorno = new returnClass("Pontuacao adicionada!", 201, true, false, createdPontuacao.id_analisePontuacao);
    return res.status(201).json(retorno);
  } catch (error) {
    console.log(error);
    retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined);
    return res.status(500).json(retorno);
  }
}

static async index(req, res) {
  const pontuacao = await Pontuacao.findMany({
    include: {
      id_analisePontuacao: true,
        pontuacao: true,
        id_cartao: true,
        devolutiva_pontuacao: true,
    },
  });
  let retorno = {}
  if (pontuacao) {
    retorno = new returnClass("OK", 200, true, false, pontuacao)
    res.status(200).json(retorno)
  }
  else {
    retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
    res.status(500).json(retorno)
  }
}

static async update(req, res) {
  const { idAnalise } = req.params
  const { pontuacao, id_cartao, id_analisePontuacao, devolutiva_pontuacao} = req.body
  let retorno = {}
  try {
    const pontuacao = await Pontuacao.findUnique({
      where: {
        id_analisePontuacao: Number(idAnalise)
      }
    })

    if (!pontuacao) {
      retorno = new returnClass("Não encontrado", 404, false, true, undefined)
      return res.status(404).json(retorno)
    }

    const updatedPontuacao = {
      ...pontuacao,
      id_analisePontuacao,
      pontuacao,
      id_cartao,
      devolutiva_pontuacao,
    }

    retorno = new returnClass("Pontuacao alterada com sucesso!", 200, true, false, updatedPontuacao)
    return res.status(200).json(retorno)
  } catch (error) {
    console.log(error)
    retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
    return res.status(500).json(retorno)
  }
}


}