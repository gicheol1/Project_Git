import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

import { SERVER_URL } from 'js';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import './Paymenthistory.css';
/* 결제 기능 2번(결제 내역)*/
/* - 결제 내역 페이지 */
function Paymenthistory() {

    /* useState(함수의 상태관리), useNavigate(라우터 내에서 경로를 변경), ModalFunction(모달창의 열고 닫는 기능) */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    /* 결제 정보 */
    const [paymentinformation, setPaymentinformation] = useState([]);

    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    /* 벡엔드에 Controller(컨트롤러)에서 설정한 결제내역 정보 불러오기 */
    useEffect(() => {
        fetch(SERVER_URL + "payment", { method: 'GET' })
            .then(response => response.json())
            .then(data => { setPaymentinformation(data); })
            .catch(err => { console.error(err); });

    }, []);

    /* 패키지 여행의 컬럼 */
    const columns = [
        { field: 'paymentNum', headerName: '결제 번호', width: 100, headerClassName: 'All-user-pay-column', sortable: false, },
        { field: 'resNum', headerName: '예약번호', width: 100, headerClassName: 'All-user-pay-column', sortable: false, },
        { field: 'payamount', headerName: '결제 금액', width: 100, headerClassName: 'All-user-pay-column', sortable: false, },
        { field: 'paydate', headerName: '결제 일', width: 200, headerClassName: 'All-user-pay-column', sortable: false, },
        { field: 'cardnumber', headerName: '카드 번호', width: 200, headerClassName: 'All-user-pay-column', sortable: false, },
    ];

    /* 화면 출력 */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    return (
        <div>
            {/* 패키지 여행 목록 */}
            <div>
                <h1 className='All-user-pay'>
                    <CreditScoreIcon fontSize='large' /> 전체 사용자 결제 내역
                </h1>
                {/* DataGrid를 이용한 여행 패키지 목록 표시 */}
                <DataGrid
                    className='DataGrid-color'
                    rows={paymentinformation} // 표시할 행 데이터
                    columns={columns}// 열(컬럼) 설정
                    getRowId={row => row.paymentNum}// 각 행의 고유 ID 설정
                    checkboxSelection={false} // 체크박스(false(비활성화))
                    hideFooter={true} // 표의 푸터바 제거
                    // getRowHeight={params => 400} // DataGrid의 특정 행의 높이를 100 픽셀로 설정(CSS로 분리불가)
                    disableColumnMenu={true}
                />
            </div>
        </div>
    );

};

export default Paymenthistory;
