//mysql2 : 연결 정보를 이용해서 DB와의 통로를 만들어주는 역할(모듈)
const mysql = require('mysql2')

// DataBase 연결
// DB연결1. 접속 정보 객체 만들기
const db_info = {
    // DB 서버 접속 주소 
    host : 'localhost',
    // 접속 계정 ID
    user : 'com',
    password : 'com01',
    port : 3306,
    //접속할 DB(스키마) 이름
    database : 'com'
}

//DB 연결2. 노드와 DB의 연결 통로 생성
const conn = mysql.createConnection(db_info)

module.exports = conn;