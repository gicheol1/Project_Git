import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SERVER_URL, ToggleCell } from 'js';
import { useCheckLogin } from 'js/useCheckLogin';

import LuggageIcon from '@mui/icons-material/Luggage';
import { Button, Pagination, Stack } from '@mui/material';
import { ModalComponent } from 'js';
import './TravelPackList.css'; // CSS 파일을 임포트
import { ModalFunction } from 'js';

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

    /* 부트 스트랩 팝업창 기능 */
    const { modalOpenMap, handleModalOpen, handleModalClose } = ModalFunction();
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
                        onClick={() => handleModalOpen(params.row.packNum)} // 모달 열기 함수 호출
                    />
                    <ModalComponent
                        showModal={modalOpenMap[params.row.packNum]}
                        handleClose={() => handleModalClose(params.row.packNum)}
                        selectedImage={"https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004"}
                        params={params}
                    />
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
                    <p className='inform2'>가격:</p><p className='inform3'><ToggleCell value={params.row.price} /></p>
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
                // <div>
                    <Button onClick={() => { handleCellClick(row.row.packNum) }}><h1 className='button-font'>예약하기</h1></Button>
                // </div>
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
