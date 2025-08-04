// 나의 첫번째 노드 서버 만들기

// 1. 서버를 만들 수 있는 도구 가져오기
// ==> http 모듈 가져오기
const http = require('http')

// createServer() -> 서버를 생성하겠습니다
// 중요! 서버 : 요청에 따른 응답을 처리해 주는 것
http.createServer((request, response) => {
    // 요청에 따른 응답을 처리할 로직
    console.log('서버 접근 확인')
    console.log('서버 접근 확인2')

    // 요청을 보낸 사용자에게
    // '환영합니다' 문구 출력

    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.write("<h1>안뇽ㅋ</h1>")


    // 서버의 응답 마무리 부분
    response.end()
}).listen(3000)
// http://localhost:3000
// http://192.168.219.158:3000
// http://0.0.0.0:3000


// 서버를 실행 시킨다 , 서버에 요청을 보낸다
// ==> URL(주소)를 통해 서버에 접속하겠다

