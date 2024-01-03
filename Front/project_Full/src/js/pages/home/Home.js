import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from 'js';
import React, { useEffect, useState } from "react";
import { ElectricalServices } from '@mui/icons-material';

function Home() {

  // 페이지 이동을 위한 함수   
  const navigate = useNavigate();

  // 슬라이드에 출력할 이미지 배열
  const [imgList, setImgList] = useState([]);
  const [pack, setPack] = useState([]);

  const handleDragStart = (e) => e.preventDefault();
  let i =0;

  // 슬라이드 애니메이션에 추가할 이미지 태그
  
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  useEffect(() => { getFestival(); getPack(); }, [])

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  // DB에 저장된 파일 이름으로 이미지 불러오기
  const getPack = () => {
    fetch(SERVER_URL + 'getTravalpackAll', {
      method: 'GET'

    }).then((response) => {

      if (!response.ok) { return []; }

      return response.json();

    }).then((data) => {

      i = Math.round(Math.random() * data.length);
      if(i===0) i++
        fetch(SERVER_URL + `getFileTravalPack?packNum=${i}`, {
          method: 'GET'
        }).then((response) => {
          if (!response.ok) { return []; }
          return response.json();
        }).then((data) => {
          setPack(data);
        }).catch((e) => { console.log(e) });

    }).catch((e) => { console.log(e) });
  }

  const getFestival = () => {
    fetch(SERVER_URL + 'festivalAll', {
      method: 'GET'

    }).then((response) => {

      if (!response.ok) { return []; }

      return response.json();

    }).then((data) => {
      i = Math.round(Math.random() * data.length);
      if(i===0) i++
        fetch(SERVER_URL + `getFileFestival?festivalNum=${i+3}`, {
          method: 'GET'
        }).then((response) => {
          if (!response.ok) { return []; }
          return response.json();
        }).then((data) => {
          setImgList(data);
        }).catch((e) => { console.log(e) });

    }).catch((e) => { console.log(e) });
  }

 

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  return (

    <div class="container-xl">

      <div class="p-5 mb-4 bg-body-tertiary rounded-3">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold" align="center">축제</h1>
          <p class="col-md-8 fs-4" align="center"><p class="mainfont">빛나는 무대, 환상의 놀이, 풍요로운 음식, 특별한 순간,<br /> 우리와 함께하세요. 최고의 축제가 여러분을 기다립니다!</p>
          </p>
        </div>
      </div>

      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="h-100 p-5 text-bg-dark rounded-3">
            <h4>음악과 미술, <br></br>다양한 축제 활동으로 가득 찬 특별한 날을 만나보세요.</h4>
            <button class="btn btn-outline-light" type="button" onClick={() => navigate(`/calendar`)}>축제 보기</button>
          </div>
        </div>
        <div class="Homeimg">
          <img src={`data:image/png;base64,${imgList.imgFile}`}/>
          </div>
      </div>
      <div class="col-md-7">
        <div class="h-100 p-5 bg-body-tertiary border rounded-3">
          <h4>특별한 순간을 예약하세요. 여행의 시작은 지금부터입니다!</h4>

          <button class="btn btn-outline-secondary" type="button" onClick={() => navigate(`/packreservationList`)}>패키지 보기</button>
        </div>
      </div>
      <div class="Homeimg2">
        <img src={`data:image/png;base64,${pack.imgFile}`}/>
      </div>
      
    </div>
  );
}

export default Home;