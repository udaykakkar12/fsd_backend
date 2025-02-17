const http = require('http');
const fs = require('fs/promises');

const users = [
  { id: 1, name: 'rahul', email: 'rahul@example.com' },
  { id: 2, name: 'uday', email: 'uday@example.com' },
  { id: 3, name: 'sonu', email: 'sonu@example.com' }
];

const server = http.createServer(async (req, res) => {
  try {
    res.writeHead(200, { 'Content-Type': 'application/json' });


    const filedata = await fs.readFile("./aa.json", "utf8");

    let newdata = users.map(user => user.name).join(" ");
    const response = {
      fileContent: JSON.parse(filedata),
      names: newdata.trim()
    };

    res.end(JSON.stringify(response, null, 2));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: "Internal Server Error", details: error.message }));
  }
});

server.listen(1000, () => {
  console.log("Server is running on http://localhost:1000");
});



