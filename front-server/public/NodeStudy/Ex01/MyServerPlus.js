const http =require('http')

// url 모듈 : 주소값에 따른 기능을 가지고 있는 모듈
const url = require('url');

http.createServer((request, response)=>{
    // 클라이언트로부터 2개의 숫자를 받아오겠습니다.
    // 두 숫자를 더한 결과값을 출력하고 싶어요!
    const queryObject = url.parse(request.url, true).query;
    const num1 = parseInt(queryObject.num1);
    const num2 = parseInt(queryObject.num2);

    const sum = num1 + num2;

    response.writeHead(200, { 'Content-Type': "text/html;charset=utf-8" });
    response.end(`결과: ${sum}`);
}).listen(3000)