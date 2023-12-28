
import React, { useEffect, useState } from 'react';
import './MemberInfo.css';
import profileImage from './profile-image.png'; // 이미지 파일 임포트
import { SERVER_URL } from 'js/component/constants';

function MemberInfo() {

  // 기존 회원 정보
  const [userInfo, setUserInfo] = useState();

  // 비밀번호, 새 비밀번호
  const [oldPw, setOldPw] = useState();
  const [newPw, setNewPw] = useState();

  // 인증코드
  const [verificationCode, setVerificationCode] = useState();

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  useEffect(() => {

  }, []);

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  const handleImageUpdate = () => {

  }

  const handleChangePw = () => {

  }

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  return (
    <div className="container">

      <div className="header">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '200px' }}>
          <button type="button" onClick={handleImageUpdate}>
            이미지 수정
          </button>
        </div>
      </div>

      <h2 className='user-page'>마이페이지</h2>

      {userInfo === undefined ?
        <p>Loading...</p>
        :
        <form className='user-page-form'>

          <label htmlFor="name">아이디:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userInfo.name}
            disabled={true}
          />

          <label htmlFor="name">이름:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })}
            required
          />

          <label htmlFor="phonNum">연락처:</label>
          <input
            type="text"
            id="phonNum"
            name="phonNum"
            value={userInfo.contact}
            onChange={(e) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })}
            required
          />

          <div>
            <label htmlFor="currentPassword">기존 비밀번호:</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={oldPw}
              onChange={(e) => setOldPw(e.target.value)}
              required
            />

            <label htmlFor="newPassword">새 비밀번호:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
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
          </div>

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
      }

    </div>
  );
}

export default MemberInfo;
