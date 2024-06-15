import Generic from "../models/generic.model.js";
import Cartoes from "../models/cartoes.model.js";
import CartoesPilares from "../models/cartoes_pilares.model.js";
import returnClass from "../types/returnClass.js";
import {validationResult} from "express-validator";

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
    if(!erros.isEmpty()){
      return res.status(400).json({erros: erros.array()})
    }

    const { id_usuario , desc_problema, desc_ideia, nome_projeto, url_imagem } = req.body;
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
    if(!erros.isEmpty()){
      return res.status(400).json({erros: erros.array()})
    }

    const { idCartao } = req.params
    let retorno = {}

    const statusCartao = await Generic.$queryRaw`
      SELECT 
        id_cartao,
        CASE 
            WHEN status_analise IS NULL THEN 'Pendente'
            WHEN status_analise = 1 THEN 'Aprovado'
            WHEN status_analise = 0 THEN 'Reprovado'
        END AS status_cartao
      FROM (
        SELECT
            "CA".id_cartao,
            "AN".status_analise
        FROM "Cartoes" AS "CA"
        LEFT OUTER JOIN "Analises" AS "AN"
            ON  "AN".id_cartao = "CA".id_cartao
        ) res
      WHERE id_cartao = ${Number(idCartao)};`

    if (statusCartao) {
      retorno = new returnClass("OK", 200, true, false, statusCartao)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      res.status(500).json(retorno)
    }
  }

  static async mostraSetorFuncionarioPeloCartao(req, res) {
    const erros = validationResult(req)
    if(!erros.isEmpty()){
      return res.status(400).json({erros: erros.array()})
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
      WHERE "CA".id_cartao = ${Number(idCartao)}
    ;`

    if (funcionarioSetor) {
      retorno = new returnClass("OK", 200, true, false, funcionarioSetor)
      res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      res.status(500).json(retorno)
    }
  }

//MOSTRA CARTÃO
  static async getOneById(req, res) {
    const erros = validationResult(req)
    if(!erros.isEmpty()){
      return res.status(400).json({erros: erros.array()})
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
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      res.status(500).json(retorno)
    }
  }

  static async mostraCartoesPorNomePilar(req, res) {
    const erros = validationResult(req)
    if(!erros.isEmpty()){
      return res.status(400).json({erros: erros.array()})
    }

    const { nome_pilar:nome_pilar } = req.body

    let retorno = {}
    let listaCartoes = []
    for(const pilar of nome_pilar) {
      const cartoes = await Cartoes.findMany({
        where: {
          cartoes_pilares: {
            some: {
              pilar: {
                nome_pilar: pilar
              }
            }
          }
        }
      })

      listaCartoes.push(...cartoes)  
    }

    if(listaCartoes.length == 0) {
      retorno = new returnClass("Não encontrado!", 404, false, true, undefined)
      return res.status(404).json(retorno)
    } else {
      retorno = new returnClass("Sucesso!", 200, true, false, listaCartoes)
      return res.status(200).json(retorno)
    }
  }

  
  //MOSTRA CARTÃO
  static async getManyByUserId(req, res) {
    const erros = validationResult(req)
    if(!erros.isEmpty()){
      return res.status(400).json({erros: erros.array()})
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
            pilar: true
          }
        }
      }
    })

    if (cartoes) {
      retorno = new returnClass("OK", 200, true, false, cartoes)
      return res.status(200).json(retorno)
    }
    else {
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      return res.status(500).json(retorno)
    }
  }

//EDITA CARTÃO
  static async update(req, res) {
    const erros = validationResult(req)
    if(!erros.isEmpty()){
      return res.status(400).json({erros: erros.array()})
    }

    const { idCartao } = req.params
    const { desc_problema, desc_ideia, nome_projeto  } = req.body
    let retorno = {}

      const cartoes = await Cartoes.findUnique({
        where: {
          id_cartao: Number(idCartao)
        }
      })

      if (!cartoes) {
        retorno = new returnClass("Cartão inexistente!", 404, false, true, undefined)
        return res.status(404).json(retorno)
      }

      try{
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
      return res.status(200).json({message:"Funcionário atualizado com sucesso!", updatedCartoes})
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro Interno Servidor", 500, false, true, undefined)
      return res.status(500).json(retorno)
    }
  }

  //DELETA CARTÃO
  static async delete(req, res) {
    const erros = validationResult(req)
    if(!erros.isEmpty()){
      return res.status(400).json({erros: erros.array()})
    }

    const { idCartao } = req.params
    let retorno = {}

    const cartoes = await Cartoes.findUnique({
        where: {
            id_cartao: Number(idCartao)
        }
      })

      if (!cartoes) {
        retorno = new returnClass("Cartão inexistente!", 404, false, true, undefined)
        return res.status(404).json(retorno)
      }

      try{ 
        await Cartoes.delete({
        where:{
          id_cartao: Number(req.params.idCartao)
        }
      })

        await CartoesPilares.delete({
          where:{
            id_cartao: Number(req.params.idCartao)
          }
        })
        
        return res.status(200).json({message:"Cartão deletado com sucesso!"})
    } catch (error) {
      console.log(error)
      retorno = new returnClass("Erro interno do Servidor", 500, false, true, undefined)
      return res.status(404).json(retorno)
    }
  }
}
