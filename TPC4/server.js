const http = require("http");
const axios = require("axios");
const {parse} = require("querystring");

function renderMainPage() {
    return `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Website</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
<div class="w3-container w3-teal">
    <h2><a href="/" style="text-decoration: none">Plataforma de Compositores</a></h2>
</div>
<div class="w3-container">
    <p>
        <a href="/compositores">Compositores</a>
    </p>
    <p>
        <a href="/periodos">Períodos</a>
    </p>
</div>
<footer class="w3-container w3-teal">
    <p>EngWeb2024</p>
</footer>
</body>
`
}

function renderComposersPage(composers) {
    const composersHtml = composers.map(composer =>
        `
        <li>
            <a href="/compositores/${composer.id}">${composer.nome}</a>
        </li>
        `).join("");
    return `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Compositores</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
<div class="w3-container w3-teal">
    <h2><a href="/" style="text-decoration: none">Plataforma de Compositores</a></h2>
</div>
<div class="w3-container">
    <h2>Compositores</h2>
    <a href="/compositores/novo"><button>Novo +</button></a>
    <ul>
        ${composersHtml}
    </ul>
</div>

<footer class="w3-container w3-teal">
    <p>EngWeb2024</p>
</footer>
</body>
`;
}

function renderComposerPage(composer) {
    return `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>${composer.nome}</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
<div class="w3-container w3-teal">
    <h2><a href="/" style="text-decoration: none">Plataforma de Compositores</a></h2>
</div>
<div class="w3-container">
    <h2>${composer.nome}</h2>
    <p>
        <b>Nome:</b> ${composer.nome}
    </p>
    <p>
        <b>Período:</b> <a href="/periodos/${composer.periodo}">${composer.periodo}</a>
    </p>
    <p>
        <b>Data de Nascimento:</b> ${composer.dataNasc}
    </p>
    <p>
        <b>Data de Óbito:</b> ${composer.dataObito}
    </p>
    <p>
        <b>Biografia:</b> ${composer.bio}
    </p>
</div>
<div class="w3-container">
    <a href="/compositores/editar/${composer.id}">Editar</a>
    <a href="/compositores/apagar/${composer.id}">Apagar</a>
</div>
<footer class="w3-container w3-teal">
    <p>EngWeb2024</p>
</footer>
</body>
`;
}

function renderPeriodsPage(periods) {
    const periodsHtml = periods.map(period =>
        `
        <li>
            <a href="/periodos/${period}">${period}</a>
        </li>
        `).join("");
    return `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Períodos</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
<div class="w3-container w3-teal">
    <h2><a href="/" style="text-decoration: none">Plataforma de Compositores</a></h2>
</div>
<div class="w3-container">
    <h2>Períodos</h2>
    <ul>
        ${periodsHtml}
    </ul>
</div>
<footer class="w3-container w3-teal">
    <p>EngWeb2024</p>
</footer>
</body>
`;
}

function renderPeriodPage(period, composers) {
    const composersHtml = composers.map(composer =>
        `
        <li>
            <a href="/compositores/${composer.id}">${composer.nome}</a>
        </li>
        `).join("");
    return `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>${period}</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
<div class="w3-container w3-teal">
    <h2><a href="/" style="text-decoration: none">Plataforma de Compositores</a></h2>
</div>
<div class="w3-container">
    <h2>Lista de Compositores no Período ${period}</h2>
    <ul>
        ${composersHtml}
    </ul>
</div>
<footer class="w3-container w3-teal">
    <p>EngWeb2024</p>
</footer>
</body>
`;
}

function renderComposerEditPage(composer) {
    return `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Editar Compositor</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
<div class="w3-container w3-teal">
    <h2><a href="/" style="text-decoration: none">Plataforma de Compositores</a></h2>
</div>
<div class="w3-container">
    <h2>Editar Compositor</h2>
    <form action="/compositores/editar/${composer.id}" method="post">
        <p>
            <label for="nome">ID:</label>
            <input type="text" id="id" name="id" value="${composer.id}" readonly>
        </p>
        <p>
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value="${composer.nome}">
        </p>
        <p>
            <label for="periodo">Período:</label>
            <input type="text" id="periodo" name="periodo" value="${composer.periodo}">
        </p>
        <p>
            <label for="dataNasc">Data de Nascimento:</label>
            <input type="date" id="dataNasc" name="dataNasc" value="${composer.dataNasc}">
        </p>
        <p>
            <label for="dataObito">Data de Óbito:</label>
            <input type="date" id="dataObito" name="dataObito" value="${composer.dataObito}">
        </p>
        <p>
            <label for="bio">Biografia:</label>
            <textarea id="bio" name="bio">${composer.bio}</textarea>
        </p>
        <p>
            <button type="submit">Confirmar</button>
        </p>
    </form>
</div>
<footer class="w3-container w3-teal">
    <p>EngWeb2024</p>
</footer>
</body>
`
}

