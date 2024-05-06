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

  export const getMaes = async (req, reply) => {
    try {
      const allMaes = await getAllMaes()
      reply.send(allMaes)
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const getMae = async (req, reply) => {
    const { id } = req.params
    try {
      const mae = await getOneMae(id)
      const filhos = await getAlunoByMae(id)
      if (mae.length < 1) {
        return reply.status(404).send('Mãe not found')
      }

        reply.send({...mae[0], filhos})
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const createNewMae = async (req, reply) => {
    const { CadastroGeral, cadastroMae } =WireToCadastroGeralAndMae(req.body)

    try {
      await createMae(cadastroMae, CadastroGeral)

        reply.status(201).send("Created Mae")
    } catch (err) {
      reply.status(500).send(err)
    }
  }

  export const createMaeFilho = async (req, reply) => {
    const { id } = req.params
    const { filhosId } = req.body 

    try {
      const alunos = await filhosId.filter(filhoId => {
        return getOneAluno(id)
      })

      const mae = await getOneMae(id)
      
      if (alunos.length < 1 || mae.length < 1) {
        return reply.status(404).send('Not found')
      }

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
      const alunos = await filhosId.filter(filhoId => {
        return getOneAluno(id)
      })

      const mae = await getOneMae(id)
      
      if (alunos.length < 1 || mae.length < 1) {
        return reply.status(404).send('Not found')
      }

      await alunos.map(filhoId => deleteMaeAlunoById(filhoId, id))      

        reply.status(201).send("Relation deleted")
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const updateMaeById = async (req, reply) => {
    const { id } = req.params

    try {
      const mae = await getOneMae(id)
      
      if (mae.length < 1) {
        return reply.status(404).send('Mae not found')
      }

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
      }
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