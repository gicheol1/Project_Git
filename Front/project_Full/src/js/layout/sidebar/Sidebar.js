import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import profileImage from './profile-image.png'; // 이미지 파일 임포트

function Sidebar() {
    return (
        <aside className="sidebar">
            <img src={profileImage} alt="Profile" className="profile-image" />
            <h2>OOO님</h2>
            <header>
                <Link to="/info">예약정보</Link>
                <br></br>
                <Link to="/saleinfo">판매 정보</Link>
                <br></br>
                <Link to="/membercut">회원정보 수정</Link>
                <br></br>
                <Link to="/Qna">내 Q&A 현황</Link>
                <br></br>
                <Link to="/delivery">배송 현황</Link>
                <br></br>
                <Link to="/memberout">회원 탈퇴</Link>
            </header>
        </aside>
    );
}

export default Sidebar;