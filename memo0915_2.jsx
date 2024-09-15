import data from '../../../src/data.json'
import { Link } from 'react-router-dom';

// data.json > 'club' tap menu list,

const clubTaps = data.clubTaps;

// 중간 카테고리 네비게이션과 서브페이지 배너를 리턴하는 컴포넌트이다.
// 모양과 클래스는 잘 구현이 됐으나 
// Route 적용 과정에서 헤더의 네비게이션은 페이지 이동시 path 값이 잘 초기화가 되는데
// 다음의 탭 메뉴에서 이동을 진행하려하면 path  값이 계속 중첩되는 오류가 생긴다.


export default function Banner ({onActive}) {

    return (
        <div className="clubBanner">  
        <ul className="size1442">
            {clubTaps.map((el,index) => <li className={onActive === el.text ? "active" : ""} key={index}><Link to={el.link}>{el.text}</Link></li>)}
        </ul> 
    </div>
    )
}