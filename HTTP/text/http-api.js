const http = require('http');
const axios = require('axios');
const port = process.env.PORT || 4000;

const server = http.createServer(async (req, res) => {
    console.log('New request received');

    try {
        const response = await axios.get("https://dummyjson.com/products");
        const adata = response.data.products; 

        let frontdata = '<html><head></head><body>';
        
        adata.forEach(product => { 
            frontdata += `<div><img src="${product.thumbnail}" alt="Product Image"></div>`;
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

server.listen(4000, () => {
    console.log("Server running at http://localhost:4000");
  });