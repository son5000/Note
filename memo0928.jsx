import { useState } from "react";

// const date = new Date();

// console.log(date)

// const viewYear = date.getFullYear();
// const viewMonth = date.getMonth();
// console.log(viewYear,viewMonth);


// // 지난달의 마지막날의 y,m,date,day...
// const prevLast = new Date(viewYear, viewMonth ,0);
// // 이번달의 마지막날의 y,m,date,day... date 함수에서 month 값은 0 부터 시작하기 때문에 + 1 값이, 곧 현재 달이다.
// const thisLast = new Date(viewYear, viewMonth + 1 ,0);
// console.log(prevLast);
// console.log(thisLast);

// const 지난달예시 =['가','나','다','라','마','바','사','가'];

// //y,m,date,day...중에서 지난달의 마지막 날의 값을 가져오기 
// const plDate = prevLast.getDate();
// //y,m,date,day...중에서 지난달의 마지막날의 요일 값을 가져오기 
// // 월요일 = 1, 화요일 = 2, 수요일 =3, 목요일 = 4, 금요일 = 5, 토요일 6, 일요일 7
// const plDay = prevLast.getDay();

// //y,m,date,day...중에서 이번달의 마지막 날의 값을 가져오기
// const tlDate  = thisLast.getDate();
// //y,m,date,day...중에서 이번달의 마지막날의 요일 값을 가져오기 
// const tlDay  = thisLast.getDay();

// const 이번달의마지막날 = thisLast.getDate();
// const 표시해야하는달 = [...Array(35)];
// const 이번달의첫번째날의요일값 = new Date(prevLast + 1)

// console.log(이번달의첫번째날의요일값);
// if(plDay !== 6){
//   for(let i = 0 ; i < 6 ; i++){

//   }
// }

const today = new Date();

const Year = today.getFullYear();
const Month = today.getMonth();

export default function Calendar ()  { 

  const [오늘날짜,set오늘날짜] = useState(new Date());
  const 이번년 = today.getFullYear();
  const 지난달 = today.getMonth() ;
  const 이번달 = 지난달 + 1 ;
  const 다음달 = 이번달  + 1
  const 지난달의마지막날 = new Date(이번년,지난달,0).getDate();
  const 이번달의마지막날 = new Date(이번년,이번달,0).getDate();
  const 지난달의마지막요일값 = new Date(이번년,지난달,0).getDay();


  const 이번달데이터 = [...Array(이번달의마지막날).fill('졸리다')];
  const 지난달데이터 = [...Array(지난달의마지막날).fill('재밌다')];

  if(지난달의마지막요일값 !==6){
    for(let i = 0 ; i < 지난달의마지막요일값 + 1 ; i ++){
      이번달데이터.unshift(지난달데이터[지난달데이터.length - 1 -i]);
    }
  }

  
  const prevMonth = () => {    
    set오늘날짜(today.setMonth(Month - 1))
  }
  
  const nextMonth = () => {
    set오늘날짜(today.setMonth(Month + 1))
  }
  
  
  console.log(오늘날짜)
  console.log(지난달)
  console.log(이번달)
  console.log(다음달)
  console.log(지난달의마지막날)
  console.log(지난달의마지막요일값)
  console.log(이번달의마지막날)
  console.log(이번달데이터)
  console.log(지난달데이터)





  return (
    <div className="달력 size1442">
        <div className="달력헤더">
          <div className="년도월">{이번년} 년 {} 월</div>
          <div className="버튼상자">
            <button style={{cursor:'pointer'}} onClick={() => prevMonth()} className="nav-btn go-prev" >{ppp}</button>
            <button style={{cursor:'pointer'}} onClick={() => nextMonth()} className="nav-btn go-next" >{nnn}</button>
          </div>
        </div>
        <div className="요일상자">
          <span>일</span>
          <span>월</span>
          <span>화</span>
          <span>수</span>
          <span>목</span>
          <span>금</span>
          <span>토</span>
        </div>
        <div className="날짜상자">
          {이번달데이터.map((el,index) => <span>{index}</span>)}
        </div>
    </div>
  );
};

const nnn = '=>'
const ppp = '<='