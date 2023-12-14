import React from 'react';
import './ViewerContainer.css'; // 추가된 CSS 파일로 Flexbox 스타일을 정의합니다.

const Viewer = () => {
  return (
    <div className="viewer">
      <a href="/info"><h1>예약정보</h1></a>
      <div>숫자: </div>
      <div>0</div>
      
    </div>
  );
};

const Viewer1 = () => {
  return (
    <div className="viewer">
      <a href="/byproduct"><h1>오늘 본 상품 보기</h1></a>
      <div>숫자: </div>
      <div>0</div>
      
    </div>
  );
};

const Viewer2 = () => {
  return (
    <div className="viewer">
      <a href="/festival"><h1>지역</h1></a>
      <div>대전</div>
      
    </div>
  );
};

const ViewersContainer = () => {
  return (
    <div className="viewers-container">
      <Viewer />
      <Viewer1 />
      <Viewer2 />
    </div>
  );
};

export default ViewersContainer;