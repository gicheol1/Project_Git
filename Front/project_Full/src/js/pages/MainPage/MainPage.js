
import './MainPage.css';
import { SERVER_URL } from 'js';
import React, { useEffect, useState, useCheckLogin } from "react";
import { useBoardDetail } from "../board/boardDetail/useBoardDetail";
import { useParams } from "react-router-dom";
import axios from 'axios';

const API_KEY = 'd520697c0f0c14123d8ef96d9ca14194';

function MainPage() {

  const [packreservation, setPackreservation] = useState([]); // 패키지 여행 예약 목록
  const [userName, setUserName] = useState(''); // 회원 이름 
  const [region, setRegion] = useState('');
  const { isOwnerBoard } = useBoardDetail();
  const [board, setBoard] = useState({});
  const { target, boardNum } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  /* 날씨 api 사용 */
  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${'republic of korea'}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    MyBoard();
    getWeatherData();
  }, [])

  /* jwt 인증받아서 DB 연동 */
  const MyBoard = () => {

    const jwt = sessionStorage.getItem('jwt');

    fetch(SERVER_URL + `getUser?jwt=${jwt}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setRegion(data.addrRoad);
      }).catch(err => console.error(err));

    /* 회원이 예약한 패키지 여행 내역 데이터 가져오기 */
    fetch(SERVER_URL + `packreservation/${jwt}`, { method: 'POST' }
    ).then(response => response.json()
    ).then(data => { setPackreservation(data); }
    ).catch(err => { console.error(err); });
  }

  return (
    <div class="MypageMain">
      <div class="MypageFirst">
        <div class="mycol1">
          <div class="cardHeader">
            <h4>{userName}님의 예약정보</h4>
          </div>
          <div class="cardBody">
            {packreservation.map(data =>
              <div>
                <h5>{data.packName}</h5>
                <p>예약날짜: {data.startDate}</p>
              </div>
            )}
          </div>
        </div>
        <div class="mycol2">
          <div class="cardHeader">
            <h4>한국 날씨</h4>
          </div>
          <div class="weather">
            {weatherData && (
              <div>
                <br />
                <br />
                <br />
                <h2>온도: {Math.floor(weatherData.main.temp - 273.15)} 도</h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <div class="mycol3">
        <div class="cardHeader">
          <h4>{userName}님의 지역</h4>
        </div>
        <div class="cardBody">
          <ul class="list-unstyled mt-3 mb-4">
            <br />
            <br />
            <br />
            <h2>{region}</h2>
          </ul>
        </div>
      </div>
      <div class='MypageThird'>
        <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary">
          <div class="col-md-6 p-lg-5 mx-auto my-5">
            <h1 class="footerName">방문해주셔서 감사합니다.</h1>
            <h3 class="fw-normal text-muted mb-3">Thank you for visiting</h3>
            <div class="d-flex gap-3 justify-content-center lead fw-normal">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;