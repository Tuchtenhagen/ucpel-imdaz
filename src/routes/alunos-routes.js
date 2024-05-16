import { 
  getAlunos, 
  getAluno, 
  createNewAluno, 
  updateAlunoById, 
  deleteAlunoById 
} from '../controllers/alunos-controllers.js'

// Schema de validação para criação de um aluno
const schema = {
  body: {
    type: 'object',
    properties: {
      rg: { type: 'string' }, 
      nome: { type: 'string' }, 
      genero: { type: 'string', enum: ['masculino', 'feminino', 'não informado'] }, 
      etnia: { type: 'string' }, 
      tipoDeficiencia: { type: 'string', nullable: true }, 
      dataNascimento: { type: 'string' }, 
      dataEmissaoRg: { type: 'string' }, 
      direitoImagem: { type: 'boolean' }, 
      rendaFamiliar: { type: 'number' }, 
      rua: { type: 'string' }, 
      numero: { type: 'number' }, 
      bairro: { type: 'string' }, 
      cpf: { type: 'string' },
      anoEscolar: { type: 'string' }, 
      alfabetizado: { type: 'boolean' }, 
      irmaoInstituicao: { type: 'string' }, 
      escola: { type: 'string' }, 
      nomeResponsavel: { type: 'string' }, 
      parentescoResponsavel: { type: 'string' }, 
      autorizaCadastroNotaFiscalGaucha: { type: 'boolean' }, 
      tipoResidencia: { type: 'string' }, 
      numeroPecas: { type: 'number' }, 
      possuiBanheiro: { type: 'boolean' }, 
      possuiAgua: { type: 'boolean' }, 
      possuiLuz: { type: 'boolean' }, 
      telefones: {
        type: 'array',
        items: { type: 'integer' }
      }
    }
  }
}

export const AlunoRoutes = async (app) => {

  // Rota para buscar todos alunos
  app.get('/alunos', async (req, reply) => getAlunos(req, reply))

  // Rota para buscar apenas um aluno
  app.get('/alunos/:id', async (req, reply) => getAluno(req, reply))

  // Rota para criar um aluno
  app.post('/alunos', {schema}, async (req, reply) => createNewAluno(req, reply))

  // Rota para alterar um aluno
  app.put('/alunos/:id', async (req, reply) => updateAlunoById(req, reply))

    // Rota para deletar um aluno
  app.delete('/alunos/:id', async (req, reply) => deleteAlunoById(req, reply))


}


