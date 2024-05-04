  import { getAllAlunos, getOneAluno, createAluno } from '../repositories/alunos-repository.js'

  export const getAlunos = async (req, reply) => {
    try {
      const allAlunos = await getAllAlunos()
        reply.send(allAlunos)
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const getAluno = async (req, reply) => {
    const { id } = req.params
    try {
      const allAlunos = await getOneAluno(id)

        reply.send(allAlunos)
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const createNewAluno = async (req, reply) => {
    const { CadastroGeral, cadastroAluno } =WireToCadastroGeralAndAluno(req.body)

    try {
      const createdAluno = await createAluno(cadastroAluno, CadastroGeral)

        reply.send(createdAluno)
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  const WireToCadastroGeralAndAluno = (infos) => {
    return {
      cadastroAluno: {
        anoEscolar: infos.anoEscolar , 
        alfabetizado: infos.alfabetizado , 
        irmaoInstituicao: infos.irmaoInstituicao , 
        escola: infos.escola , 
        nomeResponsavel: infos.nomeResponsavel , 
        parentescoResponsavel: infos.parentescoResponsavel , 
        autorizaCadastroNotaFiscalGaucha: infos.autorizaCadastroNotaFiscalGaucha , 
        tipoResidencia: infos.tipoResidencia , 
        numeroPecas: infos.numeroPecas , 
        possuiBanheiro: infos.possuiBanheiro , 
        possuiAgua: infos.possuiAgua , 
        possuiLuz: infos.possuiLuz,
        
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