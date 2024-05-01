const getAllAlunos = async (app) => {
  try {
    const [rows, fields] = await app.mysql.query(`
      SELECT 
        cg.rg, 
        cg.cpf,
        cg.nome, 
        cg.genero, 
        cg.dataNascimento,
        ca.anoEscolar, 
        ca.NomeResponsavel 
      FROM cadastrogeral cg
      INNER JOIN cadastroaluno ca ON cg.id = ca.idCadastroGeral
      `);
      return rows
  } catch (err) {
    reply.status(500).send(err);
  }
}


const getOneAluno = async (app, cpf) => {
  try {
    const [rows, fields] = await app.mysql.query(`
      SELECT 
        cg.rg, 
        cg.cpf,
        cg.nome, 
        cg.genero, 
        cg.dataNascimento,
        ca.anoEscolar, 
        ca.NomeResponsavel 
      FROM cadastrogeral cg
      INNER JOIN cadastroaluno ca ON cg.id = ca.idCadastroGeral
      WHERE cg.cpf = ?;
      `, [cpf])
    return rows
  } catch (err) {
    return err
  }
}

export {
  getOneAluno,
  getAllAlunos,
}