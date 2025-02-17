const http = require('http');
const fs = require('fs/promises');
const path = require('path');  

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' });


      const jsonData = await fs.readFile(path.join(__dirname, 'my.json'), 'utf8');
      res.end(jsonData);

    } else if (req.url === '/home') {

      res.writeHead(200, { 'Content-Type': 'text/html' });

      const homePage = await fs.readFile(path.join(__dirname, 'home.html'), 'utf8');
      res.end(homePage);

    } else {
     
      res.writeHead(404, { 'Content-Type': 'text/html' });


      const errorPage = await fs.readFile(path.join(__dirname, 'error.html'), 'utf8');
      res.end(errorPage);
    }

  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('<h1>Internal Server Error</h1>');
  }
});


server.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
