import { connection } from '../db/config-db.js'

const getAllMaeAluno = async () => {
  try {
    const [rows, fields] = await connection.query(`
    SELECT * FROM maealuno
    `)
      return rows
  } catch (err) {
    reply.status(500).send(err);
  }
}


const getAlunoByMae = async (idCadastroMae) => {
  try {
    const [rows, fields] = await connection.query(`
    SELECT cg.* 
    FROM maealuno ma
    INNER JOIN cadastroaluno ca ON ca.id = ma.idCadastroAluno
    INNER JOIN cadastrogeral cg ON cg.id = ca.idCadastroGeral
    WHERE ma.idCadastroMae = ?;
      `, [idCadastroMae])
    return rows
  } catch (err) {
    return err
  }
}

const createMaeAluno = async (idAluno, idMae) => {
  try {
    const [rows, fields] = await connection.query(`
    INSERT INTO maealuno (
      idcadastroaluno, idcadastromae
    )
    VALUES (
        ?, ?
    )
      `, [idAluno, idMae])
    return rows
  } catch (err) {
    return err
  }
}

const deleteMaeAlunoById = async (id) => {
  try {
    const [rows, fields] = await connection.query(`
    DELETE FROM maealuno WHERE id = ?
      `, [id])
    return rows
  } catch (err) {
    return err
  }
}

const deleteMaeAlunoByCadastroMaeId = async (id) => {
  try {
    const [rows, fields] = await connection.query(`
    DELETE FROM maealuno WHERE idCadastroMae = ?
      `, [id])
    return rows
  } catch (err) {
    return err
  }
}

const deleteMaeAlunoByCPFMae = async (cpf) => {
  try {
    const [rows, fields] = await connection.query(`
    DELETE FROM maealuno WHERE idcadastromae = (SELECT cm.id FROM cadastromae cm JOIN cadastrogeral cg ON cm.idcadastrogeral = cg.id WHERE cg.cpf = ?)
      `, [cpf])
    return rows
  } catch (err) {
    return err
  }
}

export {
  getAlunoByMae,
  getAllMaeAluno,
  createMaeAluno,
  deleteMaeAlunoById,
  deleteMaeAlunoByCPFMae,
  deleteMaeAlunoByCadastroMaeId,
}