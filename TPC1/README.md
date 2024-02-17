# TPC1: Mapa das Ruas de Braga
2024-02-04

## Autor
- A100660
- Francisco Macedo Ferreira

## Resumo

Neste trabalho, utilizou-se o material fornecido pelo docente, ficheiros XML com informação de 60 ruas de Braga, fotos atuais (associadas a uma determinada vista) e fotos dos esquiços desenhados no séc. XVIII das mesmas ruas, para produzir um website onde se pode consultar e navegar nesta estrutura.

O site apresenta uma página principal com a lista de ruas ordenada alfabeticamente. 

Clicando numa das ruas, acede-se à página individual da rua onde se pode consultar toda a informação. Nesta página há também um link para regressa à página principal.

# Resultados

A página principal está disponível em [index.html](./index.html). O resto das páginas das ruas pode ser gerada rodando os comandos:

```
$ cd TPC1
$ ./download_dataset.sh
$ python3 generate.py
```

Estes comandos também geram o index.html.

## Imagens

<img width="1502" alt="image" src="https://github.com/chicoferreira/EngWeb2024/assets/36338391/0fe3513a-b328-48af-89ec-e7a48d4e3560">
<img width="1507" alt="image" src="https://github.com/chicoferreira/EngWeb2024/assets/36338391/8120f583-91f3-4253-9c75-70e109a3e6b9">
