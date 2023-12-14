import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SERVER_URL } from 'js';
import { useCheckLogin } from 'js/useCheckLogin';

/* 여행 예약 기능 1번*/
/* - 여행 패키지 목록 페이지 */
function TravelPackList() {

    const navigate = useNavigate();

    /* <데이터를 받을 공간, 리스트에 나타낼 아이템들> */
    /* ----------------------------------------------------------- */

    // - 여행 패키지
    const [TravalPack, setTravalPack] = useState([]);

    // - 로딩
    const [loading, setLoading] = useState(true);

    const { checkIsLogin } = useCheckLogin();

    /* ----------------------------------------------------------- */

    useEffect(() => {

        // - 패키지여행 
        fetch(SERVER_URL + "travalpackAll", { method: 'GET' })
            .then(response => response.json())
            .then(data => { console.log(data); setTravalPack(data); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });

    }, []);
    /* ----------------------------------------------------------- */

    /* <패키지 여행, 회원 데이터 로딩 상태 관리> */
    if (loading) {
        return (
            <div>
                <p>데이터를 불러오는 중입니다...</p>
            </div>
        );
    }

    /* <패키지여행> */
    /* ----------------------------------------------------------------------- */
    // - 패키지 여행의 컬럼
    const columns = [
        // { field: 'packNum', headerName: '패키지 번호', width: 100 },
        { field: 'name', headerName: '패키지 이름', width: 200 },
        { field: 'price', headerName: '가격', width: 100 },
        { field: 'startDate', headerName: '예약기간(시작일)', width: 150 },
        { field: 'endDate', headerName: '예약기간(끝)', width: 150 },
        // { field: 'singupDate', headerName: '등록일자', width: 150 },
        { field: 'count', headerName: '최대인원', width: 100 },
        { field: 'smoke', headerName: '흡연실(금연실)', width: 120 },
        { field: 'address', headerName: '주소', width: 250 },
        { field: 'text', headerName: '상세내용', width: 150 },
        { field: 'person', headerName: '몇 인실', width: 150 },
        { field: 'reservation', headerName: '예약 가능한 상태', width: 150 },
        {
            field: 'packreservation',
            headerName: '예약하기',
            renderCell: row =>
                <div>
                    <Button onClick={() => { handleCellClick(row.row.packNum) }}>예약하기</Button>
                </div>
            ,
            width: 110,
        }
    ];

    // - 행 클릭시 해당되는 row.packNum 번호를 콘솔에 출력
    const handleCellClick = (params) => {
        if (!checkIsLogin()) {
            alert('로그인이 필요합니다');
            navigate(`/login`);
        } else {
            navigate(`/packreservation/reservation/${params}`);
        }

    };

    /* ----------------------------------------------------------------------- */

    return (
        <div>
            {/* 패키지 여행 목록 스타일 */}
            <div style={{
                marginLeft: "0%",
                marginRight: "0%",
                marginBottom: "3%",
                marginTop: "3%",
                textAlign: 'center',
                backgroundColor: 'white',
                border: '1px solid'
            }}>
                <h1>패키지 여행 목록</h1>
                <DataGrid
                    rows={TravalPack}
                    columns={columns}
                    getRowId={row => row.packNum}
                    checkboxSelection={false}
                    hideFooter={true} // 표의 푸터바 제거
                />
            </div>
        </div>
    );

};

export default TravelPackList;