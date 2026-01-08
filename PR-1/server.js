const http = require('http');
const fs = require('fs');

const requestCycle = (req, res) => {
    let filepath = '';

    switch (req.url) {
        case "/":
            filepath = './home.html'
            break;
        case "/focus":
            filepath = './focus.html'
            break;
        case "/energy":
            filepath = './energy.html'
            break;
        case "/calm":
            filepath = './calm.html'
            break;
        default:
            filepath = './notFound.html'
            break;
    }

    let result = fs.readFileSync(filepath, 'utf-8');
    res.end(result);
}

const server = http.createServer(requestCycle);

server.listen(8000, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server start at http://localhost:8000`);
})