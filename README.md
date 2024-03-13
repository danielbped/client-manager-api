# Client Manager

Trata-se da API de uma aplicação de gestão de clientes, sendo possível visualizar e adicionar novos clientes, também como filtrar por nome ou e-mail, e visualizar a melhor rota para abordagem dos clientes com relação às coordenadas X e Y, tendo a empresa como marco (0, 0). A API conta com rotas de Login, busca por todos os clientes e usuários, criação de um novo cliente e usuário, busca por clientes e usuários a partir de uma query, podendo ser nome ou e-mail, e busca por clientes ordenando pela ordem de rotas ideal para abordagem.

# Sumário
- [Tecnologias utilizadas](#tecnologias)
- [Instruções para rodar o projeto](#instrucoes)
- [REST API](#rest-api)
  - [Users](#user)
    - [POST /user/login](#post-login)
    - [GET /user](#get-user)
    - [GET /user/:query](#get-user-query)
    - [POST /user](#post-user)
  - [Clients](#clients)
    - [GET /client](#get-client)
    - [GET /client/:query](#get-client-query)
    - [POST /client](#post-client)
    - [GET /client/route](#get-client-route)


## Tecnologias utilizadas <a name="tecnologias"></a>
- [**Node JS**](https://nodejs.org/en/)
- [**Express**](https://expressjs.com/pt-br/)
- [**PostgreSQL**](https://www.postgresql.org/)
- [**Https Status Code**](https://www.npmjs.com/package/http-status-codes)
- [**dotenv**](https://www.npmjs.com/package/dotenv)
- [**Body Parser**](https://www.npmjs.com/package/body-parser)
- [**Insomnia**](https://insomnia.rest/download)
- [**TypeScript**](https://www.typescriptlang.org/)
- [**CORS**](https://github.com/expressjs/cors)
- [**UUID**](https://github.com/thenativeweb/uuidv4)

## Instruções para rodar o projeto <a name="instrucoes"></a>

### Será necessário ter instalado na sua máquina:
    Git
    Postman ou Insomnia
    PostgreSQL
    Node v20.11.1

  - Clone o repositório com o comando **git clone**:
  
      git clone git@github.com:danielbped/client-manager-api.git
  
  - Entre no diretório que acabou de criar:

        cd client-manager-api

  - Para o projeto funcionar na sua máquia, será necessário instalar suas dependências, para isso, utilize **npm install**:

        npm install

  ## .env
  - Na raiz do projeto, será necessário criar um arquivo **.env**, com as seguintes informações:

        DB_PASSWORD='alterar_para_sua_senha_do_banco_de_dados'
        DB_NAME='alterar_para_o_nome_do_seu_banco_de_dados'
        DB_HOST='alterar_para_o_host_do_seu_banco_de_dados'
        DB_USERNAME='alterar_para_o_nome_do_seu_usuario_do_banco_de_dados'
        ADMIN_PASSWORD='senha_padrao_para_o_admin'
        ADMIN_EMAIL='email_padrao_para_o_admin'
  
  > ⚠️ Lembre de trocar os dados para os dados do seu banco de dados ⚠️
  > ⚠️ Por padrão será criado um usuário Admin com o e-mail e senha fornecidos em ADMIN_EMAIL e ADMIN_PASSWORD, respectivamente ⚠️

  - Pronto, agora o projeto está pronto para ser rodado localmente, utilizando o comando **npm start**:

        npm start

  > ⚠️ A aplicação, por definição, estará rodando na porta 3000 ⚠️

# REST API <a name="rest-api"></a>

## Users <a name="user"></a>
### POST /user/login <a name="post-login"></a>

### Request
- Para realizar o login, o corpo da requisição deve ser no formato **JSON**, no seguinte modelo:

        {
          "email": "admin@email.com",
          "password": "S3NH4_F0RT3",
        }

### Response
 - Caso a senha esteja correta e o e-mail tenha sido cadastrado, a esposta será **true**, com um status 200 (**OK**):

- Caso contrário, a resposta será **false**, com um status 404 (**NOT FOUND**)


### GET /user <a name="get-user"></a>

### Request
- Para realizar a requisição, não será necessário um corpo, então a resposta terá o status **200** com o seguinte formato:

### Response
    {
      "result": [
        {
          "id": "c6dcbc9e-d7b1-45cf-b77f-91b838b461cf",
          "name": "Admin",
          "email": "admin@email.com",
        },
      ],
      "count": 1  
    }

### GET /user/:query <a name="get-user-query"></a>

### Request
- Para realizar a requisição, não será necessário um corpo, mas sim uma query contendo o nome ou e-mail desejado, então a resposta terá o status **200** com o seguinte formato:

### Response
    {
      "result": [
        {
          "id": "c6dcbc9e-d7b1-45cf-b77f-91b838b461cf",
          "name": "Admin",
          "email": "admin@email.com",
        },
      ],
      "count": 1  
    }

### POST /user <a name="post-user"></a>

### Request
- Para realizar o login, o corpo da requisição deve ser no formato **JSON**, no seguinte modelo:

        {
          "name": "Teste",
          "email": "teste@email.com",
          "password": "super_senha",
        }

### Response

- Caso esteja tudo certo, e o e-mail já não esteja em uso, a resposta terá o status **201 (CREATED)**, com o seguinte formato:

      {
        "name": "Teste",
        "email": "testse@email.com"
      }

- Caso o e-mail já esteja em uso, a resposta terá o status **500 (INTERNAL SERVER ERROR)**, com a seguinte mensagem:

      {
        "message": "Email already in use"
      }

## Clients <a name="clients"></a>

### GET /client <a name="get-client"></a>

### Request
- Para realizar a requisição, não será necessário um corpo, então a resposta terá o status **200** com o seguinte formato:

### Response
    {
      "result": [
        {
          "id": "54127583-2447-4013-9b7a-49800a69f4d6",
          "name": "Daniel Batista Pedrosa",
          "email": "client2@gmail.com",
          "phone": "+99999999999",
          "coordinate": "1.5"
        },
        {
          "id": "6dbdaa73-944f-4afc-b1d3-c2b64b025c6d",
          "name": "Teste",
          "email": "teste@teste.com",
          "phone": "+5599999999999",
          "coordinate": "0.8"
        },
        {
          "id": "4475aa96-1b6f-4ed5-9de5-71ce5cd98c04",
          "name": "Teste 2",
          "email": "teste2@teste.com",
          "phone": "+5599999999999",
          "coordinate": "0.-7"
        }
      ],
      "count": 3
    }

### GET /client/:query <a name="get-client-query"></a>

### Request
- Para realizar a requisição, não será necessário um corpo, mas sim uma query contendo o nome ou e-mail desejado, então a resposta terá o status **200** com o seguinte formato:

### Response
    {
      "result": [
        {
          "id": "54127583-2447-4013-9b7a-49800a69f4d6",
          "name": "Daniel Batista Pedrosa",
          "email": "client2@gmail.com",
          "phone": "82998019633",
          "coordinate": "1.5"
        },
      ],
      "count": 1  
    }

### POST /client <a name="post-client"></a>

### Request
- Para realizar o login, o corpo da requisição deve ser no formato **JSON**, no seguinte modelo:

        {
          "email": "teste-client@email.com",
          "phone": "+99999999999",
          "name": "Teste Client",
          "coordinate": "5.2"
        }

### Response

- Caso esteja tudo certo, e o e-mail já não esteja em uso, a resposta terá o status **201 (CREATED)**, com o seguinte formato:

      {
        "name": "Teste Client",
        "email": "teste-client@email.com",
        "phone": "+99999999999",
        "coordinate": "5.2"
      }

- Caso o e-mail já esteja em uso, a resposta terá o status **500 (INTERNAL SERVER ERROR)**, com a seguinte mensagem:

      {
        "message": "Email already in use"
      }


### GET /client/route <a name="get-client-route"></a>

### Request
- Para realizar a requisição, não será necessário um corpo, mas sim uma query contendo o nome ou e-mail desejado, então a resposta terá o status **200** com o seguinte formato, em ordem decrescente em relação às coordenadas, iniciando e finalizando na empresa **Company no marco (0, 0)**:

### Response
    {
      "result": [
        {
          "name": "Company",
          "email": "company@email.com",
          "phone": "123456789",
          "id": "4005625e-ea86-466a-b2fd-875050be3086",
          "coordinate": "0.0"
        },
        {
          "id": "4475aa96-1b6f-4ed5-9de5-71ce5cd98c04",
          "name": "Teste 2",
          "email": "teste2@teste.com",
          "phone": "+5599999999999",
          "coordinate": "0.-7"
        },
        {
          "id": "6dbdaa73-944f-4afc-b1d3-c2b64b025c6d",
          "name": "Teste",
          "email": "teste@teste.com",
          "phone": "+5599999999999",
          "coordinate": "0.8"
        },
        {
          "id": "54127583-2447-4013-9b7a-49800a69f4d6",
          "name": "Daniel Batista Pedrosa",
          "email": "client2@gmail.com",
          "phone": "+99999999999",
          "coordinate": "1.5"
        },
        {
          "name": "Company",
          "email": "company@email.com",
          "phone": "123456789",
          "id": "4005625e-ea86-466a-b2fd-875050be3086",
          "coordinate": "0.0"
        },
      ],
      "count": 3
    }