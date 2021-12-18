const express = require('express');
const {promises: fs} = require("fs");

const app = express();
const port = process.env.PORT || 8000;

let indexFile = null, contactFile = null;

const logServer = () => {
    console.log('Server app listening on port ' + port);
}

const logError = (err) => {
    console.error(`Could not read contact.html file: ${err}`);
    process.exit(1);
}

const renderFile = (res, req, file) => {
    res.set('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(file);
}

fs.readFile("./index.html")
    .then(contents => indexFile = contents)
    .catch(err => logError(err));

fs.readFile("./contact.html")
    .then(contents => contactFile = contents)
    .catch(err => logError(err));

app.listen(port, () => {
    logServer();
});

app.get('/', (req, res) => {
    renderFile(res, req, indexFile);
});

app.get('/contact', (req, res) => {
    renderFile(res, req, contactFile);
});

