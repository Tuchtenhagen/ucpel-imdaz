import { connection } from '../db/config-db.js'

const getAllTelefones = async () => {
  try {
    const [rows, fields] = await connection.query(`
    SELECT * FROM telefone
    `)
      return rows
  } catch (err) {
    reply.status(500).send(err);
  }
}


const getTelefoneByCPF = async (cpf) => {
  try {
    const [rows, fields] = await connection.query(`
    SELECT tel.telefone, cg.cpf 
    FROM telefone tel 
    JOIN cadastrogeral cg ON tel.idcadastrogeral = cg.id 
    WHERE cg.cpf = ?;
      `, [cpf])
    return rows
  } catch (err) {
    return err
  }
}

const createTelefone = async (telefone, cadastroGeralId) => {
  try {
    const [rows, fields] = await connection.query(`
    INSERT INTO cadastromae (
      telefone, idcadastrogeral
    )
    VALUES (
        ?, ?
    )
      `, [telefone.telefone, cadastroGeralId])
    return rows
  } catch (err) {
    return err
  }
}

const updateTelefone = async (cpf, telefone) => {
  try {
    const [rows, fields] = await connection.query(`
    UPDATE telefone
    SET
    telefone = ?, idcadastrogeral = (select id from cadastrogeral where cpf = ?)
    WHERE id = ?
      `, [telefone.telefone, cpf])
    return rows
  } catch (err) {
    return err
  }
}

const deleteTelefone = async (telefone) => {
  try {
    const [rows, fields] = await connection.query(`
    DELETE FROM telefone WHERE telefone = ?
      `, [telefone])
    return rows
  } catch (err) {
    return err
  }
}

const deleteTelefoneByCPF = async (cpf) => {
  try {
    const [rows, fields] = await connection.query(`
    DELETE FROM telefone WHERE idcadastrogeral = (SELECT id FROM cadastrogeral WHERE cpf = ?)
      `, [cpf])
    return rows
  } catch (err) {
    return err
  }
}

export {
  deleteTelefone,
  createTelefone,
  updateTelefone,
  getAllTelefones,
  getTelefoneByCPF,
  deleteTelefoneByCPF
}