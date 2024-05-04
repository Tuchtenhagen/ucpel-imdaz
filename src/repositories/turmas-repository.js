import { connection } from '../db/config-db.js'

const getAllTurmas = async () => {
  try {
    const [rows, fields] = await connection.query(`
    SELECT * FROM turmas
    `)
      return rows
  } catch (err) {
    reply.status(500).send(err);
  }
}


const getOneTurma = async (id) => {
  try {
    const [rows, fields] = await connection.query(`
    SELECT * FROM turmas WHERE id = ?;
      `, [id])
    return rows
  } catch (err) {
    return err
  }
}

const createTurma = async (turma) => {
  try {
    const [rows, fields] = await connection.query(`
    INSERT INTO turmas (
        ano, turno, idade, escola, alfabetizado, anoescolar, bairro, idCadastroAluno
    )
    VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?
    )
      `, [turma.ano, turma.turno, turma.idade, turma.escola, turma.alfabetizado, turma.anoescolar, turma.bairro, turma.idCadastroAluno])
    return rows
  } catch (err) {
    return err
  }
}

const updateTurma = async (id, turma) => {
  try {
    const [rows, fields] = await connection.query(`
    UPDATE turmas 
    SET
    ano = ?, turno = ?, idade = ?, escola = ?, alfabetizado = ?, anoescolar = ?, bairro = ?
    WHERE id = ?
      `, [turma.ano, turma.turno, turma.idade, turma.escola, turma.alfabetizado, turma.anoescolar, turma.bairro, id])
    return rows
  } catch (err) {
    return err
  }
}

const deleteTurma = async (id) => {
  try {
    const [rows, fields] = await connection.query(`
    DELETE FROM turmas WHERE id = ?;
      `, [id])
    return rows
  } catch (err) {
    return err
  }
}

export {
  getOneTurma,
  getAllTurmas,
  createTurma,
  updateTurma,
  deleteTurma
}