import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Board = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Mariadb에서 데이터를 불러오는 API 엔드포인트에 대한 경로를 정확하게 지정해주어야 합니다.
    axios.get('http://localhost:8090/api/blacklist')
      .then(response => {
        // 데이터 형식을 id: 1, name: 'User1', reason: 'Violation of rules'로 수정
        const modifiedData = response.data.map((item, index) => ({
          id: index + 1,
          name: `User${index + 1}`,
          reason: item.reason,
          isBlocked: item.isBlocked,
        }));
        setData(modifiedData);
      })
      .catch(error => {
        console.error('데이터를 가져오는 중 오류 발생: ', error);
      });
  }, []);

  const handleToggleBlock = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, isBlocked: !item.isBlocked } : item
      )
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <p>블랙 리스트</p>
      <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%', backgroundColor: 'gray' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>번호</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>이름</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>사유</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>차단 여부</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>차단 해제</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} style={{ border: '1px solid black' }}>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.id}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.name}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.reason}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center', backgroundColor: item.isBlocked ? 'red' : 'green' }}>
                {item.isBlocked ? '차단됨' : '차단 안됨'}
              </td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                <button onClick={() => handleToggleBlock(item.id)}>
                  {item.isBlocked ? '차단 해제' : '차단'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전 페이지
        </button>
        <span style={{ margin: '0 10px' }}>
          페이지 {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
};

export default Board;