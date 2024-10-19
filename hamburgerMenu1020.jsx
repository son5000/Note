import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {

  const [opacityValue , setOpacityValue ] = useState(0);

  function onScroll() {
    const scrollValue = window.scrollY;
    setOpacityValue(Math.min(scrollValue / 500 , 1))    
  }
  useEffect(()=> {
    window.addEventListener("scroll",onScroll);
    return () => window.removeEventListener("scroll",onScroll);
  },[]);

  // 햄버거메뉴가 열렸을때 요소노드의 바깥 부분 CLICK이벤트 발생시 파악하기 위한 Ref 생성
  const hamburgerMenuRef = useRef();
  // 햄버거메뉴의 바깥요소를 click 했을때 메뉴를 닫히게 실행 할 함수.
  const clickHamburgerOutSide = (e) => {
  // 우선 모바일 전용 함수여야 하기때문에 첫번째 조건문으로 미디어커리를 잡았다.
  // 680px 보다 width 값이 클때는 아무것도 실행하지 않기 위해서.
  // 두번째 조건으로 햄버거메뉴 요소 , 그리고 
  // 클릭이벤트가 직접 발생한 요소가 햄버거메뉴의 내부에 있는 요소인지 판단하는 조건문을 작성했다.
  // 햄버거요소의 내부에서 클릭이벤트가 발생했냐 아니냐 boolean값으로 나타내는 contains 메소드를 사용.
  // 반전연산자를 사용해서 false 값 즉, 햄버거메뉴의 자식혹은 자기자신이 아닌 요소를 클릭했으니 false를 return =>  반전연사자를 통해 
  // true 가 된다. && 엔퍼센드 연산자로 양쪽 조건을 모두 만족하면 
  // 햄버거의 현재상태를 초기화 , 햄버거 내부의 메뉴들의 active 상태도 초기화한다.
    if(window.innerWidth <= 680){
      if(hamburgerMenuRef.current && !hamburgerMenuRef.current.contains(e.target)){
        setOpenHamburgerMenu(false);
        setisActive(Array(5).fill(null));
      }
    }
  }

  const handleHamburger = () =>  {
    if(window.innerWidth <= 680 && !OpenHamburgerMenu){
      return  setOpenHamburgerMenu(true);
    }
    return 
  }
  
  const [OpenHamburgerMenu , setOpenHamburgerMenu] = useState(false);
  // useEffect 함수로 햄버거 바깥요소에 mousedown 이벤트가 일어났을때
  // clickHamburgerOutSide 를 실행하게 한다.
  // 햄버거의 상태가 열려있는 상태에만 이벤트를 등록하고
  // 닫힌경우에는 등록한 이벤트를 삭제한다.
  useEffect(()=> {
    if(OpenHamburgerMenu){
      document.addEventListener('mousedown',clickHamburgerOutSide);
    } else {
      document.removeEventListener('mousedown',clickHamburgerOutSide);
    }
    return () => document.removeEventListener('mousedown',clickHamburgerOutSide);
  },[OpenHamburgerMenu])

  // 햄버거 메뉴안의 각각의 서브메뉴의 active를 위한  state
  const [isActive,setisActive] = useState(Array(5).fill(false));
  // 서브메뉴의 핸들러 
  // 햄버거 메뉴의 상태가 열려있는 상태에만 작동하게 만들었다.
  const handleMenuOpen = (index,e) => {
    if(!OpenHamburgerMenu){
      return;
    }
  // 메뉴의 최상위 선택자를 클릭했을때 품고 있는 서브메뉴가 열리게 하기위해
  // active가 들어가있는 최상위 요소는 preventDefault 로 한번 이동을 막고
  // 다시 클릭했을때 이동이 되게 끔 설계했다.
  // 그래서 true 값일때 state 값이 false 바뀌면서 그때 link로의 이동이 발생한다.

    if(window.innerWidth <= 680){
      let temp = isActive.slice();
      if(temp[index]){
        temp[index] =false;
        return setisActive(temp)
      }
      e.preventDefault();
      temp[index] = true;
      return setisActive(temp)
    }
  }

  return (
      <header style={{'--header--opacity':opacityValue}}>
      {/* 헤더 */}
        <div className="size1442">
        {/* 메인 로고 H1 */}
        <h1>
          <Link to={'/'} className="header">
            <img src="/images/main/Main_logo_header.png" alt="인천유나이티드 로고" />
          </Link>
        </h1>
        {/*  메인 네비게이션 Nav */}
        <nav ref={hamburgerMenuRef} onClick={() => handleHamburger()} className={OpenHamburgerMenu ? "active" : ""}>
          <ul>
            <li className={isActive[0] ? "active" : ""}>
              <Link onClick={(e) => handleMenuOpen(0,e)} className={isActive[0] ? "active" : ""} to={"club/introduction"}>CLUB</Link>
              <ul>
                <li>
                  <Link to={"club/introduction"}>구단소개</Link>
                </li>
                <li>
                  <Link to={"club/greeting"}>인사말</Link>
                </li>
                <li>
                <Link to={"club/stadium"}>경기장</Link>
                </li>
              </ul>
            </li>
            <li className={isActive[1] ? "active" : ""} >
              <Link onClick={(e) => handleMenuOpen(1,e)} className={isActive[1] ? "active" : ""}  to={"player/coachingstaff"}>PLAYER</Link>
              <ul>
                <li>
                  <Link to={"player/coachingstaff"}>코칭/지원스태프</Link>
                </li>
                <li>
                  <Link to={"player/pro"}>프로</Link>
                </li>
                <li>
                  <Link to={"player/schedule"}>선수단 일정</Link>
                </li>
              </ul>
            </li>
            <li className={isActive[2] ? "active" : ""}>
              <Link onClick={(e) => handleMenuOpen(2,e)} className={isActive[2] ? "active" : ""} to={"matchCenter/gameSchedule"}>MATCH CENTER</Link>
              <ul>
                <li>
                  <Link to={"matchCenter/gameSchedule"}>경기일정/결과</Link>
                </li>
                <li>
                  <Link to={"matchCenter/ranking"}>순위표</Link>
                </li>
              </ul>
            </li>
            <li  className={isActive[3] ? "active" : ""}>
              <Link onClick={(e) => handleMenuOpen(3,e)} className={isActive[3] ? "active" : ""} to={"fanZone/announcement"}>FANZONE</Link>
              <ul>
                <li>
                  <Link to={"fanZone/announcement"}>공지사항</Link>
                </li>
                <li>
                  <Link to={"fanZone/news"}>구단뉴스</Link> 
                </li>
                <li>
                  <Link to={"fanZone/utdReporter"}>UTD기자단</Link>
                </li>
                <li>
                  <Link to={"fanZone/vod"}>VOD</Link>
                </li>
                <li>
                  <Link to={"fanZone/gallery"}>갤러리</Link>
                </li>
                <li>
                  <Link to={"fanZone/magazine"}>공식매거진</Link>
                </li>
                <li>
                  <Link to={"fanZone/cheerSong"}>응원가</Link>
                </li>
                <li>
                  <Link to={"fanZone/cheeringGrounds"}>응원마당</Link>
                </li>
                <li>
                  <Link to={"fanZone/event"}>이벤트</Link>
                </li>
                <li>
                  <Link to={"fanZone/lostItem"}>분실물</Link>
                </li>
              </ul>
            </li>
            <li className={isActive[4] ? "active" : ""}>
              <Link onClick={(e) => handleMenuOpen(4,e)} className={isActive[4] ? "active" : ""} to={"ticketMembership/buyTickets"}>TICKET / MEMBERSHIP</Link>
              <ul>
                <li>
                  <Link to={"ticketMembership/buyTickets"}>티켓 구매</Link>
                </li>
                <li>
                  <Link to={"ticketMembership/buyMembership"}>멤버쉽/시즌권/예매권북 구매</Link>
                </li>
                <li>
                  <Link to={"ticketMembership/groupTour"}>단체 관람</Link>
                </li>
                <li>
                  <Link to={"ticketMembership/frequentlyQ&A"}>FAQ</Link>
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
