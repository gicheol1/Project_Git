import React, { useState, useEffect } from 'react';

const initialData = [
    {
      id: 1,
      username: 'user1',
      joinDate: '2023-01-01',
      serviceLimitDate: '2023-12-31',
      otherInfo: '',
    },
    {
      id: 2,
      username: 'user2',
      joinDate: '2023-02-01',
      serviceLimitDate: '2023-11-30',
      otherInfo: '',
    },
    // Add more data as needed
  ];
  
  const Board = ({ data, onDetail, onDelete, onServiceLimit, onAddMember }) => {
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
  
    return (
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>번호</th>
            <th style={cellStyle}>아이디</th>
            <th style={cellStyle}>가입일자</th>
            <th style={cellStyle}>서비스 제한일자</th>
            <th style={cellStyle}></th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td style={cellStyle}>{item.id}</td>
              <td style={cellStyle}>{item.username}</td>
              <td style={cellStyle}>{item.joinDate}</td>
              <td style={cellStyle}>{item.serviceLimitDate}</td>
              <td style={cellStyle}>
                {item.otherInfo}
                <button style={blackButtonStyle} onClick={() => onDetail(item.id)}>자세히</button>
                <button style={redButtonStyle} onClick={() => onDelete(item.id)}>삭제</button>
                <button style={purpleButtonStyle} onClick={() => onServiceLimit(item.id)}>서비스 제한</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
          </tr>
        </tfoot>
      </table>
    );
  };
  
  const UserPage = () => {
    const [boardData, setBoardData] = useState(initialData);
  
    const handleAddMember = () => {
      // 예제로 간단하게 새로운 회원을 추가하는 코드
      const newMember = {
        id: boardData.length + 1,
        username: `user${boardData.length + 1}`,
        joinDate: '2023-03-01',
        serviceLimitDate: '2023-12-31',
        otherInfo: '', // newmember
      };
  
      setBoardData([...boardData, newMember]);
    };
  
    const handleDetail = (id) => {
      // 자세히 버튼 클릭 시 실행될 로직
      console.log(`자세히 버튼 클릭 - 회원 ID: ${id}`);
    };
  
    const handleDelete = (id) => {
      // 삭제 버튼 클릭 시 실행될 로직
      const updatedData = boardData.filter(item => item.id !== id);
      setBoardData(updatedData);
    };
  
    const handleServiceLimit = (id) => {
      // 서비스 제한 버튼 클릭 시 실행될 로직
      console.log(`서비스 제한 버튼 클릭 - 회원 ID: ${id}`);
    };
  
    const appStyle = {
      textAlign: 'center', // 텍스트 정렬을 중앙으로 설정
    };
  
  
  
  
    useEffect(() => {
      // 로컬 mock API가 아닌 서버에서 데이터를 가져옵니다.
      fetch('http://localhost:8090/api/reservations') // 올바른 서버 URL 사용
        .then(response => response.json())
        .then(data => setBoardData(data))
        .catch(error => console.error('회원을 가져오는 중 오류 발생:', error));
    }, []);
  
  
    return (
      <div style={appStyle}>
        
        
        <h1>마이페이지(관리자) 회원관리</h1>
        <button onClick={handleAddMember}>회원 추가</button>
        <Board
          data={boardData}
          onDetail={handleDetail}
          onDelete={handleDelete}
          onServiceLimit={handleServiceLimit}
          onAddMember={handleAddMember}
        />
       
      </div>
    );
  };

export default UserPage;