function renderNewComposerPage() {
    return `
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Novo Compositor</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
<div class="w3-container w3-teal">
    <h2><a href="/" style="text-decoration: none">Plataforma de Compositores</a></h2>
</div>
<div class="w3-container">
    <h2>Novo Compositor</h2>
    <form action="/compositores/novo" method="post">
        <p>
            <label for="nome">ID:</label>
            <input type="text" id="id" name="id">
        </p>
        <p>
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome">
        </p>
        <p>
            <label for="periodo">Período:</label>
            <input type="text" id="periodo" name="periodo">
        </p>
        <p>
            <label for="dataNasc">Data de Nascimento:</label>
            <input type="date" id="dataNasc" name="dataNasc">
        </p>
        <p>
            <label for="dataObito">Data de Óbito:</label>
            <input type="date" id="dataObito" name="dataObito">
        </p>
        <p>
            <label for="bio">Biografia:</label>
            <textarea id="bio" name="bio"></textarea>
        </p>
        <p>
            <button type="submit">Criar</button>
        </p>
    </form>
</div>
<footer class="w3-container w3-teal">
    <p>EngWeb2024</p>
</footer>
`;
}

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(renderMainPage());
    } else if (req.method === "GET" && req.url === "/compositores") {
        axios.get("http://localhost:3000/compositores")
            .then(response => {
                const composers = response.data;
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(renderComposersPage(composers));
            })
            .catch(err => {
                res.writeHead(500, {"Content-Type": "text/html"});
                res.end("Error fetching composers");
            });
    } else if (req.method === "GET" && req.url === "/compositores/novo") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(renderNewComposerPage());
    } else if (req.method === "GET" && req.url.startsWith("/compositores/apagar/")) {
        const id = req.url.split("/")[3];
        axios.delete("http://localhost:3000/compositores/" + id)
            .then(response => {
                res.writeHead(302, {"Location": "/compositores"});
                res.end();
            })
            .catch(err => {
                console.log(err)
                res.writeHead(500, {"Content-Type": "text/html"});
                res.end("Error deleting composer");
            });
    } else if (req.method === "GET" && req.url.startsWith("/compositores/editar/")) {
        const id = req.url.split("/")[3];
        axios.get("http://localhost:3000/compositores/" + id)
            .then(response => {
                const composer = response.data;
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(renderComposerEditPage(composer));
            })
            .catch(err => {
                res.writeHead(500, {"Content-Type": "text/html"});
                res.end("Error fetching composer");
            });
    } else if (req.method === "GET" && req.url.startsWith("/compositores/")) {
        axios.get("http://localhost:3000" + req.url)
            .then(response => {
                const composer = response.data;
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(renderComposerPage(composer));
            })
            .catch(err => {
                console.log(err)
                res.writeHead(500, {"Content-Type": "text/html"});
                res.end("Error fetching composer");
            });
    } else if (req.method === "GET" && req.url === "/periodos") {
        axios.get("http://localhost:3000/compositores")
            .then(response => {
                const periods = response.data.map(composer => composer.periodo)
                    .filter((value, index, self) => self.indexOf(value) === index);
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(renderPeriodsPage(periods));
            })
            .catch(err => {
                res.writeHead(500, {"Content-Type": "text/html"});
                res.end("Error fetching periods");
            });
    } else if (req.method === "GET" && req.url.startsWith("/periodos/")) {
        const period = req.url.split("/")[2];
        axios.get("http://localhost:3000/compositores?periodo=" + period)
            .then(response => {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(renderPeriodPage(period, response.data));
            })
            .catch(err => {
                res.writeHead(500, {"Content-Type": "text/html"});
                res.end("Error fetching composers");
            });
    } else if (req.method === "POST" && req.url === "/compositores/novo") {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const data = parse(body);

            axios.post("http://localhost:3000/compositores", data)
                .then(response => {
                    res.writeHead(302, {"Location": "/compositores/" + data.id});
                    res.end();
                })
                .catch(err => {
                    res.writeHead(500, {"Content-Type": "text/html"});
                    res.end("Error creating composer");
                });
        });
    } else if (req.method === "POST" && req.url.startsWith("/compositores/editar/")) {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const data = parse(body);
            const id = req.url.split("/")[3];

            axios.put("http://localhost:3000/compositores/" + id, data)
                .then(response => {
                    res.writeHead(302, {"Location": "/compositores/" + id});
                    res.end();
                })
                .catch(err => {
                    res.writeHead(500, {"Content-Type": "text/html"});
                    res.end("Error updating composer");
                });
        });
    } else {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("Page not found");
    }
});

server.listen(3333, () => console.log("Server running on port 3333"));