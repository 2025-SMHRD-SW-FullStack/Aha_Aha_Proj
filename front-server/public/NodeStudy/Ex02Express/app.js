const express = require('express')
const app = express();

// body 영역 사용 선언
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const basic = require('./router/basic')
// 모듈 불러와서 서버에 적용 시키기
app.use(basic)

// http://localhost:3001/plus
const plus = require('./router/plus')
// 모듈 불러와서 서버에 적용 시키기
app.use(plus)

const td = require('./router/td')
// 모듈 불러와서 서버에 적용 시키기
app.use(td)

const gugu = require('./router/gugu')
// 모듈 불러와서 서버에 적용 시키기
app.use(gugu)

const join = require('./router/user')
// 모듈 불러와서 서버에 적용 시키기
app.use('/user',join)


app.listen(3001)

// const http = require('http')
// http.createServer(()=>{

// }).listen(3001)