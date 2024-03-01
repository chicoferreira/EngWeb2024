# TPC3 - Serviço de filmes

2024-03-01

## Autor

- A100660
- Francisco Macedo Ferreira

## Resumo

Neste trabalho, utilizou-se o JSON [filmes.json](./filmes.json) fornecido pelo docente com informação de filmes.
O objetivo foi criar um serviço web que disponibiliza informação sobre os filmes.
Os filmes são fornecidos por um `json-server` ao servidor `node`.

## Resultados

### Instruções

Preparar dataset:

```bash
$ python3 prepare_dataset.py
```

Iniciar json-server:

```bash
$ json-server --watch filmes.json
```

Iniciar servidor:

```bash
$ node server.js
```

### Endpoints

#### `/` - Lista de todos os objetos

Apresenta uma lista de possíveis endpoints para aceder a informação sobre os filmes.

![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/73abdf76-5fd2-4bc5-94c6-79d91975744d)

#### `/filmes` - Lista de todos os filmes

Apresenta uma lista de todos os filmes, que, ao clicar num, redireciona para a página individual do filme.

![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/6847557a-7a2c-4cff-8275-c3b82392b0db)

#### `/filmes/{id-do-filme}` - Página individual de um filme

Apresenta a informação sobre um filme, como o título, ano, géneros e atores.

![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/59073a0c-37b7-47ef-b3a6-80ba801c8749)

#### `/generos` - Lista de todos os géneros de filmes

Apresenta uma lista de todos os géneros de filmes, que, ao clicar num, redireciona para a página individual do género.

![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/cdb1cda1-66fe-4db3-93b1-ea431521d939)

#### `/generos/{id-do-genero}` - Página individual de um género

Apresenta a informação de um genéro, como o nome e a lista de filmes desse género.

![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/b8270ed3-55c7-4169-9902-dbe0d3c5b8b3)

#### `/atores` - Lista de todos os atores

Apresenta uma lista de todos os atores, que, ao clicar num, redireciona para a página individual do ator.

![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/80af89a3-b4fd-40f0-85bd-2b75cf189c3d)

#### `/atores/{id-do-ator}` - Página individual de um ator

Apresenta a informação de um ator, como o nome e a lista de filmes em que participou.

![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/2d422c68-6538-4c7d-b386-6f39be5f8241)

