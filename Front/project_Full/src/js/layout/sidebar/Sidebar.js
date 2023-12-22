import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import
import './Sidebar.css';
import profileImage from './profile-image.png';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="text-center"> {/* Bootstrap class */}
        <img src={profileImage} alt="Profile" className="profile-image" />
      </div>
      <h2>OOO님</h2>
      <header>
        <Link to="/info" className="link">
          예약정보
        </Link>
        <Link to="/saleinfo" className="link">
          판매 정보
        </Link>
        <Link to="/membercut" className="link">
          회원정보 수정
        </Link>
        <Link to="/Qna" className="link">
          내 Q&A 현황
        </Link>
        <Link to="/delivery" className="link">
          배송 현황
        </Link>
        <Link to="/memberout" className="link">
          회원 탈퇴
        </Link>
      </header>
    </aside>
  );
}

export default Sidebar;