const express = require('express')
// 이미 만들어진 서버에 돌아갈 수 있는 라우터 기능 생성
//--> 모듈화 준비 단계
const router = express.Router()

router.get('/td', (req,res)=>{
    const count = parseInt(req.query.count);

    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });    
    res.write("zzzz")
    let html = '<table border="1"><tr>';
    
    for (let i = 1; i <= count; i++) {
        html += `<td>${i}</td>`;
    }

    html += '</tr></table>';
    res.write(html)
    res.write(`<button onclick="location.href='http://localhost:3001'">메인</button>`)
    res.end();   
})

module.exports = router;