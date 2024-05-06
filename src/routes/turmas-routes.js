import { 
  getTurma,
  getTurmas,
  deleteTurmaById,
  createNewTurma,
  updateTurmaById,
} from '../controllers/turmas-controllers.js'

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

  app.get('/turmas', async (req, reply) => getTurmas(req, reply))

  app.get('/turmas/:id', async (req, reply) => getTurma(req, reply))

  app.post('/turmas', {schema}, async (req, reply) => createNewTurma(req, reply))

  app.put('/turmas/:id', async (req, reply) => updateTurmaById(req, reply))

  app.delete('/turmas/:id', async (req, reply) => deleteTurmaById(req, reply))

}
