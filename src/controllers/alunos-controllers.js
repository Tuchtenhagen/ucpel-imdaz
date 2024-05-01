  import { getAllAlunos, getOneAluno } from '../repositories/alunos-repository.js'

  export const getAlunos = async (app, req, reply) => {
    try {
      const allAlunos = await getAllAlunos(app)
        reply.send(allAlunos)
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const getAluno = async (app, req, reply) => {
    const { cpf } = req.params
    try {
      const allAlunos = await getOneAluno(app, cpf)

        reply.send(allAlunos)
    } catch (err) {
      reply.status(500).send(err);
    }
  }