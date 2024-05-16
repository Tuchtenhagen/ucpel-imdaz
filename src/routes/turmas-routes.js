import { 
  getTurma,
  getTurmas,
  deleteTurmaById,
  createNewTurma,
  updateTurmaById,
} from '../controllers/turmas-controllers.js'

// Schema de validação para criação de uma turma
const schema = {
  body: {
    type: 'object',
    properties: {
      ano: { type: 'string' }, 
      turno: { type: 'string' }, 
      idade: { type: 'number' }, 
      escola: { type: 'string' }, 
      alfabetizado: { type: 'boolean' }, 
      anoEscolar: { type: 'string' }, 
      bairro: { type: 'string' }, 
      idCadastroAluno: { type: 'number' }, 
    }
  }
}

export const TurmaRoutes = async (app) => {

    // Rota para buscar todas turmas
  app.get('/turmas', async (req, reply) => getTurmas(req, reply))

    // Rota para buscar apenas uma turma
  app.get('/turmas/:id', async (req, reply) => getTurma(req, reply))

    // Rota para criar uma turma
  app.post('/turmas', {schema}, async (req, reply) => createNewTurma(req, reply))

    // Rota para alterar uma turma
  app.put('/turmas/:id', async (req, reply) => updateTurmaById(req, reply))

    // Rota para deletar uma turma
  app.delete('/turmas/:id', async (req, reply) => deleteTurmaById(req, reply))

}
