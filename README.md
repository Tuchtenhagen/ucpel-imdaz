# Requisitos

* Ter MySQL instalado na máquina. [clique aqui para instalar](https://dev.mysql.com/downloads/installer/)
* Ter Node instalado na máquina. [clique aqui para instalar](https://nodejs.org/en/download/prebuilt-installer)

# Como executar o projeto

### Definindo o banco de dados

1. Executar, diretamente no banco de dados, os comandos SQL que estão no arquivo ``src/migrations/001.do.create-database.sql``
2. Executar, diretamente no banco de dados, os comandos SQL que estão no arquivo ``src/migrations/002.do.insert-data.sql``

### Executando a api

Executar o seguinte comando para instalar as depedencias do projeto:

  ```bash
  > npm install
  ```

  Executar o seguinte comando para rodar a API localmente:

  ```bash
  > npm run start
  ```

### Collection para testar a API

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=imdaz_collection&uri=https%3A%2F%2Fraw.githubusercontent.com%2FTuchtenhagen%2Fucpel-imdaz%2Fmain%2FInsomnia_collection_imdaz.json)
