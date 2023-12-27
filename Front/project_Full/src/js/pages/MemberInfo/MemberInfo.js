// MemberInfo.js
// import React from 'react';

// function MemberInfo() {
//   return <div>회원 정보 수정 페이지</div>;
// }

// export default MemberInfo;

import React, { useState } from 'react';
import './MemberInfo.css';
import profileImage from './profile-image.png'; // 이미지 파일 임포트

function MemberInfo() {


  
  // 초기 상태 설정
  const [userInfo, setUserInfo] = useState({
    name: '',
    contact: '',
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: '',
    address: '',


    email: '',
    verificationCode: '', // 추가: 인증코드 상태
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };


  const handleImageUpdate = async () => {
    // 여기에서 이미지를 선택하고 업로드하는 로직을 구현합니다.
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', async (event) => {
      const selectedFile = event.target.files[0];

      // 이미지 업로드를 위한 코드 (예: axios 또는 fetch 사용)
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        // 서버로 파일 경로를 포함한 사용자 정보 전송
    const response = await fetch('http://localhost:8090/api/upload', {
      method: 'POST',
      body: formData,  // 이미지 업로드로 얻은 FormData 객체
  });

  const filePath = await response.text();

  // filePath를 userInfo에 추가

  // 사용자 등록 요청
  await fetch('http://localhost:8090/api/users/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
  });

        // 서버에서의 응답을 처리
        if (response.ok) {
          console.log('이미지 업로드 성공');
        } else {
          console.error('이미지 업로드 실패');
        }
      } catch (error) {
        console.error('이미지 업로드 중 에러:', error);
      }
    });

    fileInput.click();
  };

  // 서버에 사용자 정보를 전송하는 함수
  const updateUserInfo = () => {
    // 실제로는 서버에 데이터를 전송하는 로직을 작성.
    // 간단한 메시지만 출력.
    console.log('Sending user info to the server:', userInfo);
  };

  const handleEmailVerification = () => {
    // TODO: 서버로 이메일과 인증코드를 전송하여 인증코드 발송 요청
    fetch('http://localhost:8090/sendCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userInfo.email }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Verification code sent successfully:', data);
        // 서버로부터의 응답 처리
      })
      .catch(error => {
        console.error('Error sending verification code:', error);
      });
  };



  const handleVerificationConfirmation = () => {
    // TODO: 서버로 이메일과 입력된 인증코드를 전송하여 인증 확인 요청
    fetch('http://localhost:8090/api/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Email verification successful:', data);
        // 서버로부터의 응답 처리
      })
      .catch(error => {
        console.error('Error during email verification:', error);
      });
  };


  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: 서버로 데이터 전송
    fetch('http://localhost:8090/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
      .then(response => response.json())
      .then(data => {
        // 서버로부터의 응답 처리
        console.log('Registration successful:', data);
      })
      .catch(error => {
        console.error('Error during registration:', error);
      });
  };




  return (
    <div className="container">
     
      <div className="header">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <div style={{ display: 'flex', flexDirection: 'column',  marginLeft: '200px'}}>
          <button type="button" onClick={handleImageUpdate}>
          이미지 수정
          </button>
        </div>
      </div>
      
      <h2 className='user-page'>마이페이지</h2>
      
      
      <form className='user-page-form'>
        <label htmlFor="name">이름:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="contact">연락처:</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={userInfo.contact}
          onChange={handleChange}
          required
        />

        <label htmlFor="username">아이디:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="currentPassword">기존 비밀번호:</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={userInfo.currentPassword}
          onChange={handleChange}
          required
        />

        <label htmlFor="newPassword">새 비밀번호:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={userInfo.newPassword}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword">새 비밀번호 확인:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={userInfo.confirmPassword}
          onChange={handleChange}
          required
        />
       
        <label htmlFor="email">이메일:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
          <button className='email-button'
            type="button"
            style={{ marginLeft: '10px' }}
            onClick={handleEmailVerification}
          >
            이메일 인증
          </button>
        </div>



        <div style={{ marginTop: '10px' }}>
        <label className='check-code' htmlFor="verificationCode">인증코드:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
            type="text"
            id="verificationCode"
            name="verificationCode"
            value={userInfo.verificationCode}
            onChange={handleChange}
            required
          />
          <button
            className='email-check'
            type="button"
            style={{ marginLeft: '10px' }}
            onClick={handleVerificationConfirmation}
          >
            인증 확인
          </button>
        </div>
        </div>


        <label htmlFor="address">주소:</label>
        <textarea
          id="address"
          name="address"
          value={userInfo.address}
          onChange={handleChange}
        />

        <button type="button" onClick={updateUserInfo}>
          완료
        </button>
      </form>
      
    </div>
  );
}

export default MemberInfo;
