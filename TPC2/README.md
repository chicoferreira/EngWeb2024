# TPC2 - Mapa virtual num servidor de ficheiros

2024-02-23

## Autor

- A100660
- Francisco Macedo Ferreira

## Resumo

Neste trabalho, utilizou-se o JSON [mapa-virtual.json](./mapa-virtual.json) fornecido pelo docente com informação de
cidades e
as suas ligações, para produzir um website onde se pode consultar e navegar nesta estrutura.

O site apresenta uma página principal com a lista de todas as cidades.
Clicando numa cidade, acede-se à página individual da cidade onde se pode consultar a informação sobre ela
(população, distrito e descrição) e as cidades vizinhas.
As cidades vizinhas são apresentadas numa lista, que mostra o nome da cidade e a distância a ela.

Os HTMLs gerados devem ser colocados num servidor de ficheiros para serem acedidos. Ou seja, o servidor
deve disponibilizar a página principal no endpoint `/` e as páginas individuais das cidades no
endpoint `/c{id-da-cidade}`.

## Resultados

As páginas podem ser geradas rodando o comando:

```
$ python3 generator.py
```

Este comando gera os HTMLs a partir dos que estão na pasta [template](./template) e coloca-os na pasta `./generated`.

O servidor de ficheiros pode ser iniciado com o comando:

```
$ node server.js
```

Este comando inicia um servidor de páginas web na porta 7777, que disponibiliza os HTMLs gerados.

### Imagens

#### /
![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/9b6af96f-35e5-4cc7-bf98-416c951d91cb)
#### /c1
![image](https://github.com/chicoferreira/EngWeb2024/assets/36338391/a1e5e347-8bd8-42ae-8466-0a717f1e40af)
