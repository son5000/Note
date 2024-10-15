
// 익스프레스 모듈 임포트
import express from "express";

// app 변수를 통해 라우트 생성 가능.
const app = express();

// 서버에 /hello 라는 request 가 들어오면 콜백 함수 실행.
// 콜백 함수는 '리퀘스트 핸들러라고도 불린다.
// 두가지 파라미터를 받는데 첫번째 : 들어온 request 객체 , 두번째 :  돌려줄 reponse 객체
app.get('/hello' , (req, res) => {
    // res 객체의 send 메소드를 사용해서 
    // send 메소드의 아규먼트에 전달할  reponse 정의 할 수 있다.
    // res.send 메소드는 아큐먼트로 js 객체를 받으면 그걸 json으로 변환해서 돌려준다.
    // response body의 내용을 보낼때는 내용이 어떤타입인지 말해주는 content type header 를 설정해주는 것이 좋다.
    // res.send 의 아규먼트에 전달된 값의 종류에따라 자동으로 설정된다.

    res.send('hello');
})

// 서버가 실행되면 실행할 콜백
// 3000 은 포트번호 , app 은 포트 3000을 듣고 있다 라는 뜻.
// app 이 실행되면 콜백 함수가 실행된다.

app.listen(3000, () => console.log('server stated'))