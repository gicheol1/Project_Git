//FestivalList.js

// 이미지 가져오기
import seoul_festival1 from './img/seoul_festival1.jpg';
import seoul_festival2 from './img/seoul_festival2.jpg';
import seoul_festival3 from './img/seoul_festival3.jpg';


import busan_festival1 from './img/busan_festival1.jpg';
import busan_festival2 from './img/busan_festival2.jpg';
import busan_festival3 from './img/busan_festival3.jpg';

import incheon_festival1 from './img/incheon_festival1.jpg';
import incheon_festival2 from './img/incheon_festival2.jpg';
import incheon_festival3 from './img/incheon_festival3.jpg';
import React, { useState } from 'react';

const FestivalList = ({ region }) => {
  const festivalsByRegion = {
    서울: [
      { name: '서울 축제 1', time: '2023-01-01', image: seoul_festival1 },
      { name: '서울 축제 2', time: '2023-02-01', image: seoul_festival2 },
      { name: '서울 축제 3', time: '2023-03-01', image: seoul_festival3 },
    ],
    부산: [
      { name: '부산 축제 1', time: '2023-01-15', image: busan_festival1 },
      { name: '부산 축제 2', time: '2023-02-15', image: busan_festival2 },
      { name: '부산 축제 3', time: '2023-03-15', image: busan_festival3 },
    ],
    인천: [
      { name: '인천 축제 1', time: '2023-01-20', image: incheon_festival1 },
      { name: '인천 축제 2', time: '2023-02-20', image: incheon_festival2 },
      { name: '인천 축제 3', time: '2023-03-20', image: incheon_festival3 },
    ],
    // 다른 지역들에 대한 축제 데이터도 추가
  };

  const [selectedFestival, setSelectedFestival] = useState(null);

  const festivals = festivalsByRegion[region];

  const handleDelete = (index) => {
    const updatedFestivals = [...festivals];
    updatedFestivals.splice(index, 1);
    festivalsByRegion[region] = updatedFestivals;
    setSelectedFestival(null);
  };

  const handleEdit = (index) => {
    const festivalToEdit = festivals[index];
    setSelectedFestival({ ...festivalToEdit, index });
  };

  const handleSave = (updatedFestival) => {
    const updatedFestivals = [...festivals];
    updatedFestivals[selectedFestival.index] = updatedFestival;
    festivalsByRegion[region] = updatedFestivals;
    setSelectedFestival(null);
  };

  // 페이지네이션을 위한 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(festivals.length / itemsPerPage);

  // 현재 페이지에 해당하는 축제 목록 추출
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFestivals = festivals.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };


  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{region}의 축제 목록</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {currentFestivals.map((festival, index) => (
          <li key={index} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ marginRight: '10px' }}>
              <img
                src={festival.image}
                alt={festival.name}
                style={{ maxWidth: '100px', maxHeight: '100px' }}
              />
            </div>
            <div>
              <strong>{festival.name}</strong>
              <p>시간: {festival.time}</p>
              <div style={{ textAlign: 'center' }}>
                <button onClick={() => handleDelete(index)}>삭제</button>
                <button onClick={() => handleEdit(index)}>수정</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 컴포넌트 */}
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          이전
        </button>
        <span style={{ margin: '0 10px' }}>{currentPage} / {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>

      {selectedFestival && (
        <div>
          <h3>축제 수정</h3>
          <label>이름:</label>
          <input
            type="text"
            value={selectedFestival.name}
            onChange={(e) => setSelectedFestival({ ...selectedFestival, name: e.target.value })}
          />
          <label>시간:</label>
          <input
            type="text"
            value={selectedFestival.time}
            onChange={(e) => setSelectedFestival({ ...selectedFestival, time: e.target.value })}
          />
          <button onClick={() => handleSave(selectedFestival)}>저장</button>
          <button onClick={() => setSelectedFestival(null)}>취소</button>
        </div>
      )}
    </div>
  );
};

export default FestivalList;
