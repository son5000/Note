import React, { useRef,useState } from 'react';
import Banner from "../../components/Banner"
import data from "../../data.json"

const cheerSongs = data.cheerSong;

export default function CheerSong(){

const [isActive , setIsActive] = useState(0)

// 현재 재생중인 곡을 저장해두기위한 state 생성
const [currentSong, setCurrentSong] = useState(null);
// audio dom 요소를 컨트롤 하기위해 useRef를 담고 있는 변수 생성
// 기본값은 null로 설정 클릭하면 해당 오디오를 참조.
const audioRef = useRef(null);
// 파라미터로 mp3의 파일경로를 받고
// if 문으로 currentSong === mp3 일때 즉,현재 음악이 재생중인 상태
// 일때 ref의 current 프로퍼티로 접근해서 audio에 pause();함수 실행 < 재생정지.
// setCurrentSong(null) 정지상태니까 currentSong 현재 재생중인 음악이 없음을 나타내는  null 로 초기화해준다.
// else문으로 재생중이 아닐때 ref의 current 프로퍼티의 audio src 프로퍼티에 접근
// 파라미터로 받은 mp3 경로를 넣어준다. 그럼 ref가 가지고 있는 audio 파일이 지정된다.
// ref의 current 프로퍼티 즉 audio에 접근해서 audio에 play(); 함수 실행 < 곡 재생.
// setCurrentSong(mp3) 재생중인 음악을 currentSong 값으로 mp3의 파일경로를 넣어준다.
function playMusic (mp3) {
    if (currentSong === mp3) {
        audioRef.current.pause();
        setCurrentSong(null);
      } else {
        audioRef.current.src = mp3;
        audioRef.current.play();
        setCurrentSong(mp3);
      }
};
    return (
        <>
        <Banner aniWidth={"65%"} />
        <section className="cheearSongArea size1442">
            <h2 className="hiddenH2">응원가</h2>
            <ul>{cheerSongs.map((el,index) => {
                return (
                    <li onClick={() => setIsActive(index)} key={index} className={index === isActive && "active"}>
                    <p>{el.title}
                        <button className={currentSong === el.mp3 && "playing"} onClick={()=> playMusic(el.mp3)}></button>
                        <audio ref={audioRef}></audio>
                    </p>
                    <div>{!el.text ? "가사가 없습니다." : 
                        el.text.map((i,index)=> { return (i ? <p key={index}>{i}</p> : <br key={index} />)})}
                        <button>응원가 다운받기</button>
                    </div>
                    </li>)})}                
            </ul>
        </section>
        </>
    )
}