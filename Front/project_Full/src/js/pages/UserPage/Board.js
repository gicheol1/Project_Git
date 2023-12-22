import React, { useState, useEffect } from 'react';
import { useCheckLogin } from 'js/useCheckLogin';
import { SERVER_URL } from 'js';

const Board = ({ onDelete }) => {
    
    const [boardData, setBoardData] = useState([]);
    const [userName, setUserName] = useState(''); // 회원 이름 
    const { checkIsLogin, toLogin } = useCheckLogin(); // 로그인 체크

    useEffect(() => {
        // 로컬 mock API가 아닌 서버에서 데이터를 가져옵니다.
        BoardServer();

      }, []);

      const BoardServer = () => {
        const jwt = sessionStorage.getItem('jwt');

        if (jwt === undefined || jwt === '') {
            if (!checkIsLogin()) {
                toLogin();
            }
        }

        fetch(SERVER_URL + `getUser?jwt=${jwt}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {

                /* >로그인한 회원의 이름을 출력하기위한 코드 */
                // 회원의 이름을 가져온다고 가정하고, data에 이름이 담겨있다고 가정합니다.
                const memberName = data.name; // data에서 이름 필드를 가져온다
                setUserName(memberName);
                fetch(SERVER_URL + `getUser2?jwt=${jwt}`, { method: 'GET' }) // 올바른 서버 URL 사용
        .then(response => response.json())
        .then(data =>{
                setBoardData(data);
                console.log(data);
        })
        .catch(error => console.error('회원을 가져오는 중 오류 발생:', error));
   
            }).catch(err => console.error(err));

      }


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
  
 
    const redButtonStyle = {
      background: 'red',
      color: 'white',
      padding: '5px 10px',
      margin: '0 5px',
      cursor: 'pointer',
    };
  

    const onhandleDelete = (id) => {
    
      console.log(id);
      fetch(SERVER_URL + `deleteUser?memId=${id}`, { method: 'DELETE' }) // 올바른 서버 URL 사용
        .then(() =>{
                
          BoardServer();
          
        }).catch(error => console.error('회원을 가져오는 중 오류 발생:', error));


    };


  
    return (
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>아이디</th>
            <th style={cellStyle}>이름</th>
            <th style={cellStyle}>생일</th>
            <th style={cellStyle}>가입 일자</th>
            <th style={cellStyle}></th>
          </tr>
        </thead>
        <tbody>
          {boardData.map(item => (
            <tr key={item.memId}>
              <td style={cellStyle}>{item.memId}</td>
              <td style={cellStyle}>{item.name}</td>
              <td style={cellStyle}>{item.birth}</td>
              <td style={cellStyle}>{item.singupDate}</td>
              <td style={cellStyle}>
                {item.otherInfo}
                <button style={redButtonStyle} onClick={() => onhandleDelete(item.memId)}>삭제</button>
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

  export default Board;