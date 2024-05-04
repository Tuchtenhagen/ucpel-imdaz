import { connection } from '../db/config-db.js'

const getAllAlunos = async () => {
  try {
    const [rows, fields] = await connection.query(`
    SELECT * FROM cadastroaluno
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

const createAluno = async (aluno) => {
  try {
    const [rows, fields] = await connection.query(`
    INSERT INTO cadastroaluno (
        anoEscolar, alfabetizado, irmaoInstituicao, escola, NomeResponsavel, parentescoResponsabel, autorizaCadastroNotaFiscalGaucha, tipoResidencia, numeroPecas, possuiBanheiro, possuiAgua, possuiLuz, idCadastroGeral
    )
    VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (select id from cadastrogeral where cpf = ?)
    )
      `, [aluno.anoEscolar, aluno.alfabetizado, aluno.irmaoInstituicao, aluno.escola, aluno.NomeResponsavel, aluno.parentescoResponsabel, aluno.autorizaCadastroNotaFiscalGaucha, aluno.tipoResidencia, aluno.numeroPecas, aluno.possuiBanheiro, aluno.possuiAgua, aluno.possuiLuz, aluno.cpf])
    return rows
  } catch (err) {
    return err
  }
}

const updateAluno = async (id, aluno) => {
  try {
    const [rows, fields] = await connection.query(`
    UPDATE cadastroaluno 
    SET
        anoEscolar = ?, alfabetizado = ?, irmaoInstituicao = ?, escola = ?, NomeResponsavel = ?, parentescoResponsabel = ?, autorizaCadastroNotaFiscalGaucha = ?, tipoResidencia = ?, numeroPecas = ?, possuiBanheiro = ?, possuiAgua = ?, possuiLuz = ?, idCadastroGeral = (select id from cadastrogeral where cpf = ?)
    WHERE id = ?
      `, [aluno.anoEscolar, aluno.alfabetizado, aluno.irmaoInstituicao, aluno.escola, aluno.NomeResponsavel, aluno.parentescoResponsabel, aluno.autorizaCadastroNotaFiscalGaucha, aluno.tipoResidencia, aluno.numeroPecas, aluno.possuiBanheiro, aluno.possuiAgua, aluno.possuiLuz, aluno.cpf, id])
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