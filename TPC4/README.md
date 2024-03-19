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

![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/7e116f24-3089-4862-869d-9439ea39db9e)

#### `GET /compositores` - Lista de todos os compositores

![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/dacfce92-311b-4d8f-bc27-361e3058b0a2)

#### `GET /compositores/{id-do-compositor}` - Página individual de um compositor

![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/ae34212b-3897-417b-8bca-d7cc7acdf8f6)

#### `GET /compositores/novo` - Página de criação de um compositor

![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/8399d60c-106c-4d8d-a3e1-73bbce157f23)

#### `POST /compositores/novo` - Adicionar um compositor

#### `GET /compositores/editar/{id-do-compositor}` - Página de edição de um compositor

![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/86b970ca-1629-4101-9dc2-3652b6ad919b)

#### `POST /compositores/editar/{id-do-compositor}` - Editar um compositor

#### `GET /compositores/apagar/{id-do-compositor}` - Apagar um compositor

#### `GET /periodos` - Lista de todos os períodos de música

![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/74099fd1-39cf-4e2d-b03b-131f5e8dfd12)

Os períodos são gerados a partir do conteúdo dos compositores.

#### `GET /periodos/{id-do-periodo}` - Página individual de um período

![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/6bbf2b34-d0c3-480b-854b-1a41cd8d6bbb)
> Lista de compositores modernos adicionados manualmente no [prepare-dataset.py](./prepare-dataset.py) como pedido no enunciado.

