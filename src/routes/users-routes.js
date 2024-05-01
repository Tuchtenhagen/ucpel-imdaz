import { getAlunos, getAluno } from '../controllers/alunos-controllers.js'

export const routes = async (app) => {
  app.get('/alunos', async (req, reply) => getAlunos(app, req, reply))

  app.get('/alunos/:cpf', async (req, reply) => getAluno(app, req, reply))
}