  import { getAllAlunos, getOneAluno } from '../repositories/alunos-repository.js'

  export const getAlunos = async (req, reply) => {
    try {
      const allAlunos = await getAllAlunos()
        reply.send(allAlunos)
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const getAluno = async (req, reply) => {
    const { id } = req.params
    try {
      const allAlunos = await getOneAluno(id)

        reply.send(allAlunos)
    } catch (err) {
      reply.status(500).send(err);
    }
  }