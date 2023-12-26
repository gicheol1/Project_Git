
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserManage } from './useUserManage';

import './UserManage.css';

const UserManage = () => {

  const navigate = useNavigate();

  // 회원 리스트
  const [userList, setUserList] = useState();

  const { getUserList, deleteUser } = useUserManage();

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

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
    <table className='table-container'>
      <thead>
        <tr>
          <th className='table-cell'>아이디</th>
          <th className='table-cell'>이름</th>
          <th className='table-cell'>전화번호</th>
          <th className='table-cell'>가입일자</th>
          <th className='table-cell'></th>
        </tr>
      </thead>
      <tbody>
        {(userList !== undefined && userList.length !== 0) && (
          userList.map(user => (
            <tr key={user.id}>
              <td className='table-cell'>{user.memId}</td>
              <td className='table-cell'>{user.name}</td>
              <td className='table-cell'>{user.phonNum}</td>
              <td className='table-cell'>{user.singupDate}</td>
              <td className='table-cell'>
                {user.otherInfo}
                {/* <button style={blackButtonStyle} onClick={() => onDetail(item.id)}>자세히</button> */}
                <button className='btn-red'
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

export default UserManage;