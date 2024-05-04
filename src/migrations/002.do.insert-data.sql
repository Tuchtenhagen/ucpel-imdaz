-- Inserts correspondentes para a tabela CadastroGeral
INSERT INTO
    CadastroGeral (
        rg, nome, genero, etnia, tipoDeficiencia, dataNascimento, dataEmissaoRg, direitoImagem, rendaFamiliarMensal, rua, numero, bairro, cpf
    )
VALUES (
        '137157022', 'Maria Silva', 'feminino', 'branco', NULL, '1975-06-10', '1990-08-25', TRUE, 1800.00, 'Rua Doutor Nilo Peçanha', 616, 'Centro', '31850514089'
    ),
    (
        '427674190', 'Ana Oliveira', 'feminino', 'negro', NULL, '1980-02-20', '1995-04-15', TRUE, 2200.00, 'Rua Carlos Fagundes de Mello', 821, 'Vila Nova', '74184932070'
    ),
    (
        '509813719', 'Carla Santos', 'feminino', 'pardo', NULL, '1978-09-15', '1994-11-30', TRUE, 2000.50, 'Rua Engenheiro José M. Vianna', 789, 'Jardim', '14290445004'
    ),
    (
        '495809196', 'Luiza Pereira', 'feminino', 'indígena', NULL, '1973-04-25', '1988-06-05', TRUE, 1900.00, 'Rua André Carrazzoni', 1011, 'Liberdade', '12708521080'
    ),
    (
        '406615196', 'Beatriz Oliveira', 'feminino', 'amarelo', NULL, '1982-12-05', '1997-10-20', TRUE, 2500.00, 'Rua Hermes Cortes', 1314, 'Barroso', '68405324020'
    ),

(
    '464156506', 'João Silva', 'masculino', 'branco', NULL, '2009-01-05', '2023-03-08', TRUE, 2000.00, 'Rua Doutor Nilo Peçanha', 616, 'Centro', '05664923008'
),
(
    '110679854', 'Maria Oliveira', 'feminino', 'negro', NULL, '2011-07-10', '2025-09-15', TRUE, 1800.50, 'Rua Carlos Fagundes de Mello', 821, 'Vila Nova', '34325742077'
),
(
    '446440759', 'Pedro Santos', 'masculino', 'pardo', NULL, '2007-05-20', '2022-08-25', TRUE, 2200.00, 'Rua Engenheiro José M. Vianna', 789, 'Jardim', '54322451080'
),
(
    '124588232', 'Ana Pereira', 'feminino', 'indígena', NULL, '2010-11-15', '2024-12-20', TRUE, 1900.00, 'Rua André Carrazzoni', 1011, 'Liberdade', '31415955000'
),
(
    '290803329', 'Carlos Oliveira', 'masculino', 'amarelo', 'deficiência física', '2008-03-25', '2023-04-30', TRUE, 2500.00, 'Rua Hermes Cortes', 1314, 'Barroso', '29969474014'
);

-- Inserts correspondentes para a tabela telefone
INSERT INTO
    telefone (telefone, idCadastroGeral)
VALUES ('51983068938', 1),
    ('51985858789', 2),
    ('51989938787', 3),
    ('55993324539', 4),
    ('55981465171', 5),
    ('55989421581', 6),
    ('51988530261', 7),
    ('55988287013', 8),
    ('51997572981', 9),
    ('51995510332', 10);

-- Inserts para a tabela CadastroMae
INSERT INTO
    CadastroMae (
        nis, recebeBolsaFamilia, trabalhaFora, responsavelEnquantoFora, participarProjetoCulinaria, participarProjetoCostura, qtdFilhos, idCadastroGeral
    )
VALUES (
        '123456789', TRUE, TRUE, 'Vizinha', TRUE, FALSE, 2, 1
    ),
    (
        '987654321', FALSE, FALSE, NULL, FALSE, TRUE, 1, 2
    ),
    (
        '456789123', TRUE, FALSE, NULL, TRUE, FALSE, 3, 3
    ),
    (
        '789123456', TRUE, TRUE, 'Avó', FALSE, TRUE, 2, 4
    ),
    (
        '654321987', FALSE, TRUE, 'Tia', TRUE, TRUE, 1, 5
    );

-- Inserts para a tabela CadastroAluno
INSERT INTO
    CadastroAluno (
        anoEscolar, alfabetizado, irmaoInstituicao, escola, nomeResponsavel, parentescoResponsavel, autorizaCadastroNotaFiscalGaucha, tipoResidencia, numeroPecas, possuiBanheiro, possuiAgua, possuiLuz, idCadastroGeral
    )
VALUES (
        '6º ano', TRUE, 'Carlos Oliveira', 'Escola Estadual Dom Pedro II', 'Maria Silva', 'Mãe', TRUE, 'Casa', 4, TRUE, TRUE, TRUE, 6
    ),
    (
        '2º ano', TRUE, 'Pedro Santos', 'Escola Estadual Santa Clara', 'José Oliveira', 'Pai', FALSE, 'Apartamento', 4, TRUE, TRUE, TRUE, 7
    ),
    (
        '8º ano', TRUE, 'Maria Oliveira', 'Instituto de Educação Albert Einstein', 'Carla Santos', 'Mãe', TRUE, 'Casa', 5, TRUE, TRUE, TRUE, 8
    ),
    (
        '5º ano', TRUE, 'Pedro Santos', 'Escola Municipal Professora Maria da Silva', 'Luiz Pereira', 'Pai', TRUE, 'Casa', 3, TRUE, TRUE, TRUE, 9
    ),
    (
        '3º ano', TRUE, 'João Silva', 'Escola Municipal São João Batista', 'Beatriz Oliveira', 'Mãe', TRUE, 'Casa', 4, TRUE, TRUE, TRUE, 10
    );

-- Inserts para a tabela MaeAluno
INSERT INTO
    MaeAluno (
        idCadastroAluno, idCadastroMae
    )
VALUES (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);

-- Inserts para a tabela AutorizadosAluno
INSERT INTO
    AutorizadosAluno (
        cpfAutorizado, nomeAutorizado, idCadastroAluno
    )
VALUES (
        '12345678900', 'Carlos Silva', 1
    ),
    (
        '98765432100', 'Juliana Oliveira', 2
    ),
    (
        '45612378900', 'Fernanda Santos', 3
    ),
    (
        '32178965400', 'Pedro Pereira', 4
    ),
    (
        '65498732100', 'Mariana Oliveira', 5
    );

-- Inserts para a tabela Turmas
INSERT INTO
    Turmas (
        ano, turno, idade, escola, alfabetizado, anoEscolar, bairro, idCadastroAluno
    )
VALUES (
        '2024', 'Manhã', 15, 'Escola Municipal Dom Pedro II', TRUE, '3º ano', 'Centro', 1
    ),
    (
        '2024', 'Tarde', 12, 'Colégio Santa Clara', TRUE, '4º ano', 'Vila Nova', 2
    ),
    (
        '2024', 'Manhã', 16, 'Instituto de Educação Albert Einstein', TRUE, '5º ano', 'Jardim', 3
    ),
    (
        '2024', 'Tarde', 13, 'Escola Municipal Professora Maria da Silva', TRUE, '3º ano', 'Liberdade', 4
    ),
    (
        '2024', 'Manhã', 16, 'Colégio São João Batista', TRUE, '4º ano', 'Barroso', 5
    );