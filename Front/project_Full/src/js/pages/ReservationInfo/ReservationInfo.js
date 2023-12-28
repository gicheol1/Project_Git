
import React, { useState, useEffect } from 'react';
import FaceIcon from '@mui/icons-material/Face';

import { Pagination } from '@mui/material';
import { useReservationInfo } from './useReservationInfo';
import { useNavigate } from 'react-router-dom';

import './ReservationInfo.css'; // 새로운 CSS 파일 추가

const ReservationInfo = () => {

    const navigate = useNavigate();

    // 사용자 정보 및 초기 상태 설정
    const [userInfo, setUserInfo] = useState();

    // 예약 정보와 갯수
    const [reservations, setReservations] = useState([]);
    const [reservationCnt, setReservationCnt] = useState([]);

    // 필터링을 위한 상태 설정
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // 페이지
    const [currentPage, setCurrentPage] = useState(1);

    const {
        getUser,

        getPackReserv,
        getPackReservCnt,

        getPackReservDate,
        getPackReservDateCnt
    } = useReservationInfo();

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    useEffect(() => {
        getUser().then(res => {
            if (res === false) { navigate('/login'); }
            else if (res === undefined) { navigate('/') }

            setUserInfo(res);

        })

    }, []);

    useEffect(() => {

        if (userInfo === undefined) { return; }

        getPackReserv(0, userInfo.memId).then(res => setReservations(res));
        getPackReservCnt(userInfo.memId).then(res => setReservationCnt(res));
    }, [userInfo]);

    useEffect(() => {

        if (startDate === '' || endDate === '') { return; }

        getPackReservDate(0, userInfo.memId, startDate, endDate).then(res => setReservations(res));
        getPackReservDateCnt(userInfo.memId, startDate, endDate).then(res => setReservationCnt(res));

    }, [startDate, endDate]);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 시작 날짜 변경 핸들러
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        setCurrentPage(1);
    };

    // 종료 날짜 변경 핸들러
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        setCurrentPage(1);

    };

    // 선택된 날짜 범위로 예약 필터링
    const filterReservationsByDateRange = () => {
        if (!startDate || !endDate) {
            return [];
        }

        const filtered = reservations.filter((reservation) => {
            return (
                reservation.startDate >= startDate &&
                reservation.startDate <= endDate
            );
        });

        return filtered;
    };

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    if (userInfo === undefined) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="my-page-container">
                <div className="info-container">
                    <h3 className='user-information'><FaceIcon fontSize='large' /> 회원 정보</h3>
                    <p className='user-information-id'>User ID : {userInfo.memId}</p>
                    <p className='user-information-id'>Name : {userInfo.name}</p>
                </div>

                <div>
                    <h3 className='date-information'>날짜 범위 선택</h3>
                    <div>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            max={endDate}
                            onChange={handleStartDateChange}
                        />
                        <label className='stdate-style' htmlFor="endDate"> ~ </label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            min={startDate}
                            onChange={handleEndDateChange}
                            disabled={startDate === '' ? true : false}
                        />
                    </div>
                </div>

                <div style={{ width: '800px' }}>
                    <h3 className='reserve-information'>예약 정보</h3>
                    {reservations === undefined || reservations.length === 0 ? (
                        <p>선택된 기간에 예약된 서비스가 없습니다.</p>
                    ) : (
                        <>
                            <table className='reserve-table'>
                                <thead>
                                    <tr>
                                        <th>회원</th>
                                        <th>숙박 기간</th>
                                        <th>예약한 인원</th>
                                        <th>예약한 날</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map((reservation) => (
                                        <tr key={reservation.memId}>
                                            <td>{reservation.memId}</td>
                                            <td>{reservation.dateCnt}</td>
                                            <td>{reservation.count}</td>
                                            <td>{reservation.startDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination
                                className="page-container"
                                count={reservationCnt % 10 !== 0 ? Math.ceil(reservationCnt / 10) : reservationCnt / 10}
                                page={currentPage}
                                onChange={handlePageChange}
                            />
                        </>
                    )}
                </div>
            </div>
        );
    }
};

export default ReservationInfo;