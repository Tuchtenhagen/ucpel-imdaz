import { connection } from '../db/config-db.js'

const getAllMaes = async () => {
  try {
    const [rows, fields] = await connection.query(`
    SELECT * FROM cadastromae
    `)
      return rows
  } catch (err) {
    reply.status(500).send(err);
  }
}


const getOneMae = async (id) => {
  try {
    const [rows, fields] = await connection.query(`
    SELECT * FROM cadastromae WHERE id = ?;
      `, [id])
    return rows
  } catch (err) {
    return err
  }
}

const createMae = async (mae) => {
  try {
    const [rows, fields] = await connection.query(`
    INSERT INTO cadastromae (
      nis, recebeBolsaFamilia, trabalhaFora, responsavelEnquantoFora, participarProjetoCulinaria, participarProjetoCostura, qtdFilhos, cpf
    )
    VALUES (
        ?, ?, ?, ?, ?, ?, ?, (select id from cadastrogeral where cpf = ?)
    )
      `, [mae.nis, mae.recebeBolsaFamilia, mae.trabalhaFora, mae.responsavelEnquantoFora, mae.participarProjetoCulinaria, mae.participarProjetoCostura, mae.qtdFilhos, mae.cpf])
    return rows
  } catch (err) {
    return err
  }
}

const updateMae = async (id, mae) => {
  try {
    const [rows, fields] = await connection.query(`
    UPDATE cadastromae
    SET
    nis = ?, recebeBolsaFamilia = ?, trabalhaFora = ?, responsavelEnquantoFora = ?, participarProjetoCulinaria = ?, participarProjetoCostura = ?, qtdFilhos = ?
    WHERE id = ?
      `, [mae.nis, mae.recebeBolsaFamilia, mae.trabalhaFora, mae.responsavelEnquantoFora, mae.participarProjetoCulinaria, mae.participarProjetoCostura, mae.qtdFilhos, id])
    return rows
  } catch (err) {
    return err
  }
}

const deleteMae = async (id) => {
  try {
    const [rows, fields] = await connection.query(`
    DELETE FROM cadastromae WHERE id = ?;
      `, [id])
    return rows
  } catch (err) {
    return err
  }
}

export {
  getOneMae,
  getAllMaes,
  createMae,
  updateMae,
  deleteMae
}