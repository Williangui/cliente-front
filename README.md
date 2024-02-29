# Projeto Para cadastro de clientes

Este projeto é um exemplo de uma aplicação Spring Boot que utiliza Docker para o ambiente de desenvolvimento e execução. Ele inclui uma configuração do Docker Compose para o banco de dados PostgreSQL e um Dockerfile para empacotar a aplicação Spring Boot.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

- Docker instalado
- Node.js 18.16.0 >  instalado
- Angular CLI 13.0.0 instalado

## Configuração e Execução

### Utilizando Docker Compose


1. Execute o docker na sua maquina;

2. Abra o terminal na pasta do projeto;

3. No terminal, execute o Docker Compose para criar e iniciar os containers:

   ```bash
   docker-compose up
   ```

4. A aplicação estará disponível em `http://localhost:4200`.

5. Para encerrar a execução dos containers, pressione `Ctrl + C` no terminal e execute:

   ```bash
   docker-compose down
   ```

### Subindo a aplicação usando o Angular CLI:

1. Abra o terminal na pasta do projeto.

2. Execute o comando npm install.

3. Execute o comando ng serve.

4. A aplicação estará disponível em `http://localhost:4200`.

### Comandos úteis:

  ng serve: Inicia a aplicação Angular em modo de desenvolvimento.
  docker-compose up -d: Inicia o container da aplicação em segundo plano.
  docker ps: Lista os containers em execução.
  docker logs app: Mostra os logs da aplicação em execução no container.
  docker stop app: Para o container da aplicação.
  docker rm app: Remove o container da aplicação.

## Configurações Adicionais

Para configurar parâmetros adicionais, como variáveis de ambiente, consulte o arquivo `docker-compose.yml` e o arquivo `Dockerfile` no diretório raiz do projeto.
