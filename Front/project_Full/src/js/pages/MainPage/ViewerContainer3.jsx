import React from 'react';
import './ViewerContainer3.css'; // 추가된 CSS 파일로 Flexbox 스타일을 정의합니다.

const Viewer3 = () => {
  return (
    <div className="viewer3">
      <a href="/Mymilize"><h1>OOO님의 마일리지: 10000원</h1></a>
      
    </div>
  );
};



const ViewersContainer3 = () => {
  return (
    <div className="viewers-container3">
      <Viewer3 />
    </div>
  );
};

export default ViewersContainer3;