# Use a imagem Node.js 18 para construir a aplicação Vue.js
FROM node:18 as builder

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários para o container
COPY package.json yarn.lock ./

# Instale as dependências
RUN yarn install

# Copie o código fonte para o container
COPY . .

# Execute o comando de build
RUN yarn build

# Imagem de produção, utilizando o Apache
FROM httpd:2.4

# Copie os arquivos construídos da etapa anterior
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf
