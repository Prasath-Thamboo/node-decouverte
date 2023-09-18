//cas 1

const http = require('http');

//port passé en parametre node ou 9000 par defaut
const port = (process.argv[2] || process.env.PORT || 9000);

http.createServer((req, res) => {

    if (req.url.includes('favicon.ico')) {
        res.statusCode = 404;
        res.end('Not found favicon');
        return;
    }

    console.log(`requete url req.url = ${req.url}`)
    debugger;
    //paramètre passé en url par defaut "world"
    const nameArg = capitalize(req.url.replace(/[^\w.,-]/g, ' ').replace(/\s+/g, ' ').trim() || 'world');

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        data: `hello ${nameArg}`
    }));

}).listen(port);

console.log(`Server running at http://localhost:${port}/`);

//fonction en memoire utilisable dans l'appel de la requete
function capitalize(str) {
    return str
        .trim()
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

///cas 2 
// const http = require('http')
// const port = process.argv[2] || process.env.PORT || '8000'

// var functionCallback = function (req, res) {
//     const nameArg = capitalize(req.url.replace(/[^\w.,-]/g, ' ').replace(/\s+/g, ' ').trim() || 'world');
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({
//         data: `Hello ${nameArg}!`
//     }));
// }

// //http node créer un server 
// const server = http.createServer();
// server.on("request", functionCallback)
// server.listen(port);

// console.log(`Server running at http://localhost:${port}/`);

// function capitalize(str) {
//     return str
//         .trim()
//         .toLowerCase()
//         .split(' ')
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(' ');
// }