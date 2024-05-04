import { connection } from '../db/config-db.js'
import { createCadastroGeral } from './cadastro-geral-repository.js'

const getAllAlunos = async () => {
  try {
    const [rows, fields] = await connection.query(`
    SELECT 
    cg.*,
    ca.* 
    FROM cadastroaluno ca
    JOIN cadastrogeral cg ON cg.id = ca.idcadastrogeral 
    `)
      return rows
  } catch (err) {
    reply.status(500).send(err);
  }
}


const getOneAluno = async (id) => {
  try {
    const [rows, fields] = await connection.query(`
    SELECT * FROM cadastroaluno WHERE id = ?;
      `, [id])
    return rows
  } catch (err) {
    return err
  }
}

const createAluno = async (aluno,geral) => {
  try {
    connection.beginTransaction()
    
    const cadastroGeral = await createCadastroGeral(geral)
    const [rows, fields] = await connection.query(`
    INSERT INTO cadastroaluno (
        anoEscolar, alfabetizado, irmaoInstituicao, escola, nomeResponsavel, parentescoResponsavel, autorizaCadastroNotaFiscalGaucha, tipoResidencia, numeroPecas, possuiBanheiro, possuiAgua, possuiLuz, idCadastroGeral
    )
    VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
      `, [aluno.anoEscolar, aluno.alfabetizado, aluno.irmaoInstituicao, aluno.escola, aluno.nomeResponsavel, aluno.parentescoResponsabel, aluno.autorizaCadastroNotaFiscalGaucha, aluno.tipoResidencia, aluno.numeroPecas, aluno.possuiBanheiro, aluno.possuiAgua, aluno.possuiLuz, cadastroGeral.insertId])
      await connection.rollback()
      // await connection.commit()
      return rows
  } catch (err) {
    await connection.rollback()
    return err
  }
}

const updateAluno = async (id, aluno) => {
  try {
    const [rows, fields] = await connection.query(`
    UPDATE cadastroaluno 
    SET
        anoEscolar = ?, alfabetizado = ?, irmaoInstituicao = ?, escola = ?, nomeResponsavel = ?, parentescoResponsabel = ?, autorizaCadastroNotaFiscalGaucha = ?, tipoResidencia = ?, numeroPecas = ?, possuiBanheiro = ?, possuiAgua = ?, possuiLuz = ?, idCadastroGeral = (select id from cadastrogeral where cpf = ?)
    WHERE id = ?
      `, [aluno.anoEscolar, aluno.alfabetizado, aluno.irmaoInstituicao, aluno.escola, aluno.nomeResponsavel, aluno.parentescoResponsabel, aluno.autorizaCadastroNotaFiscalGaucha, aluno.tipoResidencia, aluno.numeroPecas, aluno.possuiBanheiro, aluno.possuiAgua, aluno.possuiLuz, aluno.cpf, id])
    return rows
  } catch (err) {
    return err
  }
}

const deleteAluno = async (id) => {
  try {
    const [rows, fields] = await connection.query(`
    DELETE FROM cadastroaluno WHERE id = ?;
      `, [id])
    return rows
  } catch (err) {
    return err
  }
}

export {
  getOneAluno,
  getAllAlunos,
  createAluno,
  updateAluno,
  deleteAluno
}