# Busca ao café perfeito

### Esse é um simples sistema para cadastrar o café diário e as pessoas que tomaram possam avaliar. 
A cada dia, avaliamos as notas e fazemos variações dos ingredientes, em busca de alcançar o **Café Perfeito**.

### Requisitos:
- Docker instalado

### Comandos:

1. Acesse a pasta ```./api```;
2. Crie o arquivo ```.env``` com as informações do arquivo ```.env.example```;
3. Execute o seguinte comando:

- Linux:
```shell
sudo docker compose up -d --build
```

- Windows:
```shell
docker-compose up -d --build
```

4. Acesse a pasta ```./frontend```;
5. Edite o arquivo ```src/config/axios.ts``` para seu ip e a porta que irá rodar a api;
6. Execute o seguinte comando:

- Linux:
```shell
sudo docker compose up -d --build
```

- Windows:
```shell
docker-compose up -d --build
```
