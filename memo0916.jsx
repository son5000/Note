// :root{
//     --ani--width : 5%;
// }

// .clubBanner > ul > li:nth-of-type(1):after{content:''; width:55vw; height :3px; bottom:0; display:block; background-color:var(--color--white); position:absolute;}
// .clubBanner > ul > li:nth-of-type(1):before{ animation: dynamicWidth; animation-duration: 1s; animation-fill-mode: forwards;  z-index: 1; content:''; height :3px; bottom:0; display:block; background-color:var(--color--blue); position:absolute;}


export default function Banner ({onActive,aniWidth}) {

    return (
        <div style={{'--ani--width': aniWidth }} className="clubBanner">  
        <ul className="size1442">
            {clubTaps.map((el,index) => <li className={onActive === el.text ? "active" : ""} key={index}><Link to={el.link}>{el.text}</Link></li>)}
        </ul> 
    </div>
    )
}


// 조건에 따라서 페이지에서 애니메이션이 다르게 적용되는 기능을 만들기위해서 
// css에서 변수를 만들어서 style객체에서 그 변수를 지목해서 props 로 받은 값으로 변수의 값을 바꿔 주게 만들었다.