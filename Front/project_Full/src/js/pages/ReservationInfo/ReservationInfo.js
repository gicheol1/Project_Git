import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservationInfo.css'; // 새로운 CSS 파일 추가
import FaceIcon from '@mui/icons-material/Face';
const ReservationInfo = () => {
  const [userInfo, setUserInfo] = useState({
    userId: 'user123',
    name: 'John Doe',
    // 기타 사용자 정보
  });

  const [reservations, setReservations] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 5;
  const rowsPerPage = 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/reservations');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStartDateChange = (e) => {
    setSelectedStartDate(e.target.value);
    setCurrentPage(1);
  };

  const handleEndDateChange = (e) => {
    setSelectedEndDate(e.target.value);
    setCurrentPage(1);
  };

  const filterReservationsByDateRange = () => {
    if (!selectedStartDate || !selectedEndDate) {
      return [];
    }

    const filtered = reservations.filter((reservation) => {
      return (
        reservation.date >= selectedStartDate &&
        reservation.date <= selectedEndDate
      );
    });

    return filtered;
  };

  const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  };

  const filteredReservations = filterReservationsByDateRange();
  const totalPages = Math.ceil(filteredReservations.length / reservationsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="my-page-container">
      <div>
        <h3 className='user-information'><FaceIcon fontSize='large'/> 회원 정보</h3>
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
        <h3 className='reserve-information'>예약 정보</h3>
        {filteredReservations.length === 0 ? (
          <p>선택된 기간에 예약된 서비스가 없습니다.</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>시간</th>
                  <th>제목</th>
                  <th>가격</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {paginate(filteredReservations, reservationsPerPage, currentPage).map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.date}</td>
                    <td>{reservation.time}</td>
                    <td>{reservation.service}</td>
                    <td>${reservation.price}</td>
                    <td>{reservation.status}</td>
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