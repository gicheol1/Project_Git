import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ConnectionLog.css';
import RestoreIcon from '@mui/icons-material/Restore';
const ConnectionLog = () => {
  const [recentConnections, setRecentConnections] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8090/api/connectionLogs')
      .then(response => setRecentConnections(response.data))
      .catch(error => console.error('최근 연결 내역을 가져오는 중 에러 발생:', error));
  }, []);

  return (
    <div>
      <h2 className='current-see'><RestoreIcon fontSize='large'/> 최근 본 내역</h2>
      <div className="table-container">
        {Array.isArray(recentConnections) && recentConnections.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>사용자 이름</th>
                <th>로그인 시간</th>
              </tr>
            </thead>
            <tbody>
              {recentConnections.map(connection => (
                <tr key={connection.id}>
                  <td>{connection.id}</td>
                  <td>{connection.username}</td>
                  <td>{connection.loginTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>데이터를 불러오는 중이거나 데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ConnectionLog;