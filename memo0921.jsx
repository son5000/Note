

// css 작업을 하면 꼭 마주치는 상황인 동일한 모양을 가진 list 형태의 요소
// 반복되는 갯수나 안의 데이터의 유형 , 요소의 업데이트 주기에 따라서
// 직접 하드코딩을 하느냐 , 따로 데이터 파일을 만들어서 자동화를 하냐의 기로에 놓이는거 같다.

// 오늘 작업한 player > coaching staff 작업중 staff profile 영역의 jsx 와 영역에 반영한 json.data


// 특징이라고 할 수 있는 점은 hook을 가능한 사용하지 않으려했다.
// css 의 toggle class 형식으로 작업했다.
// useState 의 boolean 값만을 이용해서 toggle active 가 들어갈 수 있게 만들어 주었고
// 하다보니 조금 헷갈렸던 부분은 json 파일의 데이터가 조금 깊어서
// 코드의 가독성적인 측면에서 데이터를 따로 위해서 분류해서 가지고 올까 고민했었다.
// 하지만 json 파일의 중첩 데이터 구조 포맷 몸으로 느껴볼 겸 따로 값을 분해하지 않고 사용했다.
// 막상 그냥 사용해보니 데이터의 키 > 벨류 > 키 > 벨류  이렇게 타고 들어가다보니 
// 카테고리가 하나씩 좁혀지는게 눈에 보여서 어떤 값을 가져온건지 더 잘 보이는거 같다.


        <h3>INCHEON UNITED COACH</h3>
                <ul>
                    {staffs.map((el) => { return <><li key={el.id}><img src={el.image} alt={el.name} /><button onClick={()=> setIsPopup(el.englishName)}>프로필</button><p>{el.name} <br/><span>{el.englishName}</span></p></li>
                    <div className={el.englishName === isPopup ? "popup-OverLay active" : "popup-OverLay"}>
                        <div className="popup-Content">
                            <button onClick={() => setIsPopup('')}>닫힘 버튼</button>
                            <img src={el.image} alt={el.name} />
                            <div>
                                <div>
                                    <button onClick={()=>setIsActiveInPopup(true)} className={isActiveInPopup ? 'active' : ''}>프로필</button>
                                    <button onClick={()=>setIsActiveInPopup(false)} className={!isActiveInPopup ? 'active' : ''}>약력</button>
                                </div>
                                {
                                isActiveInPopup ?    
                                <>
                                <p>{el.name} <span>{el.englishName}</span></p>
                                <ul>
                                    <li><span>직책</span>{el.profile["position"]}</li>
                                    <li><span>생년월일</span>{el.profile["birthData"]}</li>
                                    <li><span>출신학교</span>{el.profile["schoolOfOrigin"]}</li>
                                </ul>
                                </>
                                :
                                <>
                                <ul>
                                    <li>
                                        <span>지도자경력</span>
                                        <div>
                                            <p>
                                               {el.briefHistory["LeadershipExperience"].year.map((i)=> <>{i}<br /></> )}
                                            </p>
                                            <p>
                                               {el.briefHistory["LeadershipExperience"].text.map((i)=> <>{i}<br /></> )}
                                            </p>
                                        </div>    
                                    </li>
                                    {
                                        el.briefHistory["playerCareer"].year[0] == null ?
                                    <li>
                                        <span>자격증</span>
                                        <div>
                                            <p>
                                               {el.briefHistory["playerCareer"].text.map((i)=> <>{i}<br /></> )}
                                            </p>
                                        </div>    
                                     </li>
                                        :
                                    <li>
                                        <span>선수경력</span>
                                        <div>
                                            <p>
                                               {el.briefHistory["playerCareer"].year.map((i)=> <>{i}<br /></> )}
                                            </p>
                                            <p>
                                               {el.briefHistory["playerCareer"].text.map((i)=> <>{i}<br /></> )}
                                            </p>
                                        </div>    
                                     </li>
                                    }
                                    
                                </ul>
                                </>
                                }
                            </div>
                         </div>
                    </div>
                     </>} )}
                </ul>


            "staffs":[
                {"id":"1","name":"변재섭","englishName":"BYUN JAE SUB","image":"/images/player/staff_01.png",
                    "profile":{"position":"수석코치","birthData":"1975년 9월 17일","schoolOfOrigin":"전주대"},
                    "briefHistory":{"LeadershipExperience":{"year":["2008~2011","2012~2014","2015~2016","2017~2020","2022","2023~2023.05","2023.05~2024.07","2024.07"],"text":["전주대학교 코치","전남드래곤즈 U18 광양제철고 감독","제주유나이티드 코치","울산현대 코치","한국프로축구연맹 기술위원(TSG)","신태인FC U18감독","인천유나이티드 코치","인천유나이티드 수석코치","인천유나이티드 감독대행"]},"playerCareer":{"year":["1997~2003","2004~2006","2007"],"text":["전북현대","부천SK/제주유나티드","전북현대"]}}
                },
                {"id":"2","name":"박용호","englishName":"PARK YONG HO","image":"/images/player/staff_02.png",
                    "profile":{"position":"코치","birthData":"1971년 03월 25일","schoolOfOrigin":"부평고"},
                    "briefHistory":{"LeadershipExperience":{"year":["2016","2017","2018","2019~현재"],"text":["강원FC 플레잉코치","강원FC 코치","FC서울 스카우트 및 코치","인천유나이티드 코치"]},"playerCareer":{"year":["2000~2003","2004","2005~2006","2007~2011","2012~2014","2015~2016"],"text":["안양LG(FC서울 전신)","FC서울","광주상무","FC서울","부산아이파크","강원FC"]}}
                },
                {"id":"3","name":"김재성","englishName":"KIM JAE SUNG","image":"/images/player/staff_03.png",
                    "profile":{"position":" 코치","birthData":"1983년 10월 03일","schoolOfOrigin":"아주대"},
                    "briefHistory":{"LeadershipExperience":{"year":["2020~현재"],"text":["인천유나이티드 코치"]},"playerCareer":{"year":["2005~2007","2008~2014","2010","2010","2012~2013","2015~2016","2016","2017","2017","2018~2019"],"text":["부천SK/제주유나티드","포항스틸러스","동아시아컵 국가대표","FIFA 남아공 월드컵 국가대표","상주상무","서울 이랜드 FC","제주유나이티드","애들레이드 유나이티드 FC","전남드래곤즈","우돈 타니 FC"]}}
                },
                {"id":"4","name":"김광석","englishName":"KIM KWANG SUK","image":"/images/player/staff_04.png",
                    "profile":{"position":"코치","birthData":"1983년 2월 12일","schoolOfOrigin":"위덕대"},
                    "briefHistory":{"LeadershipExperience":{"year":["2023~현재"],"text":["인천유나이티드 코치"]},"playerCareer":{"year":["2002~2021","2021~2022"],"text":["포항스틸러스","인천유나이티드"]}}
                },
                {"id":"5","name":"김이섭","englishName":"KIM LEE SUB","image":"/images/player/staff_05.png",
                    "profile":{"position":"GK코치","birthData":"1974년 04월 27일","schoolOfOrigin":"전주대"},
                    "briefHistory":{"LeadershipExperience":{"year":["2012~2014","2015~2016","2018","2019~현재"],"text":["인천유나이티드 U18 대건고 GK코치","인천유나이티드 GK코치","전북이라고 GK코치","인천유나이티드 GK코치"]},"playerCareer":{"year":["1997~2001","2002~2003","2004~2011"],"text":["포항스틸러스","전북현대","인천유나이티드"]}}
                },
                {"id":"6","name":"오지우","englishName":"OH JEE WOO","image":"/images/player/staff_06.png",
                    "profile":{"position":"피지컬 코치","birthData":"1989년 10월 19일","schoolOfOrigin":"세종대(대학원)"},
                    "briefHistory":{"LeadershipExperience":{"year":["2012~2014","2015","2015~2017","2016","2016","2020","2021~현재"],"text":["세종대학교 피지컬 코치","U-16 여자대표팀 피지컬 코치","여자 A대표팀 피지컬 코치","U-20세 여자대표님 피지컬 코치","U-16세 남자대표님 피지컬 코치","현대제철 여자축구단 피지컬 코치","인천유나이티드 피지컬 코치"]},"playerCareer":{"year":[null],"text":["아주대학교"]}}
                },
                {"id":"7","name":"김한윤","englishName":"KIM HAN YOON","image":"/images/player/staff_07.png",
                    "profile":{"position":"스카우트","birthData":"1974년 7월 11일","schoolOfOrigin":"광운대"},
                    "briefHistory":{"LeadershipExperience":{"year":["2014~2015","2016~2019","2019~2021","2022~2023","2023~현재"],"text":["FC서울 코치","제주유나이티드 코치","베트남국가대표팀 코치","인천유나이티드 코치","인천유나이티드 스카우트"]},"playerCareer":{"year":["1997~1999","1999~2000","2006~2010","2011~2012","2013"],"text":["부천SK/제주유나이티드","포항스틸러스","FC서울","부산아이파크","성남일화/성남FC"]}}
                },
                {"id":"8","name":"황근우","englishName":"HWANG KEUN WOO","image":"/images/player/staff_08.png",
                    "profile":{"position":"선수트레이너","birthData":"1980년 02월 08일","schoolOfOrigin":"우석대"},
                    "briefHistory":{"LeadershipExperience":{"year":["2009~2016","2017~2019","2021~현재"],"text":["전북현대모터스  U18 의무트레이너","제주유나이티드 재활트레이너","인천유나이티드 선수트레이너"]},"playerCareer":{"year":[null],"text":["대한선수트레이너(R-KATA) 정회원","대한스포츠의학회 정회원","한국스포츠안접협회(K.S.S.A) 정회원","대한인명구조협회 정회원"]}}
                },
                {"id":"9","name":"피민혁","englishName":"PI MIN HYUCK","image":"/images/player/staff_09.png",
                    "profile":{"position":"선수트레이너","birthData":"1991년 12월 15일","schoolOfOrigin":"단국대"},
                    "briefHistory":{"LeadershipExperience":{"year":["2015","2016","2017~2018","2021~현재"],"text":["단국대학교 축구부 의무트레이너","제주유나이티드 재활트레이너","제주유나이티드 U18 재활트레이너","인천유나이티드 선수트레이너"]},"playerCareer":{"year":[null],"text":["대한선수트레이너협회(R-KATA)정회원","대한스포츠의학회 정회원","대한축구협회 AFC C급 지도자 자격증"]}}
                },
                {"id":"10","name":"진도형","englishName":"JIN DO HYEONG","image":"/images/player/staff_10.png",
                    "profile":{"position":"선수트레이너","birthData":"1996년 3월 24일","schoolOfOrigin":"인하대"},
                    "briefHistory":{"LeadershipExperience":{"year":["2019~~2020","2021~2022","2023~현재"],"text":["인하대학교 배드민턴부 트레이너","인천유나이티드  U15 트레이너","인천유나이티드 선수트레이너"]},"playerCareer":{"year":[null],"text":["대한선수트레이너협회(R-KATA)정회원","대한스포츠의학회 정회원"]}}
                },
                {"id":"11","name":"최재혁","englishName":"CHOI JAE HYEOK","image":"/images/player/staff_11.png",
                    "profile":{"position":"물리치료사","birthData":"1997년 3월 8일","schoolOfOrigin":"을지대"},
                    "briefHistory":{"LeadershipExperience":{"year":["2022~현재"],"text":["인천유나이티드 물리치료사"]},"playerCareer":{"year":[null],"text":["물리치료사 면허증","생활체육지도사 2급(보디빌딩) 자격증"]}}
                },
                {"id":"12","name":"김민석","englishName":"KIM MIN SUK","image":"/images/player/staff_12.png",
                    "profile":{"position":"팀매니저","birthData":"1991년 4월 13일","schoolOfOrigin":"호남대"},
                    "briefHistory":{"LeadershipExperience":{"year":["2010~2016","2019~2020","2021~현재"],"text":["수원삼성블루윙즈 통역 및 지도자","제주유나이티드 팀매니저 및 통역","인천유나이티드 팀매니저 및 통역"]},"playerCareer":{"year":[null],"text":["AFC / KFA 'B' License","AFC / KFA 'C' License"]}}
                },
                {"id":"13","name":"조용히","englishName":"CHO YONG HEE","image":"/images/player/staff_13.png",
                    "profile":{"position":"장비담당관","birthData":"1991년 12월 20일","schoolOfOrigin":"인하대"},
                    "briefHistory":{"LeadershipExperience":{"year":["2018","2019~현재"],"text":["인천스포츠과학센터","인천유나이티드 장비관"]},"playerCareer":{"year":[null],"text":["생활체육지도사(축구) 2급","생활체육지도사(보디빌딩) 2급","유소년스포츠지도사(축구) 1급"]}}
                },
                {"id":"14","name":"김종민","englishName":"KIM JONG MIN","image":"/images/player/staff_14.png",
                    "profile":{"position":"전력분석관","birthData":"1995년 6월 20일","schoolOfOrigin":"전주대"},
                    "briefHistory":{"LeadershipExperience":{"year":["2019","2020","2021~2033","2024"],"text":["여자 U13 대표팀 전력분석관","수원삼성블루윙즈 U15 전력분석관","수원삼성블루윙즈 U18 메탄고 전력분석관","인천유나이티드 전력분석관"]},"playerCareer":{"year":[null],"text":["인천유나이티드 전력분석관"]}}
                },
                {"id":"15","name":"표석관","englishName":"PYO SEOK HWAN","image":"/images/player/staff_15.png",
                    "profile":{"position":"통역관","birthData":"1998년 2월 4일","schoolOfOrigin":"경희대"},
                    "briefHistory":{"LeadershipExperience":{"year":["2024~현재"],"text":["인천유나이티드 통역"]},"playerCareer":{"year":[null],"text":[null]}}
                }
            ]