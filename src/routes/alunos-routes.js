import { 
  getAlunos, 
  getAluno, 
  createNewAluno, 
  updateAlunoById, 
  deleteAlunoById 
} from '../controllers/alunos-controllers.js'

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
    }
  }
}

export const Alunoroutes = async (app) => {

  app.get('/alunos', async (req, reply) => getAlunos(req, reply))

  app.get('/alunos/:id', async (req, reply) => getAluno(req, reply))

  app.post('/alunos', {schema}, async (req, reply) => createNewAluno(req, reply))

  app.put('/alunos/:id', async (req, reply) => updateAlunoById(req, reply))

  app.delete('/alunos/:id', async (req, reply) => deleteAlunoById(req, reply))


}


