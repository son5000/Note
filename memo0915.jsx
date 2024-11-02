

// introductionTabs 라는 tap 메뉴의 데이터를 담고있는 변수에서 map 메소드를 통해
// ul 안에  li 요소들을 리턴해 주는 로직이다.
// 각각의  li 요소들은 Link 컴포넌트를 자식으로 가지고 있다.
// li 의 각각의 요소들은 click 이벤트가 발생했을때 -
// 1. Link To prop 에 입력된 값으로 컴포넌트를 재렌더링 시켜야한다.
// 2.  click 된 요소가 active 클래스를 가져야한다.

// 두가지 기능을 소화해줘야하는데 어째서 인지 Link 컴포넌트의 기능만 실행하고 
// 한번더 click 이벤트를 가져야 active 클래스가 적용됐다.

// 왜일까 조금 고민해보니 요소들을 담고있는 PageBox 컴포넌트는 Link 컴포넌트에 의해
// 계속 재렌더링이 일어난다.
// 그때마다 state값이 초기화 되고 있었던 것 같다.


export default function PageBox ({children}){

    const [active,setActive] = useState('text');

    return (
        <>
        <div className="page-box">
            <ul className="size1442">
                {clubTaps.map((el,index) => <li key={index}>{el}</li>)}
            </ul> 
        </div>
        <section className="size1442">
            <h2>인천,<br />한계를 돌파하라 !</h2>
            <div>
                <ul>
                    {introductionTaps.map((el,index) => <li className={active === el ? "active" : ''} key={index}>
                        < Link onClick={setActive(el)} to={introductionLinks[index]}>{el}</ Link>
                        </li>)}
                </ul>
                {children}
            </div>
        </section>
        </>
    )
}

// 위와 같은 문제를 겪고 나는 다음과 같이 수정하기로 했다.
// PageBox를 호출하는 부모 컴포넌트에서  onActive prop으로 각각에 다른 값을 내려주기로 했다.
// 이렇게 수정을 하는 방법이 정말 바람직한 방법인것인지는 아직 내공이 부족해서 잘 판단이 안서지만
// 이렇게 코드를 구성했을때 어떤 장점이 있을까? 를 고민해보면 우선  state 변수를 굳이 만들지 않아도 된다.
// 부모 컴포넌트에서 내려주는 onActive prop의 값과 introductionTaps 의 요소 return 값을 비교 하는것만으로도 
// 충분히 기능을 구현할 수 있었다.

export default function Introduction(){
    return( 
            <PageBox onActive={'구단소개'}>
                    <img className="introductionArea" src="/images/club/introductionimg.png" alt="인천유나이티드 구단소개 이미지('Break through the limits 한계를 돌파하라!"/>
            </PageBox>

    )
}

export default function PageBox ({children,onActive}){


    return (
        <>
        <div className="page-box">
            <ul className="size1442">
                {clubTaps.map((el,index) => <li key={index}>{el}</li>)}
            </ul> 
        </div>
        <section className="size1442">
            <h2>인천,<br />한계를 돌파하라 !</h2>
            <div>
                <ul>
                    {introductionTaps.map((el,index) => <li className={onActive === el ? "active" : ''} key={index}>
                        < Link to={introductionLinks[index]}>{el}</ Link>
                        </li>)}
                </ul>
                {children}
            </div>
        </section>
        </>
    )
}
