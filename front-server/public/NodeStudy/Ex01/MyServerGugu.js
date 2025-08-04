const http = require('http');
const url = require('url');

http.createServer((req,res)=>{
    const parsedUrl = url.parse(req.url, true);   
    const input = parseInt(parsedUrl.query.input); 
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    let result = '<table border="1">';
    for(let i=1; i<=9; i++){
        result += `<tr><td>${input}*${i}=${input*i}</td></tr>`
    }

    result += '</table>';

    res.end(result)
}).listen(3000)