//react 공식문서 > State 관리하기  > state 구조 선택하기
import { useState } from 'react'; //use state hook 가져오기
export default function FeedbackForm() {

const [text, setText] = useState(''); 
const [status, setStatus] = useState('typing');

async function handleSubmit(e) {
//submit 버튼에 들어 갈 함수 
//event 객체를 받아와서 preventDefault 로 기본동작 (새로고침) 막아줌
e.preventDefault();
//status 의 값을 'sending'으로 변경
setStatus('sending');
//비동기 함수로 sendMessage를 text 를 인자로 받아서 실행
//함수 호출 해놓고 promise 값을 받아오는 동안 다음 함수 실행
await sendMessage(text);
//status 값을 'sent'로 변경
setStatus('sent');
// isSending 은 boolean 값으로   status 값이 'sending' 일때만 true
const isSending = status === 'sending';
//issent 는 boolean 값으로 status 값이 'sent' 일때만 true
const isSent = status === 'sent'
}
//만약 issent 의 값이 true 라면 ( sent ) 라면 
// 다음요소를 반환.
if (isSent) {
return <h1>Thanks for feedback!</h1>
}

return (
// onSubmit prop으로 이벤트 핸들러 handleSubmin 을 전달
<form onSubmit={handleSubmit}>
	<p>How was your stay at The Prancing Pony?</p>
	<textarea
	// issending 의 값이 true 라면 disabled 화면에 표시하지 않는 textarea
	disabled={isSending}
	// vlaue 값은 text => 로 초기설정 초기값은 ('')
	value={text}
	//onChange prop 에 이벤트 객체를 받아서 callback함수로 setText 함수 실행
	// 전달 값으로 e.target.value = textarea 에 입력되는 '값'
	// 이값은 value prop으로 직결되며 prop 으로 넘겨준 value 의 값이 바뀐다.
	onChange={e => setText(e.target.value)}/>
	<br />
	// isSending 의 값이 true 라면 disabled 하는 button
	// type이 submit 이기 때문에 click 하면 
	// handleSubmit 함수 호출
	// isSending의 값이 true  로 변함
	<button disabled={isSending} type="submit">Send</button>
	//isSending 의 값이 true 라면 다음요소 렌더링
	{isSending && <p>Sending...</p>}
</form>
);
}
// Pretend to send a message.

function sendMessage(text) {
return new Promise(resolve => {
setTimeout(resolve, 2000);
});

state 값이 어떤 흐름으로 바뀌나 궁금해서 console.log를 중간중간 섞어서 state의 변화를 관찰했다.

총 세개의 console.log가 있는데 구분하기 편하게 앞에 index를 붙여주었다.

1.실행하면 컴포넌트 렌더링 단계에서  3번 console 실행  ⇒  결과 :  typing

2.submit 버튼의 click  이벤트 실행 ⇒ 1번 console실행 ⇒ 결과 : typing ,

그다음줄이 비동기 함수 이기 때문에 잠시 함수 바깥으로 이동 ⇒

3번 console 실행 ⇒ 결과 : sending

하고 state 값이 바뀌었기 때문에 컴포넌트 재렌더링 ⇒

state 다시 typing 으로 초기화

3.비동기 함수의 promise 값을 리턴받았기 때문에 다시 handleSubmit 으로 돌아감

⇒ 2번 console 실행 ⇒ 결과 : typing

4. 3번 console실행  ⇒ 결과 : sent ⇒ 컴포넌트 재렌더링?

react 는  state 값이 바뀌면 화면을 다시 재렌더링 한다.

그렇기 때문에 중간에 비동기 함수를 만났을 때에도 콜백함수를 스택에 쌓아두고

다시 나와서 state 가 바뀌었기 때문에 재렌더링을 진행 한다고 파악이 됐다.

그리고 state는 컴포넌트의 내용을 다읽고 화면을 그리기 직전에 변경 되는거 같다.

export  function FeedbackForm() {
    const [text, setText] = useState('');
    const [status, setStatus] = useState('typing');
  
    async function handleSubmit(e) {
      e.preventDefault();
      
      setStatus('sending');
      
      1 console.log(status); 여기서 왜 값이 변하지 않았을까
      
      await sendMessage(text);
      
      setStatus('sent');
      
      2 console.log(status)
      
    }
    3 console.log(status)
    
    
    const isSending = status === 'sending';
    const isSent = status === 'sent';
    
    if (isSent) {
        return <h1>Thanks for feedback!</h1>
    }
    
