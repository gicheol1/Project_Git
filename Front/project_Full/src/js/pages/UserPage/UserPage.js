import { SERVER_URL } from 'js/component/constants';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const tableStyle = {
  border: '2px solid black',
  background: 'lightgray',
  width: '100%',
  borderCollapse: 'collapse',

};

const cellStyle = {
  border: '1px solid black',
  padding: '8px',
};

const blackButtonStyle = {
  background: 'black',
  color: 'white', // 텍스트 색상을 백그라운드와 대비되도록 흰색으로 설정
  padding: '5px 10px',
  margin: '0 5px',
  cursor: 'pointer',
};

const redButtonStyle = {
  background: 'red',
  color: 'white',
  padding: '5px 10px',
  margin: '0 5px',
  cursor: 'pointer',
};

const purpleButtonStyle = {
  background: 'purple',
  color: 'white',
  padding: '5px 10px',
  margin: '0 5px',
  cursor: 'pointer',
};

const UserPage = () => {

  const navigate = useNavigate();

  const [userList, setUserList] = useState();

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  useEffect(() => {
    getUserList().then(res => {
      if (!res) { alert('데이터가 없습니다.'); navigate('/'); return; }
      setUserList(res);
    });
  }, []);

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  const getUserList = async () => {
    const jwt = sessionStorage.getItem('jwt');

    return fetch(SERVER_URL + `getUserList?jwt=${jwt}`, {
      method: 'GET'

    }).then((res) => {
      return res.json();

    }).catch((e) => {
      console.log(e);

    })
  }

  const onDelete = async (memId) => {

    fetch(SERVER_URL + `deleteUser?memId=${memId}`, {
      method: 'DELETE'

    }).then((res) => {
      if (!res.ok) { throw new Error(res.status) }
      alert('삭제했습니다.');

    }).catch((e) => {
      console.log(e);

    })

    getUserList().then(res => {
      if (!res) { alert('데이터가 없습니다.'); navigate('/'); return; }
      setUserList(res);
    });
  }

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={cellStyle}>아이디</th>
          <th style={cellStyle}>이름</th>
          <th style={cellStyle}>전화번호</th>
          <th style={cellStyle}>가입일자</th>
          <th style={cellStyle}></th>
        </tr>
      </thead>
      <tbody>
        {userList !== undefined && (
          userList.map(item => (
            <tr key={item.id}>
              <td style={cellStyle}>{item.memId}</td>
              <td style={cellStyle}>{item.name}</td>
              <td style={cellStyle}>{item.phonNum}</td>
              <td style={cellStyle}>{item.singupDate}</td>
              <td style={cellStyle}>
                {item.otherInfo}
                {/* <button style={blackButtonStyle} onClick={() => onDetail(item.id)}>자세히</button> */}
                <button style={redButtonStyle} onClick={() => onDelete(item.id)}>삭제</button>
                {/* <button style={purpleButtonStyle} onClick={() => onServiceLimit(item.id)}>서비스 제한</button> */}
              </td>
            </tr>
          )))}
      </tbody>
      <tfoot>
        <tr>
        </tr>
      </tfoot>
    </table>
  );
};

export default UserPage;