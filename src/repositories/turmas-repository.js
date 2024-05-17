import { connection } from '../db/config-db.js'

// Função para buscar todos os registros de turmas do banco de dados
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

// Função para buscar apenas uma turma do banco de dados, pelo ID
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

// Função para criar um registro de turma no banco de dados
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

// Função para atualizar o registro de uma turma no banco de dados
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

// Função para deletar o registro de uma turma
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