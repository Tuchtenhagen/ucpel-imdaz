import { connection } from '../db/config-db.js'

const getAllAutorizados = async () => {
  try {
    const [rows, fields] = await connection.query(`
    SELECT * FROM autorizadosaluno
    `)
      return rows
  } catch (err) {
    reply.status(500).send(err);
  }
}


const getOneAutorizado = async (id) => {
  try {
    const [rows, fields] = await connection.query(`
    SELECT * FROM autorizadosaluno WHERE id = ?;
      `, [id])
    return rows
  } catch (err) {
    return err
  }
}

const createAutorizado = async (autorizado) => {
  try {
    const [rows, fields] = await connection.query(`
    INSERT INTO autorizadosaluno (
        cpfautorizado, nomeautorizado, idCadastroAluno
    )
    VALUES (
        ?, ?, ?
    )
      `, [autorizado.cpfautorizado, autorizado.nomeautorizado, autorizado.idCadastroAluno])
    return rows
  } catch (err) {
    return err
  }
}

const updateAutorizado = async (id, autorizado) => {
  try {
    const [rows, fields] = await connection.query(`
    UPDATE autorizadosaluno 
    SET
    cpfautorizado = ?, nomeautorizado = ?
    WHERE id = ?
      `, [autorizado.cpfautorizado, autorizado.nomeautorizado, id])
    return rows
  } catch (err) {
    return err
  }
}

const deleteAutorizado = async (id) => {
  try {
    const [rows, fields] = await connection.query(`
    DELETE FROM autorizadosaluno WHERE id = ?;
      `, [id])
    return rows
  } catch (err) {
    return err
  }
}

export {
  getOneAutorizado,
  getAllAutorizados,
  createAutorizado,
  updateAutorizado,
  deleteAutorizado
}