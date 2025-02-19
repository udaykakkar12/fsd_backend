const http = require('http');
const axios = require('axios');
const port = process.env.PORT || 6000;

const server = http.createServer(async (req, res) => {
    console.log('New request received');

    try {
        // Corrected API call with query parameters
        const response = await axios.get("https://api.github.com/search/users", {
            params: { q: "location:ghaziabad" },
            headers: { 'User-Agent': 'request' } // GitHub API requires a User-Agent header
        });

        const users = response.data.items; // GitHub search API returns users in `items` array

        let frontdata = '<html><head><title>GitHub Users</title></head><body>';
        frontdata += '<h1>GitHub Users in Ghaziabad</h1>';

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

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
