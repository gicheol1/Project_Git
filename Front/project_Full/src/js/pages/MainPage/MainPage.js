
import './MainPage.css';
import { SERVER_URL } from 'js';
import React,{ useEffect,useState, useCheckLogin } from "react";

function MainPage() {

  const [packreservation, setPackreservation] = useState([]); // 패키지 여행 예약 목록
  const [userName, setUserName] = useState(''); // 회원 이름 
  const [test,setTest] = useState([]);


  useEffect(() => { 
    
    MyBoard();
 
  }, [])

  const MyBoard = () =>{
    const jwt = sessionStorage.getItem('jwt');


        fetch(SERVER_URL + `getUser?jwt=${jwt}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {

                /* 회원이 예약한 패키지 여행 내역 데이터 가져오기 */
                fetch(SERVER_URL + `packreservation/memberpackreservation/${data.memId}`, { method: 'POST' })
                    .then(response => response.json())
                    .then(data => { setPackreservation(data); console.log(data); 
                    setTest(data);})
                    .catch(err => { console.error(err); });

                /* >로그인한 회원의 이름을 출력하기위한 코드 */
                // 회원의 이름을 가져온다고 가정하고, data에 이름이 담겨있다고 가정합니다.
                const memberName = data.name; // data에서 이름 필드를 가져온다
                setUserName(memberName);
 
            }).catch(err => console.error(err));
  }


    return (
      <div class="MypageMain">
        <div class="MypageFirst">
        <div class="mycol1">
        <div class="cardHeader">
            <h4>{userName}님의 예약정보</h4>
            {console.log(userName)}
          </div>
          <div class="cardBody">
          {packreservation.map(data => 
          <div>
            <p>{data.packName}</p>
            </div>
          )}
          
    

          </div>
          </div>

          <div class="mycol2">
        <div class="cardHeader">
            <h4 class="my-0 fw-normal">오늘 본 상품 보기</h4>
            </div>

          <div class="cardBody">
            <ul class="list-unstyled mt-3 mb-4">
              <li>10 users included</li>
              <li>2 GB of storage</li>
              <li>Email support</li>
              <li>Help center access</li>
            </ul>
          </div>
          </div>

          <div class="mycol3">
        <div class="cardHeader">
            <h4 class="my-0 fw-normal">지역</h4>
            </div>

          <div class="cardBody">
            <ul class="list-unstyled mt-3 mb-4">
              <li>10 users included</li>
              <li>2 GB of storage</li>
              <li>Email support</li>
              <li>Help center access</li>
            </ul>
          </div>
          </div>
        </div>

        <div class="MypageSecond">
          
          <div class="MyBoard">
            <div class="MyBoardHeader">
              <h4 align="center">작성한 게시글 보기</h4>
            </div>
            <div class="MyBoardBody"></div>
              
          </div>


          <div class="MyHeart">


            <div class="MyHeartHeader">
              <h4 align="center">좋아요 글 보기</h4>
            </div>
            
            <div class="MyHeartBody"></div>
  
            </div>

          </div>

        </div>


    );
  }
  
  export default MainPage;