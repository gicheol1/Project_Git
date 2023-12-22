import React, { useState, useEffect } from 'react';
import Board from "./Board"
import { SERVER_URL } from 'js';


  const UserPage = () => {
    


    const [boardData, setBoardData] = useState([]);
   
  
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
  
    const handleDelete = (id) => {
    

    };
  
  
    const appStyle = {
      textAlign: 'center', // 텍스트 정렬을 중앙으로 설정
    };
  
  
    return (
      <div style={appStyle}>
        
        
        <h1>마이페이지(관리자) 회원관리</h1>
        <button onClick={handleAddMember}>회원 추가</button>
        <Board
          data={boardData}
          onDelete={handleDelete}

        />
       
      </div>
    );
  };

export default UserPage;