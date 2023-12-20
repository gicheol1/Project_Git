import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SERVER_URL } from 'js';
import { useCheckLogin } from 'js/useCheckLogin';

import LuggageIcon from '@mui/icons-material/Luggage';
import { Pagination, Stack } from '@mui/material';
import ReactModal from 'react-modal';
import './TravelPackList.css'; // CSS 파일을 임포트

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

    // 페이지네이션 상태 설정
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // 페이지네이션 함수
    const getRows = () => {
        const startIndex = (page - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        return TravalPack.slice(startIndex, endIndex);
    };

    /* 리액트 (모달) 팝업창 */
    /*▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤*/
    const [modalOpenMap, setModalOpenMap] = useState({}); // 행별 모달 상태를 관리할 객체

    const handleImageClick = (params) => {
        const packNum = params.row.packNum;
        if (!modalOpenMap[packNum]) {
            handleModalOpen(packNum);
        } else {
            handleModalClose(packNum);
        }
    };

    const handleModalOpen = (rowId) => {
        const updatedMap = { ...modalOpenMap, [rowId]: true }; // 해당 행의 모달을 열도록 상태 업데이트
        setModalOpenMap(updatedMap);
    };

    const handleModalClose = (rowId) => {
        const updatedMap = { ...modalOpenMap, [rowId]: false }; // 해당 행의 모달을 닫도록 상태 업데이트
        setModalOpenMap(updatedMap);
    };
    /*▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤*/
    /* ----------------------------------------------------------- */

    useEffect(() => {
        // - 패키지여행 
        fetch(SERVER_URL + "travalpackAll", { method: 'GET' })
            .then(response => response.json())
            .then(data => { setTravalPack(data); setLoading(false); })
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
    /*▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤*/
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
    /*▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤*/

    /* <패키지여행> */
    /* ----------------------------------------------------------------------- */
    // - 패키지 여행의 컬럼
    const columns = [
        {
            field: 'image', // 이미지 필드가 있다고 가정
            headerName: '여행 이미지',
            width: 300,
            renderCell: (params) => (
                <div className="image-cell">
                    {/* 테스트용 이미지 */}
                    <img class="custom-image"
                        src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004"
                        alt="축제이미지"
                        onClick={() => handleImageClick(params)} // 이미지 클릭 시 handleImageClick(params) 실행

                    />
                    {/* 팝업(모달) 창 */}
                    <ReactModal
                        isOpen={modalOpenMap[params.row.packNum] || false}
                        onRequestClose={() => handleModalClose(params.row.packNum)}
                        className="custom-modal" // - CSS 적용
                        style={{ // - CSS로 분리시 동작을 안한다.
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0)', // 오버레이 배경 색상과 투명도 설정
                            },
                        }}

                    >
                        <p>패키지번호: {params.row.packNum}</p>
                        <p>패키지이름: {params.row.name}</p>
                        {/* 클릭시'금액'과 '한국 통화 형식'변환 */}
                        <p>가격:<ToggleCell text="가격:" value={params.row.price} /></p>
                        <p>숙박기간: {params.row.startDate} ~ {params.row.endDate}</p>
                        <p>최대인원: {params.row.count}</p>
                        <p>흡연실(금연실): {params.row.smoke}</p>
                        <p>주소: {params.row.address}</p>
                        <p>상세내용: {params.row.text}</p>
                        <p>몇 인실: {params.row.person}</p>
                        <p>예약 가능한 상태: {params.row.reservation}</p>
                        <p>등록일자: {params.row.singupDate}</p>
                        {/* 닫기 버튼 */}
                        <button onClick={() => handleModalClose(params.row.packNum)}>닫기</button>
                    </ReactModal>
                </div>
            ),
        },
        { // 한개의 컬럼에 여러 컬럼의 정보를 출력
            field: 'travelinformation',
            headerName: '여행 정보',
            width: 900,
            renderCell: (params) => (
                <div className="travelinformation">
                    <p>{params.row.name}</p>
                    {/* 클릭시'금액'과 '한국 통화 형식'변환 */}
                    <p>가격<ToggleCell value={params.row.price} /></p>
                    <p>숙박기간: {params.row.startDate} ~ {params.row.endDate}</p>
                    <p>최대인원: {params.row.count}</p>
                    <p>흡연실(금연실): {params.row.smoke}</p>
                    <p>몇 인실: {params.row.person}</p>
                    <p>예약 가능한 상태: {params.row.reservation}</p>
                </div>
            ),
        },
        {
            field: 'packreservation',
            headerName: '예약하기',
            renderCell: row =>
                <div>
                    <button className="button-hover" onClick={() => { handleCellClick(row.row.packNum) }}>예약하기</button>
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
            <div className="PackageTravelList"> {/* 패키지 여행 목록 스타일 */}
                <h1 className="traval-pack-list-header"><LuggageIcon fontSize='large' className='custom-luggage-icon' /> 여행 패키지 목록 </h1>
                <DataGrid
                    className="hideHeaders" // 컬럼 헤더 숨기기
                    rows={getRows()} // 
                    columns={columns}
                    getRowId={row => row.packNum}
                    checkboxSelection={false} // 체크박스(false(비활성화))
                    hideFooter={true} // 표의 푸터바 제거
                    getRowHeight={params => 400} // DataGrid의 특정 행의 높이를 100 픽셀로 설정(CSS로 분리불가)
                />
            </div>

            {/* 페이지징 */}
            <div className="stackContainer">
                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(TravalPack.length / rowsPerPage)}
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        variant="outlined"
                        shape="rounded"
                    />
                </Stack>
            </div>

        </div>
    );

};

export default TravelPackList;
