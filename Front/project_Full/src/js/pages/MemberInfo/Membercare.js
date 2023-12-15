import React, { useState } from 'react';
import './Membercare.css';
import profileImage from './profile-image.png'; // 이미지 파일 임포트


function App() {
  // 초기 상태 설정
  const [userInfo, setUserInfo] = useState({
    name: '',
    contact: '',
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: '',
    verificationCode: '',
    address: '',
    status: '',
    deadline: '',
    reason: '',
  });

  // 입력 값이 변경될 때 호출되는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // // 이메일 인증 버튼 클릭 시 호출되는 함수
  // const handleEmailVerification = () => {
  //   // 실제로는 서버에 이메일을 전송하여 인증을 요청하는 로직을 작성.
  //   // 이 예시에서는 간단한 메시지만 출력.
  //   console.log('Requesting email verification for:', userInfo.email);
  // };


  // // 이미지 수정 버튼 클릭 시 호출되는 함수
  // const handleImageUpdate = () => {
  //   // 실제로는 이미지를 업로드하고, 업로드된 이미지 경로를 서버에 전송하여 처리하는 로직을 작성.
  //   // 이 예시에서는 간단한 메시지만 출력.
  //   console.log('Updating profile image:', userInfo.image);
  // };

  // // 서버에 사용자 정보를 전송하는 함수
  // const updateUserInfo = () => {
  //   // 실제로는 서버에 데이터를 전송하는 로직을 작성.
  //   // 이 예시에서는 간단한 메시지만 출력.
  //   console.log('Sending user info to the server:', userInfo);
  // };


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



// 서버에 사용자 정보를 전송하는 함수
const updateUserInfo = () => {
  
    // 사용자 정보 업데이트를 위한 API 엔드포인트
  const apiUrl = 'http://localhost:8090/api/update-user-info';

  // 서버로 보낼 데이터
  const requestData = {
    userId: userInfo.userId,
    status: userInfo.status,
    deadline: userInfo.deadline,
    reason: userInfo.reason,
    // 다른 필요한 데이터들을 추가
  };

  // 서버로 요청을 보내는 부분
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('User information updated successfully:', data);
      // 서버로부터의 응답 처리
    })
    .catch(error => {
      console.error('Error updating user information:', error);
    });



  // console.log('Sending user info to the server:', userInfo);
};


  // 삭제 버튼 클릭 시 호출되는 함수
  const deleteUserInfo = () => {
    // 사용자 정보 삭제를 위한 API 엔드포인트
  const apiUrl = 'http://localhost:8090/api/delete-user-info';

  // 서버로 보낼 데이터
  const requestData = {
    userId: userInfo.userId,
  };

  // 서버로 요청을 보내는 부분
  fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('User information deleted successfully:', data);
      // 서버로부터의 응답 처리
    })
    .catch(error => {
      console.error('Error deleting user information:', error);
    });


    // console.log('Deleting user:', userInfo.username);
  };

  // 서비스 제한 버튼 클릭 시 호출되는 함수
  const handleServiceRestriction = () => {
    // 서비스 제한을 위한 API 엔드포인트
  const apiUrl = 'http://localhost:8090/api/service-restriction';

  // 서버로 보낼 데이터
  const requestData = {
    userId: userInfo.userId,
    reason: userInfo.reason,
    // 다른 필요한 데이터들을 추가
  };

  // 서버로 요청을 보내는 부분
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Service restriction applied successfully:', data);
      // 서버로부터의 응답 처리
    })
    .catch(error => {
      console.error('Error applying service restriction:', error);
    });
    // console.log('Restricting service for user:', userInfo.username);
  };

  // 제한 해제 버튼 클릭 시 호출되는 함수
  const handleReleaseRestriction = () => {
    // 서비스 제한 해제를 위한 API 엔드포인트
  const apiUrl = 'http://localhost:8090/api/release-restriction';

  // 서버로 보낼 데이터
  const requestData = {
    userId: userInfo.userId,
  };

  // 서버로 요청을 보내는 부분
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Service restriction released successfully:', data);
      // 서버로부터의 응답 처리
    })
    .catch(error => {
      console.error('Error releasing service restriction:', error);
    });
    // console.log('Releasing restriction for user:', userInfo.username);
  };


  return (
    <div className="container">
   
      <div className="header">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button type="button" onClick={handleImageUpdate}>
            이미지 수정
          </button>
        </div>
      </div>
      <h2>마이페이지(관리자) 회원관리 수정</h2>
      
      
      <form>
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

        <label htmlFor="currentPassword">새 비밀번호(현재):</label>
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
          <button
            type="button"
            style={{ marginLeft: '10px' }}
            onClick={handleEmailVerification}
          >
            이메일 인증
          </button>
        </div>

        


         {/* 추가: 인증코드 입력란 */}
      <div style={{ marginTop: '10px' }}>
        <label htmlFor="verificationCode">인증코드:</label>
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

         {/* 상태 입력창 */}
         <label htmlFor="status">상태:</label>
        <input
          type="text"
          id="status"
          name="status"
          value={userInfo.status}
          onChange={handleChange}
          required
        />

        {/* 제한일자 입력창 */}
        <label htmlFor="deadline">제한일자:</label>
        <input
          type="text"
          id="deadline"
          name="deadline"
          value={userInfo.deadline}
          onChange={handleChange}
          required
        />


        {/* 제한사유 입력창 */}
        <label htmlFor="reason">제한사유:</label>
        <textarea
          id="reason"
          name="reason"
          value={userInfo.reason}
          onChange={handleChange}
        />


        
        
<div>
  {/* 완료 버튼 */}
  <button type="button" onClick={updateUserInfo}>
    완료
  </button>

  {/* 삭제 버튼 */}
  <button type="button" className="delete" onClick={deleteUserInfo}>
    삭제
  </button>

  {/* 서비스 제한 버튼 */}
  <button type="button" className="restrict" onClick={handleServiceRestriction}>
    서비스 제한
  </button>

  {/* 제한 해제 버튼 */}
  <button type="button" className="release" onClick={handleReleaseRestriction}>
    제한 해제
  </button>
</div>


      </form>
     
    </div>
  );
}

export default App;