import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { SERVER_URL } from 'js';
import { Link } from 'react-router-dom';
import { useCheckLogin } from 'js/useCheckLogin';
import { Button } from '@mui/material';

/* 여행 예약 기능 3번*/
/* 패키지 여행 예약 내역 목록 페이지*/
function Reservationlist() {

    // 패키지 여행 예약 목록
    const [Packreservation, setPackreservation] = useState([]);

    const { checkIsLogin, toLogin } = useCheckLogin();

    /* ----------------------------------------------------------------------- */

    /* 벡엔드에 Constructor에서 설정한 패키지여행 예약 목록 */
    useEffect(() => {

        const jwt = sessionStorage.getItem('jwt');

        if (jwt === undefined || jwt === '') {
            if (!checkIsLogin()) {
                toLogin();
            }
        }

        fetch(SERVER_URL + `getUser?jwt=${jwt}`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {

                /* 회원이 예약한 패키지 여행 내역 데이터 가져오기 */
                fetch(SERVER_URL + `packreservation/memberpackreservation/${data.memId}`, { method: 'POST' })
                    .then(response => response.json())
                    .then(data => { console.log(data); setPackreservation(data); })
                    .catch(err => { console.error(err); });

            }).catch(err => console.error(err));



    }, []);

    /* 패키지 여행 에약 목록 */
    /* ----------------------------------------------------------------------- */

    // 패키지 여행 에약 목록 컬럼
    const columns = [
        // { field: 'resNum', headerName: '예약 번호', width: 200 },
        { field: 'memId', headerName: '예약한 회원', width: 200 },
        { field: 'packName', headerName: '패키지 여행명', width: 200 },
        { field: 'startDate', headerName: '예약한 날', width: 200 },
        { field: 'dateCnt', headerName: '기간', width: 200 },
        { field: 'count', headerName: '인원수', width: 100 },
        {
            field: 'payment',
            headerName: '결제하기',
            renderCell: row =>
                <Link to={`/payment/${row.row.resNum}`}>
                    <Button>
                        결제하기
                    </Button>
                </Link>
            ,
            width: 110,
        }
    ];

    /* 행 클릭시 해당되는 row.resNum 번호를 콘솔에 출력 */
    // const handleCellClick = (params) => {
    //     const selectedResNum = params.row.resNum;
    //     console.log("Selected ResNum:", selectedResNum);
    //     // 여기서 선택한 ResNum을 사용하여 필요한 작업 수행
    // };

    /* ----------------------------------------------------------------------- */

    return (
        <div>

            {/* 패키지 여행 목록 스타일 */}
            <div style={{
                marginLeft: "23%",
                marginRight: "23%",
                marginBottom: "3%",
                marginTop: "1%",
                backgroundColor: 'white',
                border: '1px solid'
            }}>
                <h1>패키지 여행 예약 목록</h1>
                <DataGrid
                    rows={Packreservation}
                    columns={columns}
                    getRowId={row => row.resNum}
                    hideFooter={true} // 표의 푸터바 제거
                // onCellClick={handleCellClick} // 셀이 클릭되었을 때의 이벤트 핸들러
                />
            </div>
        </div>
    );
};

export default Reservationlist;