import { 
  getMae, 
  getMaes, 
  deleteMaeById, 
  createNewMae, 
  createMaeFilho,
  deleteMaeFilho,
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
      nis: { type: 'string' }, 
      recebeBolsaFamilia: { type: 'boolean' }, 
      trabalhaFora: { type: 'boolean' }, 
      responsavelEnquantoFora: { type: 'boolean' }, 
      participarProjetoCulinaria: { type: 'boolean' }, 
      participarProjetoCostura: { type: 'boolean' }, 
      qtdFilhos: { type: 'number' },
      telefones: {
        type: 'array',
        items: { type: 'integer' }
      }
    }
  }
}

export const MaeRoutes = async (app) => {

  app.get('/maes', async (req, reply) => getMaes(req, reply))

  app.get('/maes/:id', async (req, reply) => getMae(req, reply))

  app.post('/maes', {schema}, async (req, reply) => createNewMae(req, reply))

  app.post('/maes/relations/:id', async (req, reply) => createMaeFilho(req, reply))

  app.post('/maes/relations/delete/:id', async (req, reply) => deleteMaeFilho(req, reply))

  app.put('/maes/:id', async (req, reply) => updateMaeById(req, reply))

  app.delete('/maes/:id', async (req, reply) => deleteMaeById(req, reply))


}


