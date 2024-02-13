# Projeto Freedom

Este projeto consiste em uma aplicação full stack para gerenciamento de uma lista de desejos (wishlist), utilizando React para o frontend, Express para o backend e Elasticsearch como banco de dados.

## Estrutura do Projeto

- **Backend Express**: API RESTful para gerenciar a wishlist, incluindo adicionar e remover produtos, verificar produtos na lista e listar todos os produtos da wishlist.
- **Frontend React**: Interface de usuário para interagir com a lista de desejos, construída com React e otimizada com Vite.
- **Elasticsearch**: Banco de dados para armazenar e pesquisar produtos na wishlist.
- **Docker**: Configuração para orquestrar os serviços do projeto, incluindo o backend, frontend e o Elasticsearch.

## Pré-requisitos

- Docker e Docker Compose
- Node.js e npm (caso deseje rodar localmente sem Docker)

## Como Executar

1. **Usando Docker**

   - Certifique-se de que o Docker e o Docker Compose estejam instalados em seu sistema.
   - Clone este repositório e navegue até o diretório do projeto.
   - Execute o seguinte comando para iniciar todos os serviços:

     ```curl
     docker-compose up -d
     ```

   - Acesse o frontend em `http://localhost:3000` e o backend estará disponível em `http://localhost:5000`.

2. **Localmente (Desenvolvimento)**

   Para rodar o projeto localmente para desenvolvimento, você precisará iniciar o backend, frontend e Elasticsearch separadamente.

   **Backend:**
   - Navegue até o diretório do backend e instale as dependências:

     ```curl
     npm install
     ```

   - Inicie o servidor Express:

     ```curl
     npm run start-server
     ```

   **Frontend:**
   - Navegue até o diretório do frontend e instale as dependências:

     ```curl
     npm install
     ```

   - Inicie o servidor de desenvolvimento do Vite:

     ```curl
     npm run dev
     ```

   **Elasticsearch:**
   - Utilize uma instância local do Elasticsearch ou configure uma via Docker.

## Estrutura de Diretórios

- `./`: Diretório raiz contendo arquivos de configuração do Docker e Vite, além do `package.json`.
- `./Pages/`: Contém os componentes de página do React (`Home` e `Wishlist`).
- `./Components/`: Contém componentes React reutilizáveis, como `Header` e `ProductCard`.

## Tecnologias Utilizadas

- **Frontend**: React, @mui/material, @emotion/react
- **Backend**: Express, axios, @elastic/elasticsearch
- **Banco de Dados**: Elasticsearch
- **Orquestração**: Docker, Docker Compose
- **Ferramentas de Desenvolvimento**: ESLint, Vite, nodemon

## Contribuindo

Para contribuir com o projeto, considere seguir estas etapas:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`).
3. Faça commit de suas mudanças (`git commit -m 'Add some AmazingFeature'`).
4. Faça push para a branch (`git push origin feature/AmazingFeature`).
5. Abra um Pull Request.

## Licença

Este projeto é distribuído sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
