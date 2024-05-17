import { connection } from '../db/config-db.js'
import { createCadastroGeral, updateCadastroGeral, deleteCadastroGeral } from './cadastro-geral-repository.js'
import { deleteMaeAlunoByCadastroMaeId } from './mae-aluno-repository.js'
import { createTelefone, deleteTelefoneByIdCadastroGeral } from './telefone-repository.js'

// Função para buscar todas as mães do banco de dados
const getAllMaes = async () => {
  try {
    /* 
    A função query retorna uma estrutura de objetos do banco de dados,
    estrutura essa que é um array de objetos, cada objeto contém os campos da 
    tabela cadastrogeral e cadastro mãe.
    */ 
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

// Função para buscar apenas uma mãe do banco de dados, pelo ID
const getOneMae = async (id) => {
  try {
    // rows vai retornar um array com apenas um elementro, que é a mãe encontrado no banco de dados
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

     /* 
    função beginTransaction garante que toda alteração feita no banco de dados 
    só seja efetivada caso todas as operações tenham sido executadas com sucesso
    antes de ser realizado um commit() no banco de dados.
    Caso alguma operação falhe, então tudo que foi realizado é revertido, garantindo
    a integridade do banco de dados.
    */ 
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
       // caso não tenha erros nas operações, realiza um commit no banco de dados.
      await connection.commit()
      return rows
  } catch (err) {
    // caso TENHA algum erro nas operações, realiza um rollback no banco de dados, revertendo as operações.
    await connection.rollback()
    throw err
  }
}

// Função para atualizar os dados de uma mãe
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

// Função para deletar os dados de uma mãe
const deleteMae = async (id, idCadastroGeral) => {
  try {
    await connection.beginTransaction()

    await deleteMaeAlunoByCadastroMaeId(id)

    const [rows, fields] = await connection.query(`
    DELETE FROM cadastromae WHERE id = ?;
      `, [id])

      // Deleta os registros referente ao aluno na tabela de telefone também
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