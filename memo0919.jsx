// sub page > club Layout

//서브페이지 작업 중에
//club > introduction ~ … history 까지의 페이지들은 동일한 모양을 가지고 있어서 
//layout 을 잡아주는 PageBox라는 컴포넌트를 만들어서 children  props으로 section 의
//컨텐츠 들만 넘겨주면서 layout을 재사용하며 club의 introduction 의 하위 page들을 처리했다.

//그리고 모든  introduction의 하위 페이지를 작업하고 club > stadium page를 작업하려하는데…
//<h2> 태그의 텍스트가 다른것이다 그래서 sectionTitle 이라는 prop을 만들어서
//페이지별로 값을 내려줘야겠다.. 라고 생각했지만 첫번째 전달할 ‘인천, 한계를 돌파하라!’ 
//에서는 줄바꿈이 들어가고 두번째 전달값인 ‘Incheon Football Stadium’에는 줄바꿈이 들어가지
//않는 것이다. 
  
//그래서 삼항 연산자 안에서 react  Fragment  를 사용해서 <br /> 태그를 가지고 있는 텍스트를 
//렌더링 해주는 조건식을 만들었다. Fragment가 바로 생각이 나지않아서 식을 어떤식으로 작성해야
//잘 표현이 될지 조금은 해맸다.

//두개의 페이지에서 props를 각각 전부 내려줄 수 있고 그렇게 조금 더 직관성에서 유리 할 순 있겠지만 rest 파라미터를 활용하는 편이 전체적인 로직이 덜 복잡해 보이겠다고 판단해서 기본으로 
//prop으로 값을 전달해주지 않으면 '인천,<br /> 한계를 돌파하라!' 를 리턴하게 만들었다.
//결국 이게 기본값인 것이다.  그리고 prop으로 값을 주면 받은 값을 리턴하게 만들었다.

export default function PageBox ({children,onActive,aniWidth,sectionTitle=''}){


    return (
        <>
        <Banner aniWidth={aniWidth} onActive={'구단소개'}  />
        <div className="size1442">
            <h2>
                {sectionTitle === '' ? (<>인천,<br />한계를 돌파하라!</>) : sectionTitle }
            </h2>
            <div>
                <aside>
                    {introductionTaps.map((el,index) => <button className={onActive === el.text ? "active" : ''} key={index}>
                        < Link to={el.link}>{el.text}</ Link>
                        </button>)}
                </aside>
                {children}
            </div>
        </div>
        </>
    )
}
