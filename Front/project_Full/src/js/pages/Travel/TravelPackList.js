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

    /* 금액 표시 */
    const formatPrice = (price) => {
        //가격을 만원, 천원으로 분리
        const unit = price >= 10000 ? '만' : '';
        const mainPrice = Math.floor(price / (unit === '만' ? 10000 : 1000)); //만 단위로 표시하면 만 단위의 가격을 계산, 그 외에는 천 단위로 계산
        const remainder = price % (unit === '만' ? 10000 : 1000); //remainder: 만 단위로 표시되면 가격을 1만으로 나눈 나머지를, 그렇지 않으면 1천으로 나눈 나머지를 계산

        // 포맷된 문자열 생성
        const formattedPrice = `${mainPrice}${unit}${remainder > 0 ? ` ${remainder}` : ''}원`; //가격 문자열

        return formattedPrice;
    };

    /*datagrid의 행의 금액에 대한 '금액'과 '한국 통화 형식'변환*/
    const ToggleCell = ({ value }) => {
        const [toggle, setToggle] = useState(false);

        const handleClick = () => {
            setToggle(!toggle);
        };

        return (
            <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                {toggle ? value.toLocaleString() + `원` : formatPrice(value)}
            </div>
        );
    };

    /* <패키지여행> */
    /* ----------------------------------------------------------------------- */
    // - 패키지 여행의 컬럼
    const columns = [
        // { field: 'packNum', headerName: '패키지 번호', width: 100 },
        { field: 'name', headerName: '패키지 이름', width: 200 },
        { field: 'price', headerName: '가격', width: 100, renderCell: (params) => < ToggleCell value={params.value} /> }, // 클릭시'금액'과 '한국 통화 형식'변환
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
                    checkboxSelection={false} // 체크박스(false(비활성화))
                    hideFooter={true} // 표의 푸터바 제거
                />
            </div>
        </div>
    );

};

export default TravelPackList;