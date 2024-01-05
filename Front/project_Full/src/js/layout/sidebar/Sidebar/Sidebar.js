import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SERVER_URL } from 'js';

import profileImage from '../profile-image.png';
import './Sidebar.css';

function Sidebar() {

	const [member, setMember] = useState([]);

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	useEffect(() => {

		const jwt = sessionStorage.getItem('jwt');
		if (jwt === undefined || jwt === '') { return; }

		const fetchMemberData = async () => {
			try {
				const response = await fetch(SERVER_URL + `getUser?jwt=${jwt}`, { method: 'GET' });
				const data = await response.json();
				setMember(data);
			} catch (error) { console.error(error); }
		};

		fetchMemberData();

	}, []); // 두 번째 매개변수로 빈 배열을 전달하여 한번만 실행하게 설정

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	if (member === undefined) {
		return;
	} else {
		return (
			<aside className="sidebar">
				<div className="text-center"> {/* Bootstrap class */}
					<img src={profileImage} alt="Profile" className="profile-image" />
				</div>
				<h3 className='side-title'>{member.name}님</h3>
				<div className='link-container'>
					<Link to="/saleinfo" className="link">판매 정보</Link>
					<Link to={`/userDetail/${member.memId}`} className="link">회원정보 수정</Link>
					<Link to="/Qna" className="link">내 Q&A 현황</Link>
					<Link to="/delivery" className="link">배송 현황</Link>
					<Link to="/memberout" className="link">회원 탈퇴</Link>
				</div>
			</aside>
		);
	}
}

export default Sidebar;