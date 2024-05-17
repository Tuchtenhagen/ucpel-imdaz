import { connection } from '../db/config-db.js'

// Função para buscar todos os registros de uma relação mãe-aluno do banco de dados
const getAllMaeAluno = async () => {
  try {
    /* 
    A função query retorna uma estrutura de objetos do banco de dados,
    estrutura essa que é um array de objetos, cada objeto contém os campos da 
    tabela cadastrogeral e cadastro aluno.
    */
    const [rows, fields] = await connection.query(`
    SELECT * FROM maealuno
    `)
      return rows
  } catch (err) {
    reply.status(500).send(err);
  }
}

// Função para buscar alunos que tenham uma relação com uma mãe, pelo ID da mãe
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

// Função para criar um registro de uma relação mãe-aluno no banco de dados
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

// Função para deletar o registro de uma relação mãe-aluno do banco de dados, pelo ID 
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

// Função para deletar o registro de uma relação mãe-aluno do banco de dados, pelo ID da mãe
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

// Função para deletar o registro de uma relação mãe-aluno do banco de dados, pelo cpf da mãe
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