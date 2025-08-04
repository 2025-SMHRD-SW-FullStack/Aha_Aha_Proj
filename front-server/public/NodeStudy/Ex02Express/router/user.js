//회원에 관련된 서버 기능들을 정의! --> 라우터
//회원가입, 로그인, 회원정보수정 .......

const express = require('express')
const router = express.Router()
const conn = require('../config/database')

router.post('/join',(req,res)=> {

    // ID, PW , NICK 데이터를 받아와서
    // smhrd , 123 이라는 회원이 이미 있다는 가정
    // 넘어온 ID가 smhrd 라면 -> '회원가입 실패!' 응답
    // 그 외의 ID가 넘어 온다면 -> '회원가입 성공!' 응답
    
    let id = req.body.id
    let pw = req.body.pw
    let nick = req.body.nick


    let sql = 'Insert into member values(?,?,?)'

    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    // 쿼리문 실행
    conn.query(sql, [id,pw,nick], (err , rows)=>{
        
        
        // err : 통신 실패시 실패 정보
        // rows : 통신 성공시 성공 정보
        console.log('통신 성공')
        console.log(rows)
        if (err) {
            console.error('쿼리 실행 중 오류 발생:', err);
            res.write('<h1>회원가입 실패 (서버 오류)</h1>')
        }
        else if(rows.affectedRows>0){
            console.log('회원가입 성공')
            res.write('<h1>회원가입 성공</h1>')
        }
        else{
            console.log('회원가입 실패')
            res.write('<h1>회원가입 실패</h1>')
        } 
        res.write(`<br><button onclick="location.href='http://localhost:3001'">메인</button>`)
        res.end()
    })
    
    
    // if("smhrd" === id){
        //     res.write('<h1>회원가입 실패</h1>')
        // }
        // else{
            //     res.write('<h1>회원가입 성공</h1>')
            // }
})

router.post('/login',(req,res)=> {
    
    //Login 기능 리부터
    // '/login'
    // 입력한 ID : smhrd, 입력한 PW : 123 일 때 -> '로그인 성공!' 응답
    // 하나라도 값이 다르다면 '로그인 실패!' 응답

    // 사용자가 입력한 ID ,PW를 가져와서
    // DB에 있는 ID, PW를 비교해주기

    const id = req.body.id
    const pw = req.body.pw

    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    
    let sql = 'Select * from member where id=? and pw=?'

    conn.query(sql, [id,pw], (err , rows)=>{
        if (err) {
            console.error('쿼리 실행 중 오류 발생:', err);
            res.write('<h1>로그인 실패 (서버 오류)</h1>')
        }
        else if(rows.length> 0){
            console.log('로그인 성공')
            res.write('<h1>로그인 성공</h1>')
        }
        else{
            console.log('로그인 실패')
            res.write('<h1>로그인 실패</h1>')
        }
        
        res.write(`<br><button onclick="location.href='http://localhost:3001'">메인</button>`)
        res.end()
    })



    // if("smhrd" === id && "123" === pw){
    //     res.write('<h1> 로그인 성공! </h1>')
    // }
    // else{
    //     res.write('<h1>로그인 실패!</h1>')
    // }
})


// '/delete' 라는 주소로 접근 했을때
// 1. 삭제하고싶은 ID를 받아옵니다.
// 2. 해당 ID를 가진 회원이 있다면 --> 데이터 삭제 후 '삭제 성공' 응답
// 3. 해당 ID를 가진 회원이 없다면 --> '없는 회원입니다' 응답
router.post('/delete',(req,res)=> {

    const id = req.body.id
    let sql = 'delete from member where id = ?'

    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });

    conn.query(sql, id, (err , rows)=>{
        if (err) {
            console.error('쿼리 실행 중 오류 발생:', err);
            res.write('<h1>계정삭제 실패 (서버 오류)</h1>')
        }
        else if(rows.affectedRows > 0){
            console.log('계정삭제 성공')
            res.write('<h1>계정삭제 성공</h1>')
        }
        else{
            console.log('계정삭제 실패')
            res.write('<h1>계정삭제 실패</h1>')
        }

        res.write(`<br><button onclick="location.href='http://localhost:3001'">메인</button>`)
        res.end()
    })
})

// '/update' 라는 주소로 Nick값 Update 기능 만들고 시펑요
// 1. 어떤 회원의 정보를 바꿀건지? -> 입력한 ID값 가져오기
//    어떤 NICK으로 바꿀건지? -> 입력한 NICK 값 가져오기
// 2. 해당 회원이 있다면 -> NICK 값 update 후 '수정 성공' 응답
//    해당 회원이 없다면 -> '수정 실패' 응답

router.post('/update',(req,res)=> {

    const id = req.body.id
    const nick = req.body.nick

    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    
    let idsql = 'Select * from member where id=?'

    conn.query(idsql, [id,nick], (err , rows)=>{

        let nicksql = 'update member set nick = ? where id = ?'

        conn.query(nicksql, [nick,id], (err , rows)=>{
            if (err) {
                console.error('쿼리 실행 중 오류 발생:', err);
                res.write('<h1>수정 실패 (서버 오류)</h1>')
            }
            else if(rows.affectedRows> 0){
                console.log('수정 성공')
                res.write('<h1>수정 성공</h1>')
            }
            else{
                console.log('수정 실패')
                res.write('<h1>수정 실패</h1>')
            }
            res.write(`<br><button onclick="location.href='http://localhost:3001'">메인</button>`)
            res.end()
        })
    })
})

module.exports = router;