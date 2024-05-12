import { 
  getAllAlunos, 
  getOneAluno, 
  createAluno, 
  updateAluno,
  deleteAluno 
} from '../repositories/alunos-repository.js'

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
      const aluno = await getOneAluno(id)
      if (aluno.length < 1) {
        return reply.status(404).send('Aluno not found')
      }

        reply.send(aluno)
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const createNewAluno = async (req, reply) => {
    const { CadastroGeral, cadastroAluno, telefones } =WireToCadastroGeralAndAluno(req.body)

    try {
      await createAluno(cadastroAluno, CadastroGeral, telefones)

        reply.status(201).send("Created Aluno")
    } catch (err) {
      reply.status(500).send(err)
    }
  }

  export const updateAlunoById = async (req, reply) => {
    const { id } = req.params

    try {
      const aluno = await getOneAluno(id)
      
      if (aluno.length < 1) {
        return reply.status(404).send('Aluno not found')
      }

      const  { CadastroGeral, cadastroAluno } = WireToUpdateCadastroGeralAndAluno(req.body, aluno[0])

      await updateAluno(id, cadastroAluno, CadastroGeral)

        reply.status(201).send("Updated Aluno")
    } catch (err) {
      reply.status(500).send(err);
    }
  }

  export const deleteAlunoById = async (req, reply) => {
    const { id } = req.params

    try {
      const aluno = await getOneAluno(id)

      if (aluno.length < 1) {
        return reply.status(404).send('Aluno not found')
      }

      await deleteAluno(id, aluno[0].idCadastroGeral)

      reply.status(200).send("Deleted Aluno")
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
      },
      telefones: infos.telefones
    }
  }

  const WireToUpdateCadastroGeralAndAluno = (update, dbAluno) => {
    return {
      cadastroAluno: {
        anoEscolar: update.anoEscolar ?? dbAluno.anoEscolar, 
        alfabetizado: update.alfabetizado ?? dbAluno.alfabetizado, 
        irmaoInstituicao: update.irmaoInstituicao ?? dbAluno.irmaoInstituicao, 
        escola: update.escola ?? dbAluno.escola, 
        nomeResponsavel: update.nomeResponsavel ?? dbAluno.nomeResponsavel, 
        parentescoResponsavel: update.parentescoResponsavel ?? dbAluno.parentescoResponsavel, 
        autorizaCadastroNotaFiscalGaucha: update.autorizaCadastroNotaFiscalGaucha  ?? dbAluno.autorizaCadastroNotaFiscalGaucha, 
        tipoResidencia: update.tipoResidencia ?? dbAluno.tipoResidencia, 
        numeroPecas: update.numeroPecas ?? dbAluno.numeroPecas, 
        possuiBanheiro: update.possuiBanheiro ?? dbAluno.possuiBanheiro, 
        possuiAgua: update.possuiAgua ?? dbAluno.possuiAgua, 
        possuiLuz: update.possuiLuz ?? dbAluno.possuiLuz,
        
      },
      CadastroGeral: {
        id: dbAluno.idCadastroGeral,
        rg: update.rg ?? dbAluno.rg, 
        nome: update.nome ?? dbAluno.nome, 
        genero: update.genero ?? dbAluno.genero, 
        etnia: update.etnia  ?? dbAluno.etnia, 
        tipoDeficiencia: update.tipoDeficiencia  ?? dbAluno.tipoDeficiencia, 
        dataNascimento: update.dataNascimento  ?? dbAluno.dataNascimento, 
        dataEmissaoRg: update.dataEmissaoRg  ?? dbAluno.dataEmissaoRg, 
        direitoImagem: update.direitoImagem  ?? dbAluno.direitoImagem, 
        rendaFamiliar: update.rendaFamiliar  ?? dbAluno.rendaFamiliar, 
        rua: update.rua ?? dbAluno.rua, 
        numero: update.numero ?? dbAluno.numero, 
        bairro: update.bairro ?? dbAluno.bairro, 
        cpf: update.cpf ?? dbAluno.cpf, 
      }
    }
  }