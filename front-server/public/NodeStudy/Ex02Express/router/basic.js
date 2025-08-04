const express = require('express')
// 이미 만들어진 서버에 돌아갈 수 있는 라우터 기능 생성
//--> 모듈화 준비 단계
const router = express.Router()

router.get('/', (req,res)=>{    
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>메인 메뉴</title>
        </head>
        <body>
            <h1> Express 메뉴 </h1>
            <button onclick="location.href='http://127.0.0.1:5500/Ex02Express/Plus.html'">➕ 덧셈</button>
            <button onclick="location.href='http://127.0.0.1:5500/Ex02Express/Td.html'">📦 td 생성기</button>
            <button onclick="location.href='http://127.0.0.1:5500/Ex02Express/Gugu.html'">📐 구구단</button>
            <button onclick="location.href='http://127.0.0.1:5500/Ex02Express/Join.html'">회원가입</button>
            <button onclick="location.href='http://127.0.0.1:5500/Ex02Express/Login.html'">로그인</button>
            <button onclick="location.href='http://127.0.0.1:5500/Ex02Express/Delete.html'">회원탈퇴</button>
            <button onclick="location.href='http://127.0.0.1:5500/Ex02Express/Update.html'">회원수정</button>
        </body>
        </html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(html);
})

module.exports = router;