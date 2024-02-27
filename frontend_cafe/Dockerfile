# Use a imagem oficial do Apache como base
FROM httpd:2.4

# Copie o seu arquivo index.html para o diretório htdocs do Apache
COPY ./dist /usr/local/apache2/htdocs/

# Altere a configuração do Apache para direcionar todas as solicitações para o index.html
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf