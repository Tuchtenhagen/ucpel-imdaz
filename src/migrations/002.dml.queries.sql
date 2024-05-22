-- Queries da tabela CADASTROALUNO
-- Consultas de CADASTROALUNO com respectivo registro de CADASTROGERAL
SELECT cg.*, ca.*
FROM
    cadastroaluno ca
    JOIN cadastrogeral cg ON cg.id = ca.idcadastrogeral;

SELECT cg.*, ca.*
FROM
    cadastroaluno ca
    JOIN cadastrogeral cg ON cg.id = ca.idcadastrogeral
WHERE
    ca.id = ?;
-- Query para criar um registro de CADASTROALUNO
INSERT INTO
    cadastroaluno (
        anoEscolar,
        alfabetizado,
        irmaoInstituicao,
        escola,
        nomeResponsavel,
        parentescoResponsavel,
        autorizaCadastroNotaFiscalGaucha,
        tipoResidencia,
        numeroPecas,
        possuiBanheiro,
        possuiAgua,
        possuiLuz,
        idCadastroGeral
    )
VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )
    -- Query para Alterar um registro de CADASTROALUNO
UPDATE cadastroaluno
SET
    anoEscolar = ?,
    alfabetizado = ?,
    irmaoInstituicao = ?,
    escola = ?,
    nomeResponsavel = ?,
    parentescoResponsavel = ?,
    autorizaCadastroNotaFiscalGaucha = ?,
    tipoResidencia = ?,
    numeroPecas = ?,
    possuiBanheiro = ?,
    possuiAgua = ?,
    possuiLuz = ?
WHERE
    id = ?;

-- Query para deletar um registro de CADASTROALUNO
DELETE FROM cadastroaluno WHERE id = ?;

----------------------------------------------------------------------------------
-- Queries da tabela CADASTROGERAL

-- Queries de consulta na tabela CADASTROGERAL
SELECT * FROM cadastrogeral;

SELECT * FROM cadastrogeral WHERE cpf = ?;

SELECT * FROM cadastrogeral WHERE id = ?;

-- Query para inserir um registro na tabela CADASTROGERAL
INSERT INTO
    cadastrogeral (
        rg,
        nome,
        genero,
        etnia,
        tipoDeficiencia,
        dataNascimento,
        dataEmissaoRg,
        direitoImagem,
        rendaFamiliarMensal,
        rua,
        numero,
        bairro,
        cpf
    )
VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )
-- Query para alterar um registro na tabela CADASTROGERAL
UPDATE cadastrogeral
SET
    rg = ?,
    nome = ?,
    genero = ?,
    etnia = ?,
    tipoDeficiencia = ?,
    dataNascimento = ?,
    dataEmissaoRg = ?,
    direitoImagem = ?,
    rendaFamiliarMensal = ?,
    rua = ?,
    numero = ?,
    bairro = ?,
    cpf = ?
WHERE
    id = ?;

-- Query para deletar um registro na tabela CADASTROGERAL
DELETE FROM cadastrogeral WHERE id = ?;

----------------------------------------------------------------------------------
-- Queries da tabela CADASTROMAE

-- Queries de consulta na tabela CADASTROMAE
SELECT cg.*, cm.*
FROM
    cadastromae cm
    JOIN cadastrogeral cg ON cg.id = cm.idcadastrogeral;

SELECT cg.*, cm.*
FROM
    cadastromae cm
    JOIN cadastrogeral cg ON cg.id = cm.idcadastrogeral
WHERE
    cm.id = ?;

-- Query para inserir um registro na tabela CADASTROMAE
INSERT INTO
    cadastromae (
        nis,
        recebeBolsaFamilia,
        trabalhaFora,
        responsavelEnquantoFora,
        participarProjetoCulinaria,
        participarProjetoCostura,
        qtdFilhos,
        idCadastroGeral
    )
VALUES (?, ?, ?, ?, ?, ?, ?, ?);

-- Query para alterar um registro na tabela CADASTROMAE
UPDATE cadastromae
SET
    nis = ?,
    recebeBolsaFamilia = ?,
    trabalhaFora = ?,
    responsavelEnquantoFora = ?,
    participarProjetoCulinaria = ?,
    participarProjetoCostura = ?,
    qtdFilhos = ?
WHERE
    id = ?;

-- Query para deletar um registro na tabela CADASTROMAE
DELETE FROM cadastromae WHERE id = ?;

----------------------------------------------------------------------------------
-- Queries da tabela TURMAS

-- Queries de consulta na tabela TURMAS
SELECT * FROM turmas;

SELECT * FROM turmas WHERE id = ?;

-- Query para inserir um registro na tabela TURMAS
INSERT INTO
    turmas (
        ano,
        turno,
        idade,
        escola,
        alfabetizado,
        anoescolar,
        bairro,
        idCadastroAluno
    )
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
-- Query para alterar um registro na tabela TURMAS
UPDATE turmas
SET
    ano = ?,
    turno = ?,
    idade = ?,
    escola = ?,
    alfabetizado = ?,
    anoescolar = ?,
    bairro = ?
WHERE
    id = ?;

-- Query para deletar um registro na tabela TURMAS
DELETE FROM turmas WHERE id = ?;

----------------------------------------------------------------------------------
-- Queries da tabela TELEFONE

-- Queries de consulta na tabela TELEFONE
SELECT * FROM telefone;

SELECT telefone FROM telefone WHERE idCadastroGeral = ?;

-- Query para inserir um registro na tabela TELEFONE
INSERT INTO
    telefone (telefone, idcadastrogeral)
VALUES (?, ?),
-- Query para alterar um registro na tabela TELEFONE
UPDATE telefone
SET
    telefone = ?,
    idcadastrogeral = (
        select id
        from cadastrogeral
        where
            cpf = ?
    )
WHERE
    id = ?;

-- Queries para deletar um registro na tabela TELEFONE
DELETE FROM telefone WHERE telefone = ?;

DELETE FROM telefone WHERE idcadastrogeral = ?;

----------------------------------------------------------------------------------
-- Queries da tabela MAEALUNO

-- Queries de consulta na tabela MAEALUNO
SELECT * FROM maealuno;

SELECT cg.*
FROM
    maealuno ma
    INNER JOIN cadastroaluno ca ON ca.id = ma.idCadastroAluno
    INNER JOIN cadastrogeral cg ON cg.id = ca.idCadastroGeral
WHERE
    ma.idCadastroMae = ?;

-- Query para inserir um registro na tabela MAEALUNO
INSERT INTO
    maealuno (
        idcadastroaluno,
        idcadastromae
    )
VALUES (?, ?);

-- Query para deletar um registro na tabela MAEALUNO
DELETE FROM maealuno WHERE id = ?;

----------------------------------------------------------------------------------
-- Queries da tabela AUTORIZADOSALUNO

-- Queries de consulta na tabela AUTORIZADOSALUNO
SELECT * FROM autorizadosaluno;

SELECT * FROM autorizadosaluno WHERE id = ?;

-- Query para inserir um registro na tabela AUTORIZADOSALUNO
INSERT INTO
    autorizadosaluno (
        cpfautorizado,
        nomeautorizado,
        idCadastroAluno
    )
VALUES (?, ?, ?);

-- Query para alterar um registro na tabela AUTORIZADOSALUNO
UPDATE autorizadosaluno
SET
    cpfautorizado = ?,
    nomeautorizado = ?
WHERE
    id = ?
-- Query para deletar um registro na tabela AUTORIZADOSALUNO
DELETE FROM autorizadosaluno WHERE id = ?;