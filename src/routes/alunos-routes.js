import { getAlunos, getAluno } from '../controllers/alunos-controllers.js'

export const Alunoroutes = async (app) => {
  app.get('/alunos', async (req, reply) => getAlunos(req, reply))

  app.get('/alunos/:id', async (req, reply) => getAluno(req, reply))

  app.post('/alunos', async (req, reply) => getAluno(req, reply))

  app.put('/alunos/:cpf', async (req, reply) => getAluno(req, reply))

  app.delete('/alunos/:id', async (req, reply) => getAluno(req, reply))
}