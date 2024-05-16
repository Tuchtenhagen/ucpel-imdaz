import { 
  getMae, 
  getMaes, 
  deleteMaeById, 
  createNewMae, 
  createMaeFilho,
  deleteMaeFilho,
  updateMaeById, 
} from '../controllers/maes-controllers.js'

// Schema de validação para criação de uma mãe
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
      responsavelEnquantoFora: { type: 'string' }, 
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

    // Rota para buscar todas mães
  app.get('/maes', async (req, reply) => getMaes(req, reply))

    // Rota para buscar apenas uma mãe
  app.get('/maes/:id', async (req, reply) => getMae(req, reply))

    // Rota para criar uma mãe
  app.post('/maes', {schema}, async (req, reply) => createNewMae(req, reply))

      // Rota para criar um vinculo entre aluno e mãe
  app.post('/maes/relations/:id', async (req, reply) => createMaeFilho(req, reply))

    // Rota para deletar um vinculo entre aluno e mãe
  app.post('/maes/relations/delete/:id', async (req, reply) => deleteMaeFilho(req, reply))

    // Rota para alterar uma mãe
  app.put('/maes/:id', async (req, reply) => updateMaeById(req, reply))

      // Rota para deletar uma mãe
  app.delete('/maes/:id', async (req, reply) => deleteMaeById(req, reply))


}


