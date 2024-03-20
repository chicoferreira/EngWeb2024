# TPC6 - Compositores de Mùsica (Com Pug+Express+MongoDB)

2024-03-19

## Autor

- A100660
- Francisco Macedo Ferreira

## Resumo

O objetivo deste trabalho foi adaptar a solução do [TPC anterior](../TPC5) para também utilizar MongoDB em vez de
json-server.

Os endpoints são os mesmos e o design da aplicação mantem-se inalterado. Porém é necessário correr a
base de dados mongodb com recurso ao docker-compose (ver também [docker-compose.yml](docker-compose.yml)):

```bash
docker compose up -d
```

E deixa de ser necessário correr o json-server.