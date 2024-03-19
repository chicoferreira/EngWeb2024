# TPC4 - Compositores de Música

2024-03-19

## Autor

- A100660
- Francisco Macedo Ferreira

## Resumo

Neste trabalho, utilizou-se o JSON [compositores.json](./compositores.json) fornecido pelo docente com informação de
compositores de música.
O objetivo foi criar um serviço web com CRUD sobre os compositores.

## Resultados

### Instruções

Preparar dataset:

```bash
$ python3 prepare_dataset.py
```

Iniciar json-server:

```bash
$ json-server --watch dataset.json
```

Iniciar servidor:

```bash
$ node server.js
```

### Endpoints

#### `GET /` - Selecionar entre compositores e períodos

#### `GET /compositores` - Lista de todos os compositores

#### `GET /compositores/{id-do-compositor}` - Página individual de um compositor

#### `GET /compositores/novo` - Página de criação de um compositor

#### `POST /compositores/novo` - Adicionar um compositor

#### `GET /compositores/editar/{id-do-compositor}` - Página de edição de um compositor

#### `POST /compositores/editar/{id-do-compositor}` - Editar um compositor

#### `GET /compositores/apagar/{id-do-compositor}` - Apagar um compositor

#### `GET /periodos` - Lista de todos os períodos de música

#### `GET /periodos/{id-do-periodo}` - Página individual de um período
