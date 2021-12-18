const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;

let indexFile, contactFile;

const books = JSON.stringify([
    { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
]);

const authors = JSON.stringify([
    { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
    { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
]);

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    switch (req.url) {
        case "/":
            res.writeHead(200);
            res.end(indexFile);
            break
        case "/contact":
            res.writeHead(200);
            res.end(contactFile);
            break
        default:
            res.writeHead(404);
            res.end(JSON.stringify({error:"Resource not found"}));
    }
}

const server = http.createServer(requestListener);

fs.readFile("./index.html")
    .then(contents => {
        indexFile = contents;
        server.listen(port, host, () => {
            //console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
    });

fs.readFile("./contact.html")
    .then(contents => {
        contactFile = contents;
        server.listen(port, host, () => {
            //console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
    });
