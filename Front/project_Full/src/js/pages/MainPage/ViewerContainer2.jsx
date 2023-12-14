import React from 'react';
import './ViewerContainer2.css'; // 추가된 CSS 파일로 Flexbox 스타일을 정의합니다.


const Viewer4 = () => {
  return (
    <div className="viewer4">
      <a href="/mylist"><h1>작성한 계시글 보기</h1></a>
      
    </div>
  );
};

const Viewer5 = () => {
  return (
    <div className="viewer5">
      <a href="/likeclick"><h1>좋아요 누른 계시글 보기</h1></a>
      
    </div>
  );
};

const ViewersContainer2 = () => {
  return (
    <div className="viewers-container2">
      <Viewer4 />
      <Viewer5 />
    </div>
  );
};

export default ViewersContainer2;