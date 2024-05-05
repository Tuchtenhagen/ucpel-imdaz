import { connection } from '../db/config-db.js'
import { createCadastroGeral, updateCadastroGeral, deleteCadastroGeral } from './cadastro-geral-repository.js'

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
    SELECT 
    cg.*,
    ca.* 
    FROM cadastroaluno ca
    JOIN cadastrogeral cg ON cg.id = ca.idcadastrogeral
  WHERE ca.id = ?
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
      `, [aluno.anoEscolar, aluno.alfabetizado, aluno.irmaoInstituicao, aluno.escola, aluno.nomeResponsavel, aluno.parentescoResponsavel, aluno.autorizaCadastroNotaFiscalGaucha, aluno.tipoResidencia, aluno.numeroPecas, aluno.possuiBanheiro, aluno.possuiAgua, aluno.possuiLuz, cadastroGeral.insertId])
      await connection.commit()
      return rows
  } catch (err) {
    await connection.rollback()
    return err
  }
}

const updateAluno = async (id, aluno, geral) => {
  try {
    connection.beginTransaction()

    await updateCadastroGeral(geral.id, geral)

    const [rows, fields] = await connection.query(`
    UPDATE cadastroaluno 
    SET
        anoEscolar = ?, alfabetizado = ?, irmaoInstituicao = ?, escola = ?, nomeResponsavel = ?, parentescoResponsavel = ?, autorizaCadastroNotaFiscalGaucha = ?, tipoResidencia = ?, numeroPecas = ?, possuiBanheiro = ?, possuiAgua = ?, possuiLuz = ?
    WHERE id = ?;
      `, [aluno.anoEscolar, aluno.alfabetizado, aluno.irmaoInstituicao, aluno.escola, aluno.nomeResponsavel, aluno.parentescoResponsavel, aluno.autorizaCadastroNotaFiscalGaucha, aluno.tipoResidencia, aluno.numeroPecas, aluno.possuiBanheiro, aluno.possuiAgua, aluno.possuiLuz, id])
      await connection.commit()
      return rows
  } catch (err) {
    throw err
  }
}

const deleteAluno = async (id) => {
  try {
    connection.beginTransaction()

    const [rows, fields] = await connection.query(`
    DELETE FROM cadastroaluno WHERE id = ?;
      `, [id])

    await deleteCadastroGeral(aluno[0]?.idCadastroGeral)

      connection.commit()
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