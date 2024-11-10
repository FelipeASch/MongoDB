# Sistema de Marketplace - Projeto Somativo
Este é um projeto de marketplace desenvolvido utilizando Express, Node.js, MongoDB e MongoDB Compass. O sistema permite que usuários se cadastrem, publiquem produtos para venda, comprem produtos, deixem avaliações e realizem transações. O banco de dados está estruturado em várias coleções, incluindo Usuários, Produtos, Categorias, Avaliações e Transações.

### Requisitos
**Node.js:** Para rodar o servidor e o backend do projeto.

**MongoDB:** Para armazenar os dados do sistema.

**MongoDB Compass:** Para visualizar e gerenciar os dados no MongoDB de forma gráfica.

### Passos para Instalação

* **Instalar Dependências**
Primeiro, clone o repositório do projeto ou faça o download dos arquivos. Em seguida, no diretório do projeto, instale as dependências com o seguinte comando:

**npm install**

Isso vai instalar as dependências necessárias, como express, mongoose, dotenv, e outras.

* **Configuração do Banco de Dados**
Certifique-se de que o MongoDB esteja instalado e em execução na sua máquina. Se estiver usando o MongoDB localmente, o padrão será mongodb://localhost:27017/somativa.

* **Configuração de Variáveis de Ambiente**
No diretório do projeto, crie um arquivo .env com a seguinte configuração para definir a string de conexão do MongoDB:

**MONGODB_URI=mongodb://localhost:27017/somativa**

Substitua a URL do banco de dados conforme necessário, caso esteja utilizando o MongoDB Atlas ou outro banco.


* **Popular o Banco de Dados**
Para popular o banco de dados com dados de exemplo (5 usuários, 5 produtos, 5 categorias, etc.), execute o seguinte comando para rodar o script de populações:

**node populate.js**

* **Visualizar Dados no MongoDB Compass**
Após iniciar o banco de dados e popular com os dados, você pode visualizar o banco de dados no MongoDB Compass.

Abra o MongoDB Compass.

Conecte-se à sua instância local (por padrão, mongodb://localhost:27017).

No painel de navegação, você verá o banco de dados somativa.

A partir daí, você pode visualizar as coleções e dados.

### Licença
Este projeto é de código aberto e está disponível sob a licença MIT.

