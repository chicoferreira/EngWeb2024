const http = require("http");
const axios = require("axios");
const fs = require("fs");

function render404Page(res) {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("404 Not Found");
    res.end();
}

function renderMainPage(res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(`
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Filmes</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
<div class="w3-container w3-teal">
    <h2><a href="/" style="text-decoration: none">Plataforma de filmes</a></h2>
</div>
<div class="w3-container">
    <p>
        <a href="/filmes">Filmes</a>
    </p>
    <p>
        <a href="/generos">Gêneros</a>
    </p>
    <p>
        <a href="/atores">Atores</a>
    </p>
</div>

</body>
</html>`)
}

function renderFilmsPage(res) {
    axios.get("http://localhost:3000/films")
        .then(response => {
            const filmesJson = response.data;

            const filesContent = filmesJson.map(filme =>
                `
                <li>
                    <a href="/filmes/${filme.id}">${filme.title}</a>
                </li>
                `);

            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(`
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Filmes</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
<div class="w3-container w3-teal">
    <h2><a href="/" style="text-decoration: none">Plataforma de filmes</a></h2>
</div>
<div class="w3-container">
    <h2>Filmes</h2>
    <ul>
        ${filesContent.join('')}
    </ul>
</div>

</body>
</html>`)
        })
        .catch(error => {
            console.error(error);
            render404Page(res);
        });
}

function renderFilmPage(res, id) {
    axios.get(`http://localhost:3000/films/${id}`)
        .then(response => {
            const filme = response.data;

            res.writeHead(200, {"Content-Type": "text/html"});

            const generos = filme.genres.map(genreId => axios.get(`http://localhost:3000/genres/${genreId}`)
                .then(response => `<li><a href="/generos/${genreId}">${response.data.name}</a></li>`)
                .catch(_error => `<li>Erro ao buscar o nome do género</li>`)
            );

            const atores = filme.cast.map(actorId => axios.get(`http://localhost:3000/actors/${actorId}`)
                .then(response => `<li><a href="/atores/${actorId}">${response.data.name}</a></li>`)
                .catch(_error => `<li>Erro ao buscar o nome do ator</li>`)
            );

            Promise.all(generos).then(generos => {
                Promise.all(atores).then(atores => {
                    res.end(`
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>${filme.title}</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
<div class="w3-container w3-teal">
    <h2><a href="/" style="text-decoration: none">Plataforma de filmes</a></h2>
</div>
<div class="w3-container">
    <h2>${filme.title}</h2>
    <p><b>Ano de lançamento:</b> ${filme.year}</p>
    <h3>Géneros</h3>
    <ul>
        ${generos.join('')}
    </ul>
    <h3>Atores</h3>
    <ul>
         ${atores.join('')}
    </ul>
</div>
</body>   
</html> 
`);
                })
            })
        })
        .catch(_error => {
            console.log(_error);
            render404Page(res);
        });
}

function renderGenresPage(res) {
    axios.get("http://localhost:3000/genres")
        .then(response => {
            const genresJson = response.data;

            const genresContent = genresJson.map(genre =>
                `
                <li>
                    <a href="/generos/${genre.id}">${genre.name}</a>
                </li>
                `);

            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(`
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Géneros</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
<div class="w3-container w3-teal">
    <h2><a href="/" style="text-decoration: none">Plataforma de filmes</a></h2>
</div>
<div class="w3-container">
    <h2>Géneros</h2>
    <ul>
        ${genresContent.join('')}
    </ul>
</div>
</body>
</html>`);
        })
        .catch(_error => {
            render404Page(res);
        });
}

function renderGenrePage(res, id) {
    axios.get(`http://localhost:3000/genres/${id}`)
        .then(response => {
            const genre = response.data;

            const moviesPromise = genre.movies.map(movieId => axios.get(`http://localhost:3000/films/${movieId}`)
                .then(response => `<li><a href="/filmes/${movieId}">${response.data.title}</a></li>`)
                .catch(_error => `<li>Erro ao buscar o nome do filme</li>`));

            Promise.all(moviesPromise).then(movies => {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(`
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>${genre.name}</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
<div class="w3-container w3-teal">
    <h2><a href="/" style="text-decoration: none">Plataforma de filmes</a></h2>
</div>
<div class="w3-container">
    <h2>${genre.name}</h2>
    <h3>Filmes de ${genre.name}</h3>
    <ul>
        ${movies.join('')}
    </ul>
</div>
</body>
</html>
`);
            });
        })
        .catch(_error => {
            render404Page(res);
        });
}

function renderActorsPage(res) {
    axios.get("http://localhost:3000/actors")
        .then(response => {
            const actorsJson = response.data;

            const actorsContent = actorsJson.map(actor =>
                `
                <li>
                    <a href="/atores/${actor.id}">${actor.name}</a>
                </li>
                `);

            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(`
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Atores</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
<div class="w3-container w3-teal">
    <h2><a href="/" style="text-decoration: none">Plataforma de filmes</a></h2>
</div>
<div class="w3-container">
    <h2>Atores</h2>
    <ul>
        ${actorsContent.join('')}
    </ul>
</div>
</body>
</html>
`);
        })
        .catch(_error => {
            render404Page(res);
        });
}

function renderActorPage(res, id) {
    axios.get(`http://localhost:3000/actors/${id}`)
        .then(response => {
            const actorJson = response.data;

            const moviesPromise = actorJson.present_in.map(movieId => axios.get(`http://localhost:3000/films/${movieId}`)
                .then(response => `<li><a href="/filmes/${movieId}">${response.data.title}</a></li>`)
                .catch(_error => `<li>Erro ao buscar o nome do filme</li>`));

            Promise.all(moviesPromise).then(movies => {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(`
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>${actorJson.name}</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>
<div class="w3-container w3-teal">
    <h2><a href="/" style="text-decoration: none">Plataforma de filmes</a></h2>
</div>
<div class="w3-container">
    <h2>${actorJson.name}</h2>
    <h3>Filmes em que ${actorJson.name} aparece</h3>
    <ul>
        ${movies.join('')}
    </ul>
</div>
</body>
</html>
`);
            });
        })
        .catch(_error => {
            render404Page(res);
        });
}

const routes = {
    "": renderMainPage, "/filmes": renderFilmsPage, "/generos": renderGenresPage, "/atores": renderActorsPage
};

http.createServer((req, res) => {
    const url = req.url.replace(/\/$/, "");
    const id = url.split('/')[2];

    if (routes[url]) {
        routes[url](res);
        return;
    }

    if (url.startsWith("/filmes/") && id) {
        renderFilmPage(res, id);
        return;
    }

    if (url.startsWith("/generos/") && id) {
        renderGenrePage(res, id);
        return;
    }

    if (url.startsWith("/atores/") && id) {
        renderActorPage(res, id);
        return;
    }

    render404Page(res);

}).listen(7777);