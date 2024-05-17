import { connection } from '../db/config-db.js'

// Função para buscar todos os registros de cadastro geral do banco de dados
const getAllCadastroGeral = async () => {
  try {
     /* 
    A função query retorna uma estrutura de objetos do banco de dados,
    estrutura essa que é um array de objetos, cada objeto contém os campos da 
    tabela cadastrogeral.
    */ 
    const [rows, fields] = await connection.query(`SELECT * FROM cadastrogeral`)
      return rows
  } catch (err) {
    reply.status(500).send(err);
  }
}

// Função para buscar apenas um registro de cadastro geral do banco de dados, pelo cpf
const getOneCadastroGeral = async (cpf) => {
  try {
    // rows vai retornar um array com apenas um elementro, que é o cadastro geral encontrado no banco de dados
    const [rows, fields] = await connection.query(`SELECT * FROM cadastrogeral WHERE cpf = ?; `, [cpf])
    return rows
  } catch (err) {
    return err
  }
}

// Função para buscar apenas um registro de cadastro geral do banco de dados, pelo ID
const getOneCadastroGeralById = async (id) => {
  try {
    const [rows, fields] = await connection.query(`SELECT * FROM cadastrogeral WHERE id = ?; `, [id])
    return rows
  } catch (err) {
    return err
  }
}

// Função para criar um registro de cadastro geral no banco de dados
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

// Função para atualizar os cadastro geral de um aluno
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

// Função para deletar o registro de um cadastro geral do banco de dados
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