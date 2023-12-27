

// http://localhost:8090/api/packReservations에서 가져오는 코드

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservationInfo.css'; // 새로운 CSS 파일 추가
import FaceIcon from '@mui/icons-material/Face';
const ReservationInfo = () => {
  // 사용자 정보 및 초기 상태 설정
  const [userInfo, setUserInfo] = useState({
    userId: 'user123',
    name: 'John Doe',
    // 기타 사용자 정보
  });
  // 예약 정보 및 필터링을 위한 상태 설정
  const [reservations, setReservations] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 5;
  const rowsPerPage = 1;

  useEffect(() => {
    // 예약 정보를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/packReservations');
        const data = response.data;

        // 데이터가 배열인지 확인하고 reservations 상태로 설정합니다.
        if (Array.isArray(data._embedded.packReservations)) {
          setReservations(data._embedded.packReservations);
        } else {
          console.error('잘못된 데이터 형식: 배열이 예상되었습니다.');
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);
  // 시작 날짜 변경 핸들러
  const handleStartDateChange = (e) => {
    setSelectedStartDate(e.target.value);
    setCurrentPage(1);
  };
  // 종료 날짜 변경 핸들러
  const handleEndDateChange = (e) => {
    setSelectedEndDate(e.target.value);
    setCurrentPage(1);
  };
  // 선택된 날짜 범위로 예약 필터링
  const filterReservationsByDateRange = () => {
    if (!selectedStartDate || !selectedEndDate) {
      return [];
    }

    const filtered = reservations.filter((reservation) => {
      return (
        reservation.startDate >= selectedStartDate &&
        reservation.startDate <= selectedEndDate
      );
    });

    return filtered;
  };
  // 배열을 페이지에 맞게 자르는 함수
  const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };
  // 선택된 날짜 범위로 필터링된 예약 정보
  const filteredReservations = filterReservationsByDateRange();
  const totalPages = Math.ceil(filteredReservations.length / reservationsPerPage);
  // 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="my-page-container">
      <div>
        <h3 className='user-information'><FaceIcon fontSize='large' /> 회원 정보</h3>
        <p className='user-information-id'>User ID : {userInfo.userId}</p>
        <p className='user-information-id'>Name : {userInfo.name}</p>
      </div>

      <div>
        <h3 className='date-information'>날짜 범위 선택</h3>
        <label className='stdate-style' htmlFor="startDate">시작 날짜:</label>
        <input
          type="date"
          id="startDate"
          value={selectedStartDate}
          onChange={handleStartDateChange}
        />
        <label className='stdate-style' htmlFor="endDate">종료 날짜:</label>
        <input
          type="date"
          id="endDate"
          value={selectedEndDate}
          onChange={handleEndDateChange}
        />
      </div>

      <div>
        <h3>예약 정보</h3>
        {filteredReservations.length === 0 ? (
          <p>선택된 기간에 예약된 서비스가 없습니다.</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>회원</th>
                  <th>숙박 기간</th>
                  <th>예약한 인원</th>
                  <th>예약한 날</th>
                </tr>
              </thead>
              <tbody>
                {paginate(filteredReservations, reservationsPerPage, currentPage).map((reservation) => (
                  <tr key={reservation.memId}>
                    <td>{reservation.memId}</td>
                    <td>{reservation.dateCnt}</td>
                    <td>{reservation.count}</td>
                    <td>{reservation.startDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReservationInfo;