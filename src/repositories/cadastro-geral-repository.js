import { connection } from '../db/config-db.js'

const getAllCadastroGeral = async () => {
  try {
    const [rows, fields] = await connection.query(`SELECT * FROM cadastrogeral`)
      return rows
  } catch (err) {
    reply.status(500).send(err);
  }
}


const getOneCadastroGeral = async (cpf) => {
  try {
    const [rows, fields] = await connection.query(`SELECT * FROM cadastrogeral WHERE cpf = ?; `, [cpf])
    return rows
  } catch (err) {
    return err
  }
}

const getOneCadastroGeralById = async (id) => {
  try {
    const [rows, fields] = await connection.query(`SELECT * FROM cadastrogeral WHERE id = ?; `, [id])
    return rows
  } catch (err) {
    return err
  }
}

const createCadastroGeral = async (cadastro) => {
  try {
    const [rows, fields] = await connection.query(`
    INSERT INTO cadastrogeral (
      rg, nome, genero, etnia, tipoDeficiencia, dataNascimento, dataEmissaoRg, direitoImagem, rendaFamiliarMensal, rua, numero, bairro, cpf
    )
    VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
      `, [cadastro.rg, cadastro.nome, cadastro.genero, cadastro.etnia, cadastro.tipoDeficiencia, cadastro.dataNascimento, cadastro.dataEmissaoRg, cadastro.direitoImagem, cadastro.rendaFamiliarMensal, cadastro.rua, cadastro.numero, cadastro.bairro, cadastro.cpf])
    return rows
  } catch (err) {
    return err
  }
}

const updateCadastroGeral = async (id, cadastro) => {
  try {
    const [rows, fields] = await connection.query(`
    UPDATE cadastrogeral 
    SET
      rg = ?, nome = ?, genero = ?, etnia = ?, tipoDeficiencia = ?, dataNascimento = ?, dataEmissaoRg = ?, direitoImagem = ?, rendaFamiliarMensal = ?, rua = ?, numero = ?, bairro = ?, cpf = ?
    WHERE id = ?
      `, [cadastro.rg, cadastro.nome, cadastro.genero, cadastro.etnia, cadastro.tipoDeficiencia, cadastro.dataNascimento, cadastro.dataEmissaoRg, cadastro.direitoImagem, cadastro.rendaFamiliarMensal, cadastro.rua, cadastro.numero, cadastro.bairro, cadastro.cpf, id])
    return rows
  } catch (err) {
    throw err
  }
}

const deleteCadastroGeral = async (id) => {
  try {
    const [rows, fields] = await connection.query(`
    DELETE FROM cadastrogeral WHERE id = ?;
      `, [id])
    return rows
  } catch (err) {
    return err
  }
}

export {
  getAllCadastroGeral,
  deleteCadastroGeral,
  createCadastroGeral,
  updateCadastroGeral,
  getOneCadastroGeral,
  getOneCadastroGeralById,
}