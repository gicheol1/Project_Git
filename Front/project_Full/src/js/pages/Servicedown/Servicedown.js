import React, { useState } from 'react';
import axios from 'axios';
import './Servicedown.css';

const Servicedown = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    registrationDate: '',
    userId: '',


    blockReason: 'default',
    directInputReason: '',
    action: 'block10Days',
  });
  const handleBlockReasonChange = (event) => {
    const { value } = event.target;
    setUserInfo({
      ...userInfo,
      blockReason: value,
      directInputReason: value === 'directInput' ? '' : userInfo.directInputReason,
    });
  };

  const handleDirectInputReasonChange = (event) => {
    const { value } = event.target;
    setUserInfo({
      ...userInfo,
      directInputReason: value,
    });
  };

  const handleActionChange = (event) => {
    const { value } = event.target;
    setUserInfo({
      ...userInfo,
      action: value,
    });
  };
  const handleSubmit = () => {
    axios.post('http://localhost:8090/api/users/register', userInfo)
      .then(response => {
        console.log(response.data);
        // 원하는 작업 수행
      })
      .catch(error => {
        console.error('Error during user registration:', error);
      });
  };
  return (
    <div className="center-container">
      <label htmlFor="username">사용자:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={userInfo.username}
        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
        required
      /><br />
  
      <label htmlFor="registrationDate">가입일자:</label>
      <input
        type="date"
        id="registrationDate"
        name="registrationDate"
        value={userInfo.registrationDate}
        onChange={(e) => setUserInfo({ ...userInfo, registrationDate: e.target.value })}
        required
      /><br />
  
      <label htmlFor="userId">아이디:</label>
      <input
        type="text"
        id="userId"
        name="userId"
        value={userInfo.userId}
        onChange={(e) => setUserInfo({ ...userInfo, userId: e.target.value })}
        required
      /><br />
  
      <label htmlFor="blockReason">차단사유선택:</label>
      <select
        id="blockReason"
        name="blockReason"
        value={userInfo.blockReason}
        onChange={handleBlockReasonChange}
      >
        <option value="default">선택</option>
        <option value="directInput">-직접 입력-</option>
        <option value="just">그냥</option>
        <option value="bug">버그 발생</option>
      </select><br />
  
      {userInfo.blockReason === 'directInput' && (
        <div>
          <label htmlFor="directInputReason">Direct Input Reason:</label>
          <textarea
            id="directInputReason"
            name="directInputReason"
            value={userInfo.directInputReason}
            onChange={handleDirectInputReasonChange}
            style={{ border: '1px solid black', marginTop: '10px', width: '100%', height: '100px' }}
            
          ></textarea><br />
        </div>
      )}
  
      <label htmlFor="action">조치내용:</label>
      <select
        id="action"
        name="action"
        value={userInfo.action}
        onChange={handleActionChange}
      >
        <option value="block10Days">차단 10일</option>
        <option value="blockPermanent">영구 차단</option>
      </select><br />
  
      <button type="button" onClick={handleSubmit}>적용</button>
    </div>
  );
  };
  
  export default Servicedown;
