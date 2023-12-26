import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import
import './Sidebar.css';
import profileImage from './profile-image.png';
import { useEffect, useState } from 'react';
import { SERVER_URL } from 'js';

function Sidebar() {
  const [member, setMember] = useState([]);
  useEffect(() => {

    const jwt = sessionStorage.getItem('jwt');
    if (jwt === undefined || jwt === '') { return; }

    // - 회원 
    fetch(SERVER_URL + `getUser?jwt=${jwt}`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => { setMember(data); console.log(data); })
        .catch(err => console.error(err));
  });
  return (
    <aside className="sidebar">
      <div className="text-center"> {/* Bootstrap class */}
        <img src={profileImage} alt="Profile" className="profile-image" />
      </div>
      <h3>{member.name}님</h3>
      <div className='link-container'>
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
      </div>
    </aside>
  );
}

export default Sidebar;