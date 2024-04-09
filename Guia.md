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