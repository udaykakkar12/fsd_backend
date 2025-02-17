const http = require('http');
const fs = require('fs/promises');

const server = http.createServer(async (req, res) => { 
    console.log(req.url);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    try {
        const data = await fs.readFile("./index.html", 'utf8'); 
        res.end(data);
    } catch (error) {
        console.error("Error reading file:", error);
        res.statusCode = 200;
        res.end("<h1>Internal Server Error</h1>");
    }
});

const PORT = 2000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

