import { connection } from '../db/config-db.js'
import { createCadastroGeral, updateCadastroGeral, deleteCadastroGeral } from './cadastro-geral-repository.js'
import { deleteMaeAlunoByCadastroMaeId } from './mae-aluno-repository.js'
import { createTelefone, deleteTelefoneByIdCadastroGeral } from './telefone-repository.js'

const getAllMaes = async () => {
  try {
    const [rows, fields] = await connection.query(`
    SELECT 
    cg.*,
    cm.* 
    FROM cadastromae cm
    JOIN cadastrogeral cg ON cg.id = cm.idcadastrogeral;
    `)
      return rows
  } catch (err) {
    return err
  }
}


const getOneMae = async (id) => {
  try {
    const [rows, fields] = await connection.query(`
    SELECT 
    cg.*,
    cm.* 
    FROM cadastromae cm
    JOIN cadastrogeral cg ON cg.id = cm.idcadastrogeral 
    WHERE cm.id = ?;
      `, [id])
    return rows
  } catch (err) {
    return err
  }
}

const createMae = async (mae, cadastroGeral, telefones) => {
  try {
    await connection.beginTransaction()

    const cadGeral = await createCadastroGeral(cadastroGeral)

    await telefones.map(telefone => {
      return createTelefone(telefone, cadGeral.insertId)
    })
    
    const [rows, fields] = await connection.query(`
    INSERT INTO cadastromae (
      nis, recebeBolsaFamilia, trabalhaFora, responsavelEnquantoFora, participarProjetoCulinaria, participarProjetoCostura, qtdFilhos, idCadastroGeral
    )
    VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?
    )
      `, [mae.nis, mae.recebeBolsaFamilia, mae.trabalhaFora, mae.responsavelEnquantoFora, mae.participarProjetoCulinaria, mae.participarProjetoCostura, mae.qtdFilhos, cadGeral.insertId])
      
      await connection.commit()
      return rows
  } catch (err) {
    throw err
  }
}

const updateMae = async (id, mae, geral) => {
  try {
    connection.beginTransaction()

    await updateCadastroGeral(geral.id, geral)

    const [rows, fields] = await connection.query(`
    UPDATE cadastromae
    SET
    nis = ?, recebeBolsaFamilia = ?, trabalhaFora = ?, responsavelEnquantoFora = ?, participarProjetoCulinaria = ?, participarProjetoCostura = ?, qtdFilhos = ?
    WHERE id = ?
      `, [mae.nis, mae.recebeBolsaFamilia, mae.trabalhaFora, mae.responsavelEnquantoFora, mae.participarProjetoCulinaria, mae.participarProjetoCostura, mae.qtdFilhos, id])

      await connection.commit()
      return rows
  } catch (err) {
    return err
  }
}

const deleteMae = async (id, idCadastroGeral) => {
  try {
    await connection.beginTransaction()

    await deleteMaeAlunoByCadastroMaeId(id)

    const [rows, fields] = await connection.query(`
    DELETE FROM cadastromae WHERE id = ?;
      `, [id])

      await deleteTelefoneByIdCadastroGeral(idCadastroGeral)
      await deleteCadastroGeral(idCadastroGeral)
    
      await connection.commit()
      return rows
  } catch (err) {
    throw err
  }
}

export {
  deleteMae,
  createMae,
  updateMae,
  getAllMaes,
  getOneMae,
}