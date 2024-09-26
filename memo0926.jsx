import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {

  const [opacityValue , setOpacityValue ] = useState(0);
  function onScroll(){
  const scrollValue = window.scrollY;
  // opacity 값에 scroll 값을 적용해야 하기 때문에  값을 100 으로 나눠주었다.
  // scroll값이 100px을 넘어가면 opacity 값이 1이 되는 코드이다.
  // 그리고 그값이 1보다 커지면 opacity 특성상 1보다 큰 값은 의미가 없기 때문에 Math.min 메소드로 두번째 인자로 1을 전달하여 
  // 1보다 값이 커질때는 1을 return 하도록 만들었다.

  // 그리고 무작정 header 의 opacity 속성에 적용했는데 header 전체가 투명해져버리는 이슈가 생겼다.
  // 배경의 opacity 만을 조절해야 하기때문에 rgba 값에 opacityvalue 를 전달했다.
  setOpacityValue(Math.min(scrollValue / 500 , 1))    
  }
  //  useEffect 함수는 컴포넌트가 mount  단계일때 실행된다.
  // 그리고 반환함수를 지정해주면 컴포넌트가 unmount 됐을때 실행한다.
  // 이는 addeventListener 를 무작정 계속 메모리가 가지고있기를 방지한다.
  // 메모리 누수 문제 해결.
  // useEffect 는 콜백함수와 같이 의존성 배열을 전달할 수 있는데 빈 배열을 전달하면 컴포넌트를 mount 할때만 내부 코드가 실행 된다.
  // 배열안에 특정 값을 넣으면 그 값이 변할때 useEffect는 내부 함수를 다시 실행한다.
  // 매우 좋은 기능인거 같다.

  useEffect(()=> {
    window.addEventListener("scroll",onScroll);
    return () => window.removeEventListener("scroll",onScroll);
  },[]);

console.log(opacityValue)

  return (
      <header style={{backgroundColor:`rgba(0,0,0,${opacityValue}`}}>
      {/* 헤더 */}
        <div className="size1442">
        {/* 메인 로고 H1 */}
        <h1>
          <Link to={'/'} className="header">
            <img src="/images/main/Main_logo_header.png" alt="인천유나이티드 로고" />
          </Link>
        </h1>
        {/*  메인 네비게이션 Nav */}
        <nav>
          <ul>
            <li>
              <Link to={'club/introduction'}>CLUB</Link>
              <ul>
                <li>
                  <Link to={'club/introduction'}>구단소개</Link>
                </li>
                <li>
                  <Link to={"club/greeting"}>인사말</Link>
                </li>
                <li>
                <Link to={"club/stadium"}>경기장</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={'player/coachingstaff'}>PLAYER</Link>
              <ul>
                <li>
                  <Link to={'player/coachingstaff'}>코칭/지원스태프</Link>
                </li>
                <li>
                  <Link to={'player/pro'}>프로</Link>
                </li>
                <li>
                  <Link to={'player/schedule'}>선수단 일정</Link>
                </li>
              </ul>
            </li>
            <li>
              <a href="###">MATCH CENTER</a>
              <ul>
                <li>
                  <a href="###">경기일정/결과</a>
                </li>
                <li>
                  <a href="###">순위표</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="###">FANZONE</a>
              <ul>
                <li>공지사항</li>
                <li>구단뉴스</li>
                <li>UTD기자단</li>
                <li>VOD</li>
                <li>갤러리</li>
                <li>공식매거진</li>
                <li>홍보물</li>
                <li>응원가</li>
                <li>응원마당</li>
                <li>질문과 담변</li>
              </ul>
            </li>
            <li>
              <a href="###">TICKET / MEMBERSHIP</a>
              <ul>
                <li>
                  <a href="###">티켓 구매</a>
                </li>
                <li>
                  <a href="###">멤버쉽/시즌권/예매권북 구매</a>
                </li>
                <li>
                  <a href="###">FAQ</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="###">BLUE MARKET</a>
            </li>
          </ul>
        </nav>
        <div>
          <a href="###">LOGIN</a>
          <a href="###">JOIN US</a>
        </div>
    </div>
      </header>
  );
}
