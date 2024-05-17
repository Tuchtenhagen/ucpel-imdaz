import { connection } from '../db/config-db.js'

// Função para buscar todos os registro de autorizados-alunos do banco de dados
const getAllAutorizados = async () => {
  try {
      /* 
    A função query retorna uma estrutura de objetos do banco de dados,
    estrutura essa que é um array de objetos, cada objeto contém os campos da 
    tabela autorizadosaluno.
    */ 
    const [rows, fields] = await connection.query(`
    SELECT * FROM autorizadosaluno
    `)
      return rows
  } catch (err) {
    reply.status(500).send(err);
  }
}

// Função para buscar apenas um registro autorizado-aluno do banco de dados, pelo ID
const getOneAutorizado = async (id) => {
  try {
        // rows vai retornar um array com apenas um elementro, que é o autorizado-aluno encontrado no banco de dados
    const [rows, fields] = await connection.query(`
    SELECT * FROM autorizadosaluno WHERE id = ?;
      `, [id])
    return rows
  } catch (err) {
    return err
  }
}

// Função para criar um registro de autorizado-aluno no banco de dados
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

// Função para atualizar os dados de um autorizado-aluno
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

// Função para deletar o registro de um autorizado-aluno do banco de dados
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