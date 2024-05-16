import { 
  getAutorizado,
  getAutorizados,
  deleteAutorizadoById,
  createNewAutorizado,
  updateAutorizadoById,
} from '../controllers/autorizados-aluno-controllers.js'

// Schema de validação para criação de um autorizado-aluno
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

    // Rota para buscar todos autorizados-aluno
  app.get('/autorizados-aluno', async (req, reply) => getAutorizados(req, reply))

    // Rota para buscar apenas um autorizados-aluno
  app.get('/autorizados-aluno/:id', async (req, reply) => getAutorizado(req, reply))

    // Rota para criar um autorizados-aluno
  app.post('/autorizados-aluno', {schema}, async (req, reply) => createNewAutorizado(req, reply))

    // Rota para alterar um autorizados-aluno
  app.put('/autorizados-aluno/:id', async (req, reply) => updateAutorizadoById(req, reply))

      // Rota para deletar um autorizados-aluno
  app.delete('/autorizados-aluno/:id', async (req, reply) => deleteAutorizadoById(req, reply))

}
