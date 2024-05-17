import { connection } from '../db/config-db.js'
import { createCadastroGeral, updateCadastroGeral, deleteCadastroGeral } from './cadastro-geral-repository.js'
import { createTelefone, deleteTelefoneByIdCadastroGeral } from './telefone-repository.js'

// Função para buscar todos os registros de alunos do banco de dados
const getAllAlunos = async () => {
  try {

    /* 
    A função query retorna uma estrutura de objetos do banco de dados,
    estrutura essa que é um array de objetos, cada objeto contém os campos da 
    tabela cadastrogeral e cadastro aluno.
    */ 
    const [rows, fields] = await connection.query(`
    SELECT 
    cg.*,
    ca.* 
    FROM cadastroaluno ca
    JOIN cadastrogeral cg ON cg.id = ca.idcadastrogeral 
    `)
      return rows
  } catch (err) {
    reply.status(500).send(err);
  }
}

// Função para buscar apenas um aluno do banco de dados, pelo ID
const getOneAluno = async (id) => {
  try {
    // rows vai retornar um array com apenas um elementro, que é o aluno encontrado no banco de dados
    const [rows, fields] = await connection.query(`
    SELECT 
    cg.*,
    ca.* 
    FROM cadastroaluno ca
    JOIN cadastrogeral cg ON cg.id = ca.idcadastrogeral
  WHERE ca.id = ?
      `, [id])
    return rows
  } catch (err) {
    return err
  }
}

// Função para criar um registro de aluno no banco de dados
const createAluno = async (aluno,geral, telefones) => {
  try {

    /* 
    função beginTransaction garante que toda alteração feita no banco de dados 
    só seja efetivada caso todas as operações tenham sido executadas com sucesso
    antes de ser realizado um commit() no banco de dados.
    Caso alguma operação falhe, então tudo que foi realizado é revertido, garantindo
    a integridade do banco de dados.
    */ 
    connection.beginTransaction()

    const cadastroGeral = await createCadastroGeral(geral)
    await telefones.map(telefone => {
      return createTelefone(telefone, cadastroGeral.insertId)
    })
    const [rows, fields] = await connection.query(`
    INSERT INTO cadastroaluno (
        anoEscolar, alfabetizado, irmaoInstituicao, escola, nomeResponsavel, parentescoResponsavel, autorizaCadastroNotaFiscalGaucha, tipoResidencia, numeroPecas, possuiBanheiro, possuiAgua, possuiLuz, idCadastroGeral
    )
    VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
      `, [aluno.anoEscolar, aluno.alfabetizado, aluno.irmaoInstituicao, aluno.escola, aluno.nomeResponsavel, aluno.parentescoResponsavel, aluno.autorizaCadastroNotaFiscalGaucha, aluno.tipoResidencia, aluno.numeroPecas, aluno.possuiBanheiro, aluno.possuiAgua, aluno.possuiLuz, cadastroGeral.insertId])
      // caso não tenha erros nas operações, realiza um commit no banco de dados.
      await connection.commit()
      return rows
  } catch (err) {
    // caso TENHA algum erro nas operações, realiza um rollback no banco de dados, revertendo as operações.
    await connection.rollback()
    return err
  }
}

// Função para atualizar os dados de um aluno
const updateAluno = async (id, aluno, geral) => {
  try {
    connection.beginTransaction()

    await updateCadastroGeral(geral.id, geral)

    const [rows, fields] = await connection.query(`
    UPDATE cadastroaluno 
    SET
        anoEscolar = ?, alfabetizado = ?, irmaoInstituicao = ?, escola = ?, nomeResponsavel = ?, parentescoResponsavel = ?, autorizaCadastroNotaFiscalGaucha = ?, tipoResidencia = ?, numeroPecas = ?, possuiBanheiro = ?, possuiAgua = ?, possuiLuz = ?
    WHERE id = ?;
      `, [aluno.anoEscolar, aluno.alfabetizado, aluno.irmaoInstituicao, aluno.escola, aluno.nomeResponsavel, aluno.parentescoResponsavel, aluno.autorizaCadastroNotaFiscalGaucha, aluno.tipoResidencia, aluno.numeroPecas, aluno.possuiBanheiro, aluno.possuiAgua, aluno.possuiLuz, id])
      await connection.commit()
      return rows
  } catch (err) {
    throw err
  }
}

// Função para deletar o registro de um aluno do banco de dados
const deleteAluno = async (id, idCadastroGeral) => {
  try {
    await connection.beginTransaction()

    const [rows, fields] = await connection.query(`
    DELETE FROM cadastroaluno WHERE id = ?;
      `, [id])

    // Deleta os registros referente ao aluno na tabela de telefone também
    await deleteTelefoneByIdCadastroGeral(idCadastroGeral)
    await deleteCadastroGeral(idCadastroGeral)

      await connection.commit()
    return rows
  } catch (err) {
    return err
  }
}

export {
  getOneAluno,
  getAllAlunos,
  createAluno,
  updateAluno,
  deleteAluno
}