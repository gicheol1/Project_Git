// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidecare.css';
import profileImage from './profile-image.png'; // 이미지 파일 임포트

function Sidebar() {
    return (
        <aside className="sidebar">
            <img src={profileImage} alt="Profile" className="profile-image" />
            <h2>관리자님</h2>
            <header>
                <Link to="/info">예약 정보 관리</Link>
                <br></br>
                <Link to="/saleInfo">판매 정보 관리</Link>
                <br></br>
                <Link to="/qna">Q&A 관리</Link>
                <br></br>
                <Link to="/festivals">축제 관리</Link>
                <br></br>
                <Link to="/user">유저 관리</Link>
                <br></br>
                <Link to="/blacklist">블랙 리스트</Link>
                <br></br>
                <Link to="/memberinfo">회원정보수정</Link>
                <br></br>
                <Link to="/servicedown">서비스 제한</Link>
            </header>
        </aside>
    );
}

export default Sidebar;