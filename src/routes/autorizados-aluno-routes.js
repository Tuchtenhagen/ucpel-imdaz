import { 
  getAutorizado,
  getAutorizados,
  deleteAutorizadoById,
  createNewAutorizado,
  updateAutorizadoById,
} from '../controllers/autorizados-aluno-controllers.js'

const schema = {
  body: {
    type: 'object',
    properties: {
      cpfautorizado: { type: 'string' }, 
      nomeautorizado: { type: 'string' }, 
      idCadastroAluno: { type: 'number' }, 
    }
  }
}

export const AutorizadosAlunoRoutes = async (app) => {

  app.get('/autorizados-aluno', async (req, reply) => getAutorizados(req, reply))

  app.get('/autorizados-aluno/:id', async (req, reply) => getAutorizado(req, reply))

  app.post('/autorizados-aluno', {schema}, async (req, reply) => createNewAutorizado(req, reply))

  app.put('/autorizados-aluno/:id', async (req, reply) => updateAutorizadoById(req, reply))

  app.delete('/autorizados-aluno/:id', async (req, reply) => deleteAutorizadoById(req, reply))

}
