CREATE DATABASE imdaz;

CREATE TABLE CadastroGeral (
    id INT PRIMARY KEY AUTO_INCREMENT, rg VARCHAR(25), nome VARCHAR(100), genero enum(
        'masculino', 'feminino', 'não informado'
    ), etnia VARCHAR(25), tipoDeficiencia VARCHAR(25), dataNascimento DATE, dataEmissaoRg DATE, direitoImagem BOOLEAN, rendaFamiliarMensal DECIMAL(8, 2), rua VARCHAR(100), numero INT, bairro VARCHAR(25), cpf VARCHAR(25)
);

CREATE TABLE telefone (
    id INT PRIMARY KEY AUTO_INCREMENT, telefone VARCHAR(25), idCadastroGeral INT
);

CREATE TABLE CadastroAluno (
    id INT PRIMARY KEY AUTO_INCREMENT, anoEscolar VARCHAR(25), alfabetizado BOOLEAN, irmaoInstituicao VARCHAR(1000), escola VARCHAR(100), nomeResponsavel VARCHAR(100), parentescoResponsavel VARCHAR(25), autorizaCadastroNotaFiscalGaucha BOOLEAN, tipoResidencia VARCHAR(100), numeroPecas INT, possuiBanheiro BOOLEAN, possuiAgua BOOLEAN, possuiLuz BOOLEAN, idCadastroGeral INT
);

CREATE TABLE CadastroMae (
    id INT PRIMARY KEY AUTO_INCREMENT, nis VARCHAR(100), recebeBolsaFamilia BOOLEAN, trabalhaFora BOOLEAN, responsavelEnquantoFora VARCHAR(100), participarProjetoCulinaria BOOLEAN, participarProjetoCostura BOOLEAN, qtdFilhos INT, idCadastroGeral INT
);

CREATE TABLE AutorizadosAluno (
    id INT PRIMARY KEY AUTO_INCREMENT, cpfAutorizado VARCHAR(25), nomeAutorizado VARCHAR(100), idCadastroAluno INT
);

CREATE TABLE Turmas (
    id INT PRIMARY KEY AUTO_INCREMENT, ano VARCHAR(25), turno VARCHAR(25), idade INT, escola VARCHAR(100), alfabetizado BOOLEAN, anoEscolar VARCHAR(25), bairro VARCHAR(25), idCadastroAluno INT
);

CREATE TABLE MaeAluno (
    id INT PRIMARY KEY AUTO_INCREMENT, idCadastroAluno INT, idCadastroMae INT
);

ALTER TABLE telefone
ADD FOREIGN KEY (idCadastroGeral) REFERENCES CadastroGeral (id);

ALTER TABLE CadastroAluno
ADD FOREIGN KEY (idCadastroGeral) REFERENCES CadastroGeral (id);

ALTER TABLE CadastroMae
ADD FOREIGN KEY (idCadastroGeral) REFERENCES CadastroGeral (id);

ALTER TABLE AutorizadosAluno
ADD FOREIGN KEY (idCadastroAluno) REFERENCES AutorizadosAluno (id);

ALTER TABLE Turmas
ADD FOREIGN KEY (idCadastroAluno) REFERENCES CadastroAluno (id);

ALTER TABLE MaeAluno
ADD FOREIGN KEY (idCadastroAluno) REFERENCES CadastroAluno (id);

ALTER TABLE MaeAluno
ADD FOREIGN KEY (idCadastroMae) REFERENCES CadastroMae (id);