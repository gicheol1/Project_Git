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
      <div className='link-container'>
        <Link to="/info" className="link">예약 정보 관리</Link>
        <Link to="/saleInfo" className="link">판매 정보 관리</Link>
        <Link to="/qna" className="link">Q&A 관리</Link>
        <Link to="/festivals" className="link">축제 관리</Link>
        <Link to="/user" className="link">유저 관리</Link>
        <Link to="/blacklist" className="link">블랙 리스트</Link>
        <Link to="/memberinfo" className="link">회원정보 수정</Link>
      </div>
    </aside>
  );
}

export default Sidebar;