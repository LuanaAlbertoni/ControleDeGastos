const conexao = require('../infra/connection')
const moment = require('moment')

class Movimento{
    adiciona(movimento, res){
        const dataCriacao = new Date()
        const data = moment(movimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        // Validar data
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        // Validar descrição do movimento
        const descricaoEhValida = movimento.descricao.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser igual ou maior que a data atual'
            },
            {
                nome: 'descricao',
                valido: descricaoEhValida,
                mensagem: 'A descrição deve conter 5 ou mais caracteres'
            }
        ]

        const erros = validacoes.filter(item => !item.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
            movimento.data = data
            const movimentoDatado = {...movimento, dataCriacao}

            const sql = 'INSERT INTO movimento SET ?'
            conexao.query(sql, movimentoDatado, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(201).json(resultados)
            }
        })
        }
    }

    lista(res){
        const sql = 'SELECT * FROM Movimento'

        conexao.query(sql,(erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res){
        const sql = 'SELECT * FROM Movimento WHERE id = ?'
        conexao.query(sql, id, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            }else{
                const movimento = resultados[0]
                res.status(200).json(movimento)

                // Opção 2
                // res.status(200).json(resultados[0])
            }
        })
    }

    altera(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE Movimento SET ? WHERE id = ?'
        conexao.query(sql,[valores, id],(erro, resultados) =>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }
}

module.exports = new Movimento