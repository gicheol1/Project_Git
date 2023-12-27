import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import React from 'react';

function Home() {

  const handleDragStart = (e) => e.preventDefault();
  {/* 축제 DB값이랑 같은 이미지 불러옴*/}
  const items = [
    <div>
      <img src={require("./img/고양이1.png")} />
      <img src={require("./img/고양이2.png")} />
      <img src={require("./img/고양이3.png")} />
    </div>,
    <div>
      <img src={require("./img/고양이2.png")} />
      <img src={require("./img/고양이3.png")} />
      <img src={require("./img/고양이4.png")} />
    </div>,
    <div>
      <img src={require("./img/고양이3.png")} />
      <img src={require("./img/고양이4.png")} />
      <img src={require("./img/고양이5.png")} />
    </div>

  ];


  // ===== ===== ===== ===== ===== ===== ===== ===== =====
  // ===== ===== ===== ===== ===== ===== ===== ===== =====
  // ===== ===== ===== ===== ===== ===== ===== ===== =====

  return (


    <div class="container-xl">

      <div class="p-5 mb-4 bg-body-tertiary rounded-3">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold" align="center">Custom jumbotron</h1>
          <p class="col-md-8 fs-4" align="center"><p class="mainfont">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
          </p>
          <button class="mainbtn" type="button" >Example button</button>
        </div>
      </div>

      <div class="imgGroup">
        {/* 슬라이드 애니메이션 */}
        <AliceCarousel
          autoPlay
          autoPlayStrategy="none"
          autoPlayInterval={2000}
          animationDuration={7000}
          animationType="slide"
          infinite
          touchTracking={false}
          disableDotsControls
          disableButtonsControls
          items={items}
        />
      </div>

      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="h-100 p-5 text-bg-dark rounded-3">
            <h2>축제</h2>
            <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
            <button class="btn btn-outline-light" type="button">축제 더 보기</button>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="h-100 p-5 bg-body-tertiary border rounded-3">
          <h2>패키지 예약</h2>
          <p>Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.</p>
          <button class="btn btn-outline-secondary" type="button">패키지 보기</button>
        </div>
      </div>
    </div>
  );
}

export default Home;