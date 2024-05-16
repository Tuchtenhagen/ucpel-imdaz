import { getOneAluno } from '../repositories/alunos-repository.js'

import { 
  deleteTurma,
  createTurma,
  updateTurma,
  getAllTurmas,
  getOneTurma,
} from '../repositories/turmas-repository.js'

  export const getTurmas = async (req, reply) => {
    try {
      // Busca todas turmas, caso contrário, retorna um erro
      const allTurmas = await getAllTurmas()
        reply.send(allTurmas)
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const getTurma = async (req, reply) => {
    const { id } = req.params
    try {
      // Busca uma turma pelo ID, caso contrário, retorna que não foi encontrado
      const turma = await getOneTurma(id)
      if (turma.length < 1) {
        return reply.status(404).send('Turma not found')
      }
      // Busca o aluno vinculado a turma
      const aluno = await getOneAluno(turma[0].idCadastroAluno)

        reply.send({...turma[0], aluno})
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const createNewTurma = async (req, reply) => {
    try {
      // Função para inserir turma no banco de dados
      await createTurma(req.body)

        reply.status(201).send("Created Turma")
    } catch (err) {
      reply.status(500).send(err)
    }
  }

  export const updateTurmaById = async (req, reply) => {
    const { id } = req.params

    try {
      // Verifica se a turma existe para ser alterado, caso contrário, retorna turma não encontrada
      const turma = await getOneTurma(id)
      
      if (turma.length < 1) {
        return reply.status(404).send('Turma not found')
      }

      await updateTurma(id, req.body)

        reply.status(201).send("Updated Turma")
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const deleteTurmaById = async (req, reply) => {
    const { id } = req.params

    try {
      // Verifica se a turma existe para ser deletado, caso contrário, retorna turma não encontrada
      const turma = await getOneTurma(id)

      if (turma.length < 1) {
        return reply.status(404).send('Turma not found')
      }

      await deleteTurma(id)

      reply.status(200).send("Deleted Turma")
    } catch (err) {
      reply.status(500).send(err);
    }
  }
