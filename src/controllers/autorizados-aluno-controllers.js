import { getOneAluno } from '../repositories/alunos-repository.js'

import { 
  deleteAutorizado,
  createAutorizado,
  getAllAutorizados,
  updateAutorizado,
  getOneAutorizado,
} from '../repositories/autorizados-aluno-repository.js'

  export const getAutorizados = async (req, reply) => {
    try {
      const allAutorizados = await getAllAutorizados()
        reply.send(allAutorizados)
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const getAutorizado = async (req, reply) => {
    const { id } = req.params
    try {
      const autorizado = await getOneAutorizado(id)
      if (autorizado.length < 1) {
        return reply.status(404).send('Autorizado not found')
      }
      const aluno = await getOneAluno(autorizado[0].idCadastroAluno)

        reply.send({...autorizado[0], aluno})
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const createNewAutorizado = async (req, reply) => {
    try {
      await createAutorizado(req.body)

        reply.status(201).send("Created Autorizado Aluno")
    } catch (err) {
      reply.status(500).send(err)
    }
  }

  export const updateAutorizadoById = async (req, reply) => {
    const { id } = req.params

    try {
      const autorizado = await getOneAutorizado(id)
      
      if (autorizado.length < 1) {
        return reply.status(404).send('Autorizado not found')
      }

      await updateAutorizado(id, req.body)

        reply.status(201).send("Updated Autorizado")
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const deleteAutorizadoById = async (req, reply) => {
    const { id } = req.params

    try {
      const autorizado = await getOneAutorizado(id)

      if (autorizado.length < 1) {
        return reply.status(404).send('Autorizado not found')
      }

      await deleteAutorizado(id)

      reply.status(200).send("Deleted Autorizado")
    } catch (err) {
      reply.status(500).send(err);
    }
  }
