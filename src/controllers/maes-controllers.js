import {  getOneAluno } from '../repositories/alunos-repository.js'
import { 
  deleteMae,
  createMae,
  getAllMaes,
  updateMae,
  getOneMae,
} from '../repositories/maes-repository.js'
import { 
  getAlunoByMae,
  createMaeAluno,
  deleteMaeAlunoById,
} from '../repositories/mae-aluno-repository.js'
import { 
  getTelefoneByIdCadastroGeral
} from '../repositories/telefone-repository.js'

  export const getMaes = async (req, reply) => {
    try {
      // Busca todas mães, caso contrário, retorna um erro
      const allMaes = await getAllMaes()
      reply.send(allMaes)
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const getMae = async (req, reply) => {
    const { id } = req.params
    try {
      // Busca uma mãe pelo ID, caso contrário, retorna que não foi encontrado
      const mae = await getOneMae(id)

      // Busca os alunos que tem vinculo com a mãe pelo ID
      const filhos = await getAlunoByMae(id)
      if (mae.length < 1) {
        return reply.status(404).send('Mãe not found')
      }

      // Busca os telefones vinculados a mãe
      const telefones = await getTelefoneByIdCadastroGeral(mae[0].idCadastroGeral)
      const fones = telefones.map(obj => obj.telefone)

        reply.send({...mae[0], telefones: fones, filhos})
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const createNewMae = async (req, reply) => {

      // Função para extrair, a partir do body da requisição, os dados de cada tabela para inserir no banco de dados
    const { CadastroGeral, cadastroMae, telefones } =WireToCadastroGeralAndMae(req.body)

    try {
      await createMae(cadastroMae, CadastroGeral, telefones)

        reply.status(201).send("Created Mae")
    } catch (err) {
      reply.status(500).send(err)
    }
  }

  export const createMaeFilho = async (req, reply) => {
    const { id } = req.params
    const { filhosId } = req.body 

    try {
      // busca os alunos existentes para vincular com a mãe
      const alunos = await filhosId.filter(filhoId => {
        return getOneAluno(id)
      })

      // busca a mãe pelo ID passado na requisição
      const mae = await getOneMae(id)
      
      if (alunos.length < 1 || mae.length < 1) {
        return reply.status(404).send('Not found')
      }

      // Percorre a Lista de alunos e vincula com a mãe
      await alunos.map(filhoId => createMaeAluno(filhoId, id))      

        reply.status(201).send("Relation created")
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const deleteMaeFilho = async (req, reply) => {
    const { id } = req.params
    const { filhosId } = req.body 

    try {
      // busca os alunos existentes para desvincular com a mãe
      const alunos = await filhosId.filter(() => {
        return getOneAluno(id)
      })

      // busca a mãe pelo ID passado na requisição
      const mae = await getOneMae(id)
      
      if (alunos.length < 1 || mae.length < 1) {
        return reply.status(404).send('Not found')
      }

      // Percorre a Lista de alunos e desvincula com a mãe
      await alunos.map(filhoId => deleteMaeAlunoById(filhoId, id))      

        reply.status(201).send("Relation deleted")
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const updateMaeById = async (req, reply) => {
    const { id } = req.params

    try {
      // Verifica se a mãe existe para ser alterado, caso contrário, retorna mãe não encontrada
      const mae = await getOneMae(id)
      
      if (mae.length < 1) {
        return reply.status(404).send('Mae not found')
      }

      // Função para extrair os dados que serão atualizados e/ou manter as informações das tabelas
      const  { CadastroGeral, cadastroMae } = WireToUpdateCadastroGeralAndMae(req.body, mae[0])

      await updateMae(id, cadastroMae, CadastroGeral)

        reply.status(201).send("Updated Mae")
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const deleteMaeById = async (req, reply) => {
    const { id } = req.params

    try {
      // Verifica se o aluno existe para ser deletado, caso contrário, retorna aluno não encontrado
      const mae = await getOneMae(id)

      if (mae.length < 1) {
        return reply.status(404).send('Mãe not found')
      }

      await deleteMae(id, mae[0].idCadastroGeral)

      reply.status(200).send("Deleted Mae")
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  const WireToCadastroGeralAndMae = (infos) => {
    return {
      cadastroMae: {
        nis: infos.nis , 
        recebeBolsaFamilia: infos.recebeBolsaFamilia , 
        trabalhaFora: infos.trabalhaFora , 
        responsavelEnquantoFora: infos.responsavelEnquantoFora , 
        participarProjetoCulinaria: infos.participarProjetoCulinaria , 
        participarProjetoCostura: infos.participarProjetoCostura , 
        qtdFilhos: infos.qtdFilhos,
      },
      CadastroGeral: {
        rg: infos.rg, 
        nome: infos.nome, 
        genero: infos.genero, 
        etnia: infos.etnia , 
        tipoDeficiencia: infos.tipoDeficiencia , 
        dataNascimento: infos.dataNascimento , 
        dataEmissaoRg: infos.dataEmissaoRg , 
        direitoImagem: infos.direitoImagem , 
        rendaFamiliar: infos.rendaFamiliar , 
        rua: infos.rua , 
        numero: infos.numero , 
        bairro: infos.bairro , 
        cpf: infos.cpf , 
      },
      telefones: infos.telefones
    }
  }

  const WireToUpdateCadastroGeralAndMae = (update, dbMae) => {
    return {
      cadastroMae: {
        nis: update.nis ?? dbMae.nis, 
        recebeBolsaFamilia: update.recebeBolsaFamilia ?? dbMae.recebeBolsaFamilia, 
        trabalhaFora: update.trabalhaFora ?? dbMae.trabalhaFora, 
        responsavelEnquantoFora: update.responsavelEnquantoFora ?? dbMae.responsavelEnquantoFora, 
        participarProjetoCulinaria: update.participarProjetoCulinaria ?? dbMae.participarProjetoCulinaria, 
        participarProjetoCostura: update.participarProjetoCostura ?? dbMae.participarProjetoCostura, 
        qtdFilhos: update.qtdFilhos ?? dbMae.qtdFilhos,
      },
      CadastroGeral: {
        id: dbMae.idCadastroGeral,
        rg: update.rg ?? dbMae.rg, 
        nome: update.nome ?? dbMae.nome, 
        genero: update.genero ?? dbMae.genero, 
        etnia: update.etnia  ?? dbMae.etnia, 
        tipoDeficiencia: update.tipoDeficiencia  ?? dbMae.tipoDeficiencia, 
        dataNascimento: update.dataNascimento  ?? dbMae.dataNascimento, 
        dataEmissaoRg: update.dataEmissaoRg  ?? dbMae.dataEmissaoRg, 
        direitoImagem: update.direitoImagem  ?? dbMae.direitoImagem, 
        rendaFamiliar: update.rendaFamiliar  ?? dbMae.rendaFamiliar, 
        rua: update.rua ?? dbMae.rua, 
        numero: update.numero ?? dbMae.numero, 
        bairro: update.bairro ?? dbMae.bairro, 
        cpf: update.cpf ?? dbMae.cpf, 
      }
    }
  }