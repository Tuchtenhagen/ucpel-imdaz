import { 
  getMae, 
  getMaes, 
  deleteMaeById, 
  createNewMae, 
  createMaeFilho,
  updateMaeById, 
} from '../controllers/maes-controllers.js'

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

export const MaeRoutes = async (app) => {

  app.get('/maes', async (req, reply) => getMaes(req, reply))

  app.get('/maes/:id', async (req, reply) => getMae(req, reply))

  app.post('/maes', {schema}, async (req, reply) => createNewMae(req, reply))

  app.post('/maes/:id', async (req, reply) => createMaeFilho(req, reply))

  app.put('/maes/:id', async (req, reply) => updateMaeById(req, reply))

  app.delete('/maes/:id', async (req, reply) => deleteMaeById(req, reply))


}


