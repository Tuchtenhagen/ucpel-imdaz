import { connection } from '../db/config-db.js'

// Função para buscar todos os alunos do banco de dados
const getAllTelefones = async () => {
  try {
     /* 
    A função query retorna uma estrutura de objetos do banco de dados,
    estrutura essa que é um array de objetos, cada objeto contém os campos da 
    tabela telefone.
    */ 
    const [rows, fields] = await connection.query(`
    SELECT * FROM telefone
    `)
      return rows
  } catch (err) {
    reply.status(500).send(err);
  }
}

// Função para buscar apenas os telefones relacionado com um registro da tabela cadastrogeral, pelo ID
const getTelefoneByIdCadastroGeral = async (id) => {
  try {
    // rows vai retornar um array com apenas um elementro, que é o aluno encontrado no banco de dados
    const [rows, fields] = await connection.query(`
    SELECT telefone
    FROM telefone
    WHERE idCadastroGeral = ?;
      `, [id])
    return rows
  } catch (err) {
    return err
  }
}

// Função para criar um registro de telefone no banco de dados
const createTelefone = async (telefone, cadastroGeralId) => {
  try {
    const [rows, fields] = await connection.query(`
    INSERT INTO telefone (
      telefone, idcadastrogeral
    )
    VALUES (
        ?, ?
    )
      `, [telefone, cadastroGeralId])
    return rows
  } catch (err) {
    throw err
  }
}

// Função para atualizar o registro de um telefone
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

// Função para deletar o registro de um telefone, a patir de um telefone
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

// Função para deletar o registro de um telefone, a patir de um ID
const deleteTelefoneByIdCadastroGeral = async (id) => {
  try {
    const [rows, fields] = await connection.query(`
    DELETE FROM telefone WHERE idcadastrogeral = ?
      `, [id])
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
  getTelefoneByIdCadastroGeral,
  deleteTelefoneByIdCadastroGeral,
}