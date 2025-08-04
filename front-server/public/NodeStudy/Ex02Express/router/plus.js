const express = require('express')
// 이미 만들어진 서버에 돌아갈 수 있는 라우터 기능 생성
//--> 모듈화 준비 단계
const router = express.Router()

router.get('/plus',(req,res)=>{
    // 클라이언트로부터 2개의 숫자를 받아오겠습니다.
    // 두 숫자를 더한 결과값을 출력하고 싶어요!
    
    const num1 = parseInt(req.query.num1);
    const num2 = parseInt(req.query.num2);

    const sum = num1 + num2;

    res.writeHead(200, { 'Content-Type': "text/html;charset=utf-8" });
    res.write(`결과: ${sum}<br><br><br><br>`)
    res.write(`<button onclick="location.href='http://localhost:3001'">메인</button>`)
    res.end();
})

// 모듈화 시켜서 내보내기
module.exports = router;