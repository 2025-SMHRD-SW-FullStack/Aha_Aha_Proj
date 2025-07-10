package com.example.myapplication_0709

fun main() {

    // 메소드 안에서 만들어진 경우는 호출의 순서가 나중에 와야 한다!
//    fun add2 (n1 : Int,n2 : Int) : Int {
//
//        return n1 + n2
//    }

    // 함수의 간략화 방법1
    fun add2 (n1: Int, n2: Int) : Int = n1+n2
    println(add2(1,1))

    // 함수의 간략화 방법2 -> 메소드의 리턴 타입을 생략 (=> 매개변수의 형태가 지정되어 있으므로)
    fun add3 (n1: Int, n2: Int) = n1+n2
    println(add3(10,10))

    // 리턴 타입이 없는 메소드를 생성! -> Unit
    fun UserPrint(str : String) : Unit {
        println(str)
    }


    UserPrint("babo")


    println(add(2,3))
}

// 하나의 메소드 구조 안에서 새로운 메소드를 생성하는건 `자바`에서 불가능
// 코틀린은 하나의 메소드 안이나 밖에서 메소드를 생성할 수 있다!
// 메소드 안에서 생성 -> 지역 함수 -> 메소드 생성이후 호출의 순서가 중요해 진다!
// 메소드 밖에서 생성 -> 전역 함수

// 메소드의 구조
// 1. fun 키워드 -> 메소드임을 알려주는 키워드!
// 2. 메소드 이름
// 3. 매개변수에 대한 지정
// 4. 메소드의 리턴 타입 -> return 키워드
// 5. { } 실행해야 하는 코드 입력

fun add (n1 : Int,n2 : Int) : Int {

    return n1 + n2
}
