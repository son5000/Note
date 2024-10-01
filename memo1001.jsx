import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import data from "../../data.json"

const playersData = data.pro["players"];


export default function Pro () {

    const [isCategori,setIsCategori] = useState('전체');
    const newFeed = isCategori === '전체' ? playersData : playersData.filter((el) => el.categori === isCategori);
    const [isPopup,setIsPopup] = useState ('');
    const [currentScrollY , setCurrentScrollY] = useState(0);


    useEffect(() => {
        if(isPopup){
            setCurrentScrollY(window.scrollY);
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow ='auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
        
    },[isPopup]);


    return(
        <>
          <Banner aniWidth={'50%'}/>
          <section className="size1442 proArea">
            <h2>프로 선수들 프로필</h2>
            <div>
                <button onClick={() => setIsCategori('전체')} className={isCategori === '전체' ? 'active' : ''}>전체</button>
                {playersData.map((el,index) => <button className={isCategori === el.categori ? 'active' : ''} onClick={() => setIsCategori(el.categori)} key={index}>{el.categori}</button>)}
            </div>
            <ul>
                {newFeed.map((el,index) => 
                <li key={index}>
                    <p>{el.title}</p>
                    {el.categori === '군입대'|| el.categori === '임대'|| el.categori ==='우선지명' ? 
                    <ul>
                        {el.profile.map((i,index) => 
                        <li key={i.id || index}>
                            <span>
                             <img src={i.image} alt={i.name} />
                            </span>
                            <p>{i.name}<span>{i.positionAndAffiliation}</span></p>
                        </li>
                        )}
                    </ul>
                    :
                    <ul>
                        {el.profile.map((i,index)=>
                            <>
                            <li key={i.id || index}>
                            <img src={i.image} alt={i.name}/>
                            <div>
                                <span>{i.id}</span>
                                <p><span>{i.name}</span><br />
                                   {i.englishName}
                                </p>
                            </div>
                            <button onClick={() => {setIsPopup(i.name)
                            }}>프로필</button>
                            </li>      
                            {/* Popup! */}
                            {/* popup  요소를 컴포넌트 렌더링과 동시에 항상 같이 렌더링 하는게 아니라 */}
                            {/* ispopup의 요소와 데이터의 name 값이 같을때 => true 값이 됐을때만 렌더링이 되게 만들었다. */}
                            {/* 이렇게 구성하니 좋은점은 props 를 많이? 아꼈다는 것이다. */}
                            {/* 1. toggle class를 구성할 필요가 없다. */}
                            {/* 애초에 렌더링이 되지 않기 때문에 class를 toggle하지 않아도 되는것이다. */}
                            {/* 2. css display none */}
                            {/* 기존에 toggle class방식으로 display none , active => display block */}
                            {/* css 코드도 줄였다. */}
                            {isPopup === i.name && <Popup key={i.id} scrollPosition={currentScrollY} data={i}  handlePopupClose={() => setIsPopup('')} />}
                            </>
                        )}
                    </ul>
                    }
                </li>
                )}
            </ul>
          </section>
        </>

    )
}

/* proArea 의 선수프로필의 popup 을 만드는데 발생했던 에러사항 */

/* popup의 구성을 뒷배경을 가려주고 , 내부의 컨텐츠을 가운데에 자리 잡게해줄 수 있는 */
/* popup-overlay 를 만들고 그안에 contents div 를 만들었다. */
/* popup이 생성되는 위치를 유저가 보고있는 화면에 표시되게 만들고 싶었는데 */
/* 단순히 vw , vh 를 쓰는것만으로는 해결이 되지 않았다. */
/* state 로 scroll값을 변경해줄 변수를 만들었고 */
/* state의 값으로 popup-overlay의 top 값을 설정해주었다. */

/* 이다음 과정에서 두번째 문제가 발생하는데 */
/* 팝업안에서  scroll 이 동작하는데 오류가 있었다. */
/* 팝업 내부에서는 바깥의 scroll 이 동작을 하면 안되고 */
/* 내부의 컨텐츠의 양이 많아서 내부의 scroll만 표시되고 동작이 되야하는 것이다. */

/* 그래서 useEfect 의  callback 함수의 내부에 */
/* 조건문으로  ispopup 값이 true 일때만 즉, popup이 표시되고 있을때만 */
/* 바깥의 scroll 을 overflow hidden  으로 막아주었다. */
/* 당연하게 ispopup 의 값이 false 일때는 auto 로 설정해 다시 scroll을 표시했다. */

/* 그리고 컴포넌트가 unMount될때도 마찬가지로 auto 로 설정해주고 */
/* 의존성배열에 ispopup state 를 넘겨 ispopup 의 값이 변할때만 함수 내부가 작동하게 만들었다. */

// 이렇게 구성하고 속성으로 overFlowY auto 를 주고 마무리했다.



function Popup ({data,handlePopupClose,scrollPosition}) {
    
return (
         <div style={{top : scrollPosition}} className="popup-Overlay">
            <div className="popup-contents size1560">
                <div>
                    <button onClick={() => handlePopupClose()}>버튼</button>
                    <img src={data.image} alt="" />
                    <div>
                        <p>
                            <span>{data.id}</span>
                            <b>{data.name}<span><br />{data.englishName}</span></b>    
                        </p>
                        <ul>
                            <li>GAME<strong>8</strong></li>
                            <li>GOAL<strong>0</strong></li>
                            <li>ASSIST<strong>0</strong></li>
                        </ul>
                        <ul>
                            <li><span>포지션</span>골키퍼</li>
                            <li><span>생년월일</span>1999년 07월 22일</li>
                            <li><span>국적</span> 대한민국</li>
                            <li><span>신체정보</span> 189cm, 82kg</li>
                        </ul>
                    </div>
                </div>
                <p>통산기록</p>
                <table>
                    <thead>
                        <tr>
                            <th>출장</th>
                            <th>득점</th>
                            <th>도움</th>
                            <th>슈팅</th>
                            <th>파울</th>
                            <th>경고</th>
                            <th>퇴장</th>
                            <th>실점</th>
                            <th>자책</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>16</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                            <td>20</td>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <p>경기별기록</p>
                    <div>
                        <button className="active">2024년</button>
                        <button>2033년</button>
                        <button>2022년</button>
                    </div>
                </div>
                <table> 
                    <thead>
                        <tr>
                            <th>일시</th>
                            <th>대회명</th>
                            <th>소속팀</th>
                            <th>상대팀</th>
                            <th>출장</th>
                            <th>교체</th>
                            <th>득점</th>
                            <th>도움</th>
                            <th>파울&#40;C/S&#41;</th>
                            <th>오프사이드</th>
                            <th>슈팅&#40;S/T&#41;</th>
                            <th>PK&#40;S/F&#41;</th>
                            <th>경고</th>
                            <th>실점</th>
                            <th>자책</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <p>시즌별 기록</p>
                <table>
                    <thead>
                        <tr>
                            <th>대회명</th>
                            <th>소속팀</th>
                            <th>시즌</th>
                            <th>출장</th>
                            <th>득점</th>
                            <th>도움</th>
                            <th>슈팅</th>
                            <th>파울</th>
                            <th>경고</th>
                            <th>퇴장</th>
                            <th>실점</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <article className="size1560">
                    {/*  슬라이드 들어가야함 */}
                </article>
            </div>
     </div>
            
    )
}       