const express = require('express')
// 이미 만들어진 서버에 돌아갈 수 있는 라우터 기능 생성
//--> 모듈화 준비 단계
const router = express.Router()

router.get('/gugu', (req,res)=>{   
    const input = parseInt(req.query.input); 
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    let result = '<table border="1">';
    for(let i=1; i<=9; i++){
        result += `<tr><td>${input}*${i}=${input*i}</td></tr>`
    }

    result += '</table>';

    res.write(result)
    res.write(`<button onclick="location.href='http://localhost:3001'">메인</button>`)
    res.end()
})

module.exports = router;