import Generic from "../models/generic.model.js";
import Cartoes from "../models/cartoes.model.js";
import CartoesPilares from "../models/cartoes_pilares.model.js";
import returnClass from "../types/returnClass.js";
import { validationResult } from "express-validator";

export default class CartoesController {
  //MOSTRA CARTÕES
  static async index(req, res) {
    const cartoes = await Cartoes.findMany({
      include: {
        analise: true,
        cartoes_pilares: true
      },
    });
    let retorno = {}
    if (cartoes) {
      retorno = new returnClass("OK", 200, true, false, cartoes)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      res.status(500).json(retorno)
    }
  }

  //CRIA CARTÃO
  static async create(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() })
    }

    const { id_usuario, desc_problema, desc_ideia, nome_projeto, url_imagem } = req.body;
    let retorno = {};

    try {
      const createdCartoes = await Cartoes.create({
        data: {
          id_usuario,
          desc_problema,
          desc_ideia,
          nome_projeto,
          url_imagem
        }
      });

      retorno = new returnClass("Sucesso!", 201, true, false, createdCartoes.id_cartao);
      return res.status(201).json(retorno);
    } catch (error) {
      console.log(error);
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined);
      return res.status(500).json(retorno);
    }
  }

  static async mostraStatusCartao(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() })
    }

    const { idCartao } = req.params
    let retorno = {}

    const statusCartao = await Generic.$queryRaw`
      ;WITH MINIMO AS (
          SELECT
              id_cartao,
              COUNT(1) as qt_min
          FROM "Cartoes_Pilares"
          GROUP BY id_cartao
      ),

      APROVADO AS (
          SELECT
              "AN".id_cartao,
              COUNT(1) AS qt_aprovado
          FROM "Analises_Pilares" AS "ANP"
          INNER JOIN "Analises" AS "AN"
              ON  "AN".id_analise = "ANP".id_analise AND
                  "AN".status_analise = 1
          GROUP BY "AN".id_cartao
      ),

      REPROVADO AS (
          SELECT
              "AN".id_cartao,
              COUNT(1) AS qt_reprovado
          FROM "Analises_Pilares" AS "ANP"
          INNER JOIN "Analises" AS "AN"
              ON  "AN".id_analise = "ANP".id_analise AND 
                  "AN".status_analise = 0
          GROUP BY "AN".id_cartao
      )

      SELECT
          id_cartao,
          CASE 
              WHEN qt_min <= qt_aprovado + qt_reprovado THEN
                  CASE
                      WHEN qt_aprovado > qt_reprovado THEN 'Aprovado'
                      ELSE 'Reprovado'
                  END
              ELSE 'Pendente'
          END AS status_cartao
      FROM (
          SELECT
              "MIN".id_cartao,
              qt_min,
              CASE WHEN qt_aprovado IS NULL THEN 0 ELSE qt_aprovado END AS qt_aprovado,
              CASE WHEN qt_reprovado IS NULL THEN 0 ELSE qt_reprovado END AS qt_reprovado
          FROM MINIMO AS "MIN"
          LEFT OUTER JOIN APROVADO AS "APR"
              ON  "APR".id_cartao = "MIN".id_cartao
          LEFT OUTER JOIN REPROVADO AS "REP"
              ON  "REP".id_cartao = "MIN".id_cartao
      ) res
      WHERE id_cartao = ${Number(idCartao)}`

    if (statusCartao) {
      retorno = new returnClass("OK", 200, true, false, statusCartao)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Não encontrado", 404, false, true, undefined)
      res.status(404).json(retorno)
    }
  }

  static async mostraAprovadocoesPeloCartao(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() })
    }

    const { idCartao } = req.params
    let retorno = {}

    const aprovacoes = await Generic.$queryRaw`
      SELECT
          "AN".id_cartao,
          "PIL".nome_pilar,
          "AN".valor_nota,
          "AN".status_analise,
          "AN".observacao,
          "AN".data_analise
      FROM "Analises" AS "AN"
      INNER JOIN "Analises_Pilares" AS "ANP" 
          ON  "ANP".id_analise = "AN".id_analise
      INNER JOIN "Pilares" AS "PIL"
          ON  "PIL".id_pilar = "ANP".id_pilar
      WHERE "AN".id_cartao = ${Number(idCartao)}`

    if (aprovacoes.length > 0) {
      retorno = new returnClass("OK", 200, true, false, aprovacoes)
      res.status(200).json(retorno)
    } else {
      retorno = new returnClass("Não encontrado", 404, false, true, {data: 0})
      res.status(404).json(retorno)
    }

  }

  static async mostraSetorFuncionarioPeloCartao(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() })
    }

    const { idCartao } = req.params
    let retorno = {}

    const funcionarioSetor = await Generic.$queryRaw`
      SELECT
        "FU".nome_funcionario,
        "SE".nome_setor
      FROM "Cartoes" AS "CA"
      INNER JOIN "Usuarios" AS "US"
          ON  "US".id_usuario = "CA".id_usuario
      INNER JOIN "Funcionarios" AS "FU"
          ON  "FU".id_funcionario = "US".id_funcionario
      INNER JOIN "Setores" AS "SE"
          ON  "SE".id_setor = "FU".id_setor
      WHERE "CA".id_cartao = ${Number(idCartao)};`

    if (funcionarioSetor.length > 0) {
      retorno = new returnClass("OK", 200, true, false, funcionarioSetor)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Não encontrado", 404, false, true, undefined)
      res.status(404).json(retorno)
    }
  }

  //MOSTRA CARTÃO
  static async getOneById(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() })
    }

    const { idCartao } = req.params
    let retorno = {}
    const cartoes = await Cartoes.findUnique({
      where: {
        id_cartao: Number(idCartao)
      },
      include: {
        analise: true,
        cartoes_pilares: true
      }
    })

    if (cartoes) {
      retorno = new returnClass("OK", 200, true, false, cartoes)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Não encontrado", 404, false, true, undefined)
      res.status(404).json(retorno)
    }
  }

  static async mostraCartoesPorNomePilar(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() })
    }

    const { nome_pilar: nome_pilar } = req.body
    let retorno = {}
    let uniqueCartoes = new Map()

    for (const pilar of nome_pilar) {
      const cartoes = await Generic.$queryRaw`
        ;WITH BASE AS (
            SELECT
                "CA".*,
                array_agg("PIL".nome_pilar) AS nome_pilar
            FROM "Cartoes" AS "CA"
            INNER JOIN "Cartoes_Pilares" AS "CAP" 
                ON  "CAP".id_cartao = "CA".id_cartao
            INNER JOIN "Pilares" AS "PIL"
                ON  "PIL".id_pilar = "CAP".id_pilar
            GROUP BY
                "CA".id_cartao,
                "CA".id_usuario,
                "CA".nome_projeto,
                "CA".desc_problema,
                "CA".desc_ideia,
                "CA".url_imagem,
                "CA".data_cartao
        )

        SELECT  
            *
        FROM BASE
        WHERE id_cartao NOT IN (
            SELECT "AN".id_cartao
            FROM "Analises" AS "AN"
            INNER JOIN "Analises_Pilares" AS "ANP"
                ON  "AN".id_analise = "ANP".id_analise
            INNER JOIN "Pilares" AS "PIL"
                ON  "PIL".id_pilar = "ANP".id_pilar AND
                    "PIL".nome_pilar = ${pilar}
        );`

      for (const cartao of cartoes) {
        uniqueCartoes.set(cartao.id_cartao, cartao)
      }
    }

    let listaCartoes = Array.from(uniqueCartoes.values())

    if (listaCartoes.length === 0) {
      retorno = new returnClass("Não encontrado", 404, false, true, undefined)
      return res.status(404).json(retorno)
    } else {
      retorno = new returnClass("Sucesso!", 200, true, false, listaCartoes)
      return res.status(200).json(retorno)
    }
  }

  //MOSTRA CARTÃO
  static async getManyByUserId(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() })
    }

    const { idUsuario } = req.params
    let retorno = {}
    const cartoes = await Cartoes.findMany({
      where: {
        id_usuario: Number(idUsuario)
      },
      include: {
        analise: true,
        cartoes_pilares: {
          include: {
            pilar: {
              select: {
                nome_pilar: true
              }
            }
          },
        }
      }
    })

    if (cartoes) {
      retorno = new returnClass("OK", 200, true, false, cartoes)
      return res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Não encontrado", 404, false, true, {data: 0 })
      return res.status(404).json(retorno)
    }
  }

  //EDITA CARTÃO
  static async update(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() })
    }

    const { idCartao } = req.params
    const { desc_problema, desc_ideia, nome_projeto } = req.body
    let retorno = {}

    const cartoes = await Cartoes.findUnique({
      where: {
        id_cartao: Number(idCartao)
      }
    })

    if (!cartoes) {
      retorno = new returnClass("Não encontrado", 404, false, true, undefined)
      return res.status(404).json(retorno)
    }

    try {
      const updatedCartoes = await Cartoes.update({
        where: {
          id_cartao: Number(idCartao)
        },
        data: {
          nome_projeto,
          desc_ideia,
          desc_problema
        }
      })
      return res.status(200).json({ message: "Funcionário atualizado com sucesso!", updatedCartoes })
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      return res.status(500).json(retorno)
    }
  }

  //DELETA CARTÃO
  static async delete(req, res) {
    const erros = validationResult(req)
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() })
    }

    const { idCartao } = req.params
    let retorno = {}

    const cartoes = await Cartoes.findUnique({
      where: {
        id_cartao: Number(idCartao)
      }
    })

    if (!cartoes) {
      retorno = new returnClass("Não encontrado", 404, false, true, undefined)
      return res.status(404).json(retorno)
    }

    try {
      await Cartoes.delete({
        where: {
          id_cartao: Number(req.params.idCartao)
        }
      })

      await CartoesPilares.delete({
        where: {
          id_cartao: Number(req.params.idCartao)
        }
      })

      return res.status(200).json({ message: "Cartão deletado com sucesso!" })
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro interno do Servidor", 500, false, true, undefined)
      return res.status(500).json(retorno)
    }
  }
}
