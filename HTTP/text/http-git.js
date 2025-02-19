const http = require('http');
const axios = require('axios');
const port = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    console.log('New request received');

    try {
        const response = await axios.get("https://api.github.com/users");
        const users = response.data;

        let frontdata = '<html><head><title>GitHub Users</title></head><body>';
        frontdata += '<h1>GitHub User Profiles</h1>';
        
        users.forEach(user => {
            frontdata += `<div>
                <img src="${user.avatar_url}" alt="${user.login}" width="100" height="100">
                <p><a href="${user.html_url}" target="_blank">${user.login}</a></p>
            </div>`;
        });

        frontdata += '</body></html>';

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(frontdata);

    } catch (error) {
        console.error('Error fetching data:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
});

server.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
  });