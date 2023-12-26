
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserPage } from './useUserManage';

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

  const { getUserList, deleteUser } = useUserPage();

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  useEffect(() => { loadList(); }, []);
  useEffect(() => { loadList(); }, []);

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  const loadList = async () => {
    getUserList().then(res => {
      if (!res) { alert('데이터가 없습니다.'); navigate('/'); return; }
      setUserList(res);
    });
  }

  const onDelete = async (memId) => {
    deleteUser(memId).then((res) => {
      if (res) {
        alert('삭제했습니다.');
      } else {
        alert('삭제에 실패했습니다.');
      }
    });
    setUserList(userList.filter((user) => user.memId !== memId));
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
        {(userList !== undefined && userList.length !== 0) && (
          userList.map(user => (
            <tr key={user.id}>
              <td style={cellStyle}>{user.memId}</td>
              <td style={cellStyle}>{user.name}</td>
              <td style={cellStyle}>{user.phonNum}</td>
              <td style={cellStyle}>{user.singupDate}</td>
              <td style={cellStyle}>
                {user.otherInfo}
                {/* <button style={blackButtonStyle} onClick={() => onDetail(item.id)}>자세히</button> */}
                <button
                  style={redButtonStyle}
                  onClick={() => { onDelete(user.memId); }}
                >
                  삭제
                </button>
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