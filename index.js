const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    let filepath = '';

    if (req.url === '/') {
        filepath = path.join(__dirname, 'index.html');
        res.statusCode = 200;
    }
    else if (req.url === '/about') {
        filepath = path.join(__dirname, 'about.html');
        res.statusCode = 200;
    }
    else if (req.url === '/contact-me') {  // Fixed: changed from '/contact' to '/contact-me'
        filepath = path.join(__dirname, 'contact-me.html');  // Fixed: changed to 'contact-me.html'
        res.statusCode = 200;
    }
    else {
        filepath = path.join(__dirname, '404.html');  // Fixed: changed 'filename' to 'filepath'
        res.statusCode = 404;
    }

    fs.readFile(filepath, (err, data) => {
        if (err) {
            console.log('Error reading file:', err);  // Added error logging
            console.log('Trying to read:', filepath);
            res.statusCode = 500;
            res.end('Internal Server Error');
            return;
        }
        res.end(data);
    });
}).listen(8080, () => {
    console.log('Server is listening on port 8080');
});