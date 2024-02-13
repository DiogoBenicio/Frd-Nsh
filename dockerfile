# Imagem base do Node.js
FROM node:21.6.1

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de definição de pacotes para o diretório de trabalho
COPY package*.json ./

# Instala todas as dependências
RUN npm install

# Instala nodemon globalmente dentro do container
RUN npm install -g nodemon

# Copia o restante dos arquivos do projeto para o container
COPY . .

# Expõe a porta que o Express vai usar
EXPOSE 5000

# Comando para iniciar o servidor usando nodemon para desenvolvimento
CMD ["nodemon", "Server.js"]
