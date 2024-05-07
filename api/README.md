# API para sistema de clínica

Uma API para gerenciamento de uma clínica, realizando atendimento, cadastramento de pacientes e profissionais e agendamento.

## Instalação

### - .env

- Replique o arquivo ```.env.example``` com o nome ```.env``` e altere as variáveis de acordo com o ambiente que você irá iniciar.

### - Docker

1. Certifique-se de que o docker está devidamente instalado e rodando na máquina.
2. Acesse pelo terminal a pasta do projeto e rode o seguinte comando:

- Linux:
```shell
$ sudo docker compose up -d --build
```

- Windows:
```shell
$ docker-compose up -d --build
```

**Obs:** O arquivo ```docker-compose.yml``` já está configurado para iniciar o banco de dados também, porém caso queira utilizar um banco que já existe,
remova o serviço e altere os dados de conexão no arquivo ```.env```.
