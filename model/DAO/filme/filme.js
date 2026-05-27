/**************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de Dados MYSQL na tabela
 *              Filme
 * Data: 15/ 04/ 2026
 * Autor: Pedro Sousa
 * Verão: 1.0
 **************************************************************************************************************************************************************************/
const knex = require('knex')
const knexConfig = require('../../database_config_knex/knexFile')

const knexConex = knex(knexConfig.development)


const incertFilme = async function(filme){
    try {
        let sql = `
        insert into tbl_filme (
            nome,
            data_lancamento,
            duracao, 
            sinopse, 
            avaliacao, 
            valor, 
            capa,
            id_classificacao
            )
        values (
            '${filme.nome}',
            '${filme.data_lancamento}',
            '${filme.duracao}',
            '${filme.sinopse}',
            if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
            '${filme.valor}',
            '${filme.capa}',
            ${filme.id_classificacao}
            );`

        let result = await knexConex.raw(sql)

        if(result)
            return result[0].insertId
        else
            return false

    } catch (error) {
        return false
    }
}


const updateFilme = async function(filme){
    try {
        let sql = `
            update tbl_filme set
            nome =              '${filme.nome}',
            data_lancamento =   '${filme.data_lancamento}', 
            duracao =           '${filme.duracao}',
            sinopse =           '${filme.sinopse}',
            avaliacao =         if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
            valor =             '${filme.valor}',
            capa =              '${filme.capa}',
            id_classificacao =   ${filme.id_classificacao}
            where id =           ${filme.id};
        `
        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}


const selectAllFilme = async function(){
    try {
        let sql = `select * from tbl_filme order by id desc`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}


const selectByIdFilme = async function(id){
    try {
        let sql = `select * from tbl_filme where id=${id}`

        let result = await knexConex.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        return false
    }
}


const deleteFilme = async function(id){
    try {
        let sql = `
            DELETE FROM tbl_filme 
            WHERE id = ${id};
        `
        let result = await knexConex.raw(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    incertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme,
}