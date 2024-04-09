# Express

### Criar um projeto Express

```bash
$ npx express-generator <aplicação>
$ npx express-generator --view=pug <aplicação>
$ npx express-generator --no-view <aplicação>
```

### Instalar o Mongoose

```bash
$ npm install mongoose
```

### Instalar as dependências

```bash
$ npm install
```

### Iniciar o servidor

```bash
$ npm start
```

### Código para conectar ao MongoDB

```javascript
var mongoDB = 'mongodb://127.0.0.1/<DATABASE>';
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB'));
db.once('open', () => {
    console.log('Conexão ao MongoDB realizada com sucesso');
});
```

# Python

### Requests para importar _dataset_

```python
import json

import requests

file = "dataset.json"

with open(file) as f:
    data = json.load(f)
    for pessoa in data["pessoas"]:
        requests.post("http://localhost:3000/", json=pessoa)
```

# Docker

### Exemplo de Docker Container para o MongoDB com import de _dataset_

```dockerfile
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    depends_on:
      - mongo-seed
  mongo-seed:
    image: mongo:latest
    volumes:
      - ./dataset.json:/dataset.json
    command: mongoimport --host mongodb -d <DATABASE> -c <COLLECTION> --type json --file dataset.json --jsonArray
```

# Javascript (NodeJS)

### Exemplo de data em string

```js
var date = new Date().toISOString().substring(0, 16);
```

### Fazer pedidos HTTP a servidores REST

#### Instalar o Axios

```bash
$ npm install axios
```

#### Exemplo de pedido GET

```javascript
const axios = require('axios');

axios.get('http://localhost:3000/')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
```

#### Exemplo de pedido POST

```javascript
const axios = require('axios');

const content = req.body;

axios.post('http://localhost:3000/', content)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });
```


# HTML + CSS

### Exemplo layout

#### HTML

```html
<!DOCTYPE html>
<html lang="pt">
<head>
    <title>Título da página</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <meta charset="UTF-8">
</head>
<body>
<header class="w3-container w3-teal">
    <h1><a href="/" style="text-decoration: none">Meu Site</a></h1>
</header>
...
<footer class="w3-container w3-teal">
    <p>Footer</p>
</footer>
</body>
</html>
```

#### Pug

```jade
doctype html
html
    head
        title= "Título da página"
        link(rel='stylesheet', href='https://www.w3schools.com/w3css/4/w3.css')
    body
        header(class='w3-container w3-teal')
            h1
                a(href="/" style="text-decoration: none;") Meu Site
        block content
        footer(class='w3-container w3-teal')
            p Footer
```

### Exemplo tabela de utilizadores

#### Pug

```jade
extends layout

block content
    a(href="/novo")
        button Adicionar
    .w3-container
        table.w3-table-all
            thead
                tr
                    th BI
                    th Nome
                    th Idade
                    th Sexo
                    th Ações
            tbody
                each pessoa in pessoas
                    tr
                        td
                            a(href='/pessoa/' + pessoa._id)= pessoa._id
                        td= pessoa._id
                        td= pessoa.nome
                        td= pessoa.idade
                        td= pessoa.sexo
                        td
                            a.w3-button.w3-blue(href='/pessoa/editar/' + pessoa._id) Editar
                            a.w3-button.w3-red(href='/pessoa/apagar/' + pessoa._id) Apagar

```
