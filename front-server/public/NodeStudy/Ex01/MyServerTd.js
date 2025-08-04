const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const count = parseInt(parsedUrl.query.count);

    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });    
    res.write("zzzz")
    let html = '<table border="1"><tr>';
    
    for (let i = 1; i <= count; i++) {
        html += `<td>${i}</td>`;
    }

    html += '</tr></table>';
    
    res.end(html);    
}).listen(3000)
