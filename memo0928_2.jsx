import { useState } from "react";
import { format, addMonths, subMonths, getDaysInMonth, startOfMonth, addDays,subDays,endOfMonth } from 'date-fns';
import { ko } from 'date-fns/locale';


export default function Calendar () {
  const WEEKS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  
  // 1.오늘 날짜를 가져온다.
  const today = new Date(); 

  // 2. 현재 달력에 표시하는 날짜의 기본값을 오늘날짜로 useState 를 사용해서 지정한다.
  const [currentDate , setCurrentDate] = useState(today);

  // 3. 월단위 이동을 위한 click event 함수를 만든다.
  // subMonths 함수 : 첫번째 인자에서 두번째 넘겨준 인자만큼 월을 감소시킨다.
  // currenDate : 초기 오늘날짜의 달 에서 -1 
  const handlePrevMonth = () => {
    if(currentDate.getMonth() === 0){
      return
    }
    setCurrentDate(subMonths(currentDate,1));
  }
  // addMonths 함수 : 첫번째 인자에서 두번째 넘겨준 인자만큼 월을 증가시킨다.
  const handleNextMonth = () => {
    if(currentDate.getMonth() === 11){
      return
    }
    setCurrentDate(addMonths(currentDate,1));
  }

  // 현재 달력의 시작 날짜정보
  const startDate = startOfMonth(currentDate);

  // 현재 월의 시작요일 정보
  // 일 7 월 1 화 2 수 3 목 4 금 5 토 6
  const startDayOfWeek = format(startDate, 'i');

  // 현재달이 몇일 까지 구성돼 있는지
  const daysInMonth = getDaysInMonth(currentDate);

  // 만약 이번달\ 1일의 시작요일이 '일요일' 아니라면 
  // 저번달의 데이터의 뒤에서부터 startDayOfWeek의 값만큼 가져와 새로 배열을 생성한다.
  // subDays() 함수에 이번달 시작날의 데이터에서 , startDayOfWeek - index 값만큼을
  // 순차적으로 계산해 가장 오래전 날짜부터 배열에 앞으로 넣는다.

  // 이부분에서 지속적인 오류를 맞이했는데 이유가 뭐였냐면
  // startDayOfWeek 7이라면 빈배열을 return 해야하는데 그렇지 못하는것이다.
  // 왜일까 계속 코드를 수정해봤는데 
  // format함수는 string 으로 값을 바꿔준다 . 그런데 내가 코드를
  // const preMonthDays = startDayOfWeek !== 7 이렇게 number 로 작성하고 비교하니
  // 계속 빈배열을 생성해주지 못하고 있던것이다..
  const preMonthDays = startDayOfWeek !== '7' ? [...Array(startDayOfWeek)].map((_,index)=> {
    return subDays(startDate,startDayOfWeek - index);
  }) : [];

  // 현재달의 일 수만큼 배열을 생성.
  // addDays  함수로 startDate 오늘 날짜부터  index가 오늘날짜의마지막날(daysInMonth) 이 될때가지 증가시키며
  // 배열의 요소로 들어간다.
  const currentMonthDays = [...Array(daysInMonth)].map((_,index) => {
    return addDays(startDate,index);
  })

  // 캘린더의 타일 숫자는 항상 35개로 '고정' 돼 있어야 하기 때문에
  // 지난달 배열의 길이와 현재달 배열의 길이를 더해 35에서 빼준다.
  // 결과값으로 나온 수는 이번달에 표시할 달력에 빈공간이기 때문에 
  // 이공간의 index값 만큼 다음달의 달력배열을 만들어준다.
  // addDays()함수에 endOfMonth(현재달){현재달의 마지막날}함수를 전달하여
  // 전달한 날부터 index + 1을 하여 날짜 정보를 넣어준다.
  const remainingDays = 35 - (preMonthDays.length + currentMonthDays.length);
  const nextMonthDays = [...Array(remainingDays)].map((_,index) => {
    return addDays(endOfMonth(currentDate), index + 1) 
  })

  // 앞서 만큼 지난달 현재달 다음달을 spread 구문으로 배열을 하나로 만들어 준다.
  const calendarTiles = [...preMonthDays,...currentMonthDays,...nextMonthDays];



  return (
    <>
    <div className="calendar">
      <div className="nav">
        <div>
            <span>경기일정</span>
            <span>오늘</span>
        </div>
        <p>
            <button onClick={handlePrevMonth}></button>
            <span>
              {/* foramt 을 사용해 현재날짜의 연도 값을 'yyyy'형태로 가져온다 */}
            {format(currentDate , 'yyyy')}
            </span>
            <span>
              {/*  format 을 사용해 현재날짜의 월 값을 'MM'형태로 가져온다. */}
            {format(currentDate ,'MM',{locale:ko})}
            </span>
            <button onClick={handleNextMonth}></button>
        </p>
      </div>
      <ul>
         {WEEKS.map((el,index) => <li key={index}>{el}</li> )}
      </ul>
      <ol>
        {calendarTiles.map((el,index)=> 
        // 오늘에 해당하는 타일에는 border효과를 주기위해 타일의 값과 today 변수를 비교해서 active클래스를 넣어주었다.
        // format 으로 값을 변경해준 이유는 안의 값이 초단위의 값까지 가지고 있어 비교하는데 오류가 생겼다.
           <li className={format(el,'MM-dd') === format(today,'MM-dd') ? 'active' : '' } key={index}><span>{format(el,'d')}</span></li>
        )}
      </ol>
      <p>※ 훈련 일정 및 장소 등은 사전 공지 없이 변경될 수 있습니다..</p>
    </div>
    </>
  )
}


