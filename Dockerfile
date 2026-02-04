# Usando uma versão recente do Node compatível com Angular 20
FROM node:22-alpine

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de configuração primeiro (otimiza o cache)
COPY package*.json ./

# Instala as dependências (incluindo o CLI do Angular)
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta padrão do Angular
EXPOSE 4200

# Comando para rodar a aplicação com hot-reload
CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]