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
      // Busca todos autorizados dos alunos, caso contrário, retorna um erro
      const allAutorizados = await getAllAutorizados()
        reply.send(allAutorizados)
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const getAutorizado = async (req, reply) => {
    const { id } = req.params
    try {
      // Busca um autorizado de aluno pelo ID, caso contrário, retorna que não foi encontrado
      const autorizado = await getOneAutorizado(id)
      if (autorizado.length < 1) {
        return reply.status(404).send('Autorizado not found')
      }
      // Busca o aluno vinculados ao autorizado
      const aluno = await getOneAluno(autorizado[0].idCadastroAluno)

        reply.send({...autorizado[0], aluno})
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const createNewAutorizado = async (req, reply) => {
    try {
      // Função para inserir um autorizado de aluno no banco de dados
      await createAutorizado(req.body)

        reply.status(201).send("Created Autorizado Aluno")
    } catch (err) {
      reply.status(500).send(err)
    }
  }

  export const updateAutorizadoById = async (req, reply) => {
    const { id } = req.params

    try {
      // Verifica se o autorizado de um aluno existe para ser alterado, caso contrário, retorna autorizado não encontrado
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
      // Verifica se o autorizado de um aluno existe para ser deletado, caso contrário, retorna autorizado não encontrado
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
