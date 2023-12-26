import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ModalComponent, ModalFunction, SERVER_URL, ToggleCell } from 'js';
import { usePagination, PaginationComponent } from 'js';

import HotelIcon from '@mui/icons-material/Hotel';
import { Button } from '@mui/material';
import './TravelPackList.css'; // CSS 파일을 임포트

/* 여행 예약 1번*/
/* - 여행 패키지 목록 페이지 */
function TravelPackList() {

    /* useState(함수의 상태관리), useNavigate(라우터 내에서 경로를 변경), ModalFunction(모달창의 열고 닫는 기능) */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    /* 여행 패키지 */
    const [TravalPack, setTravalPack] = useState([]);

    /* 축제 정보 */
    const [FestivalAll, setFestivalAll] = useState([]);

    // - FestivalAll에서 name, startDate, endDate 데이터만 출력하는 부분
    const FestivalfilteredData = FestivalAll.map(festivallist => ({
        name: festivallist.name,
        startDate: festivallist.startDate,
        endDate: festivallist.endDate
    }));
    console.log(FestivalfilteredData);

    /* 패키지 여행 데이터 로딩 */
    const [loading, setLoading] = useState(true);

    /* 페이지네이션 동작 */
    // - usePagination 함수를 호출하여 페이징에 필요한 상태와 함수들을 가져옵니다.
    const {
        currentPage,         // 현재 페이지를 나타내는 상태
        currentPageData,     // 현재 페이지에 해당하는 데이터를 담는 변수
        itemsPerPage,        // 페이지당 항목 수를 나타내는 값
        handlePageChange     // 페이지 변경을 처리하는 함수
    } = usePagination(TravalPack); // 여행 패키지 정보

    /* 부트 스트랩 팝업창 기능 */
    const { modalOpenMap, handleModalOpen, handleModalClose } = ModalFunction();

    const navigate = useNavigate(); // 페이지 이동을 위한 함수                            

    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    /* 벡엔드에 Controller(컨트롤러)에서 설정한 패키지여행의 전체 정보, 축제정보 불러오기 */
    useEffect(() => {
        fetch(SERVER_URL + "travalpackAll", { method: 'GET' })
            .then(response => response.json())
            .then(data => { setTravalPack(data); setLoading(false); })
            .catch(err => { console.error(err); setLoading(false); });

        fetch(SERVER_URL + "festivalAll", { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setFestivalAll(data); // 전체 데이터를 그대로 설정
                setLoading(false);
            })
            .catch(err => { console.error(err); setLoading(false); });

    }, []);

    /* 패키지 여행 로딩 상태 관리 */
    if (loading) {
        return (
            <div>
                <p>패키지 여행 데이터를 불러오는 중입니다...</p>
            </div>
        );
    }

    /* 행의 예약하기 버튼 클릭시 여행 예약 페이지로 이동(로그인이 안되어 있으면 로그인창으로 보내기)*/
    const handleCellClick = (params) => {
        const jwt = sessionStorage.getItem('jwt');

        if (!jwt) {
            alert('로그인이 필요합니다');
            navigate('/login');
            return;
        }
        else {
            navigate(`/packreservation/reservation/${params}`);
        }
    };

    /* 패키지 여행 삭제 */
    const handleDelete = (packNum) => {
        fetch(SERVER_URL + `travalpack/${packNum}`, { method: 'DELETE' })

            .then(response => {
                if (response.ok) {
                    const updatedTravalPack = TravalPack.filter(deletetravalpack => deletetravalpack.packNum !== packNum);
                    setTravalPack(updatedTravalPack);
                    alert('패키지 여행 ' + packNum + '번 이 성공적으로 삭제되었습니다.');
                } else {
                    alert('패키지 여행을 삭제하는 중 오류가 발생했습니다.');
                }
            })
            .catch(err => alert(err))
    };

    /* 패키지 여행의 컬럼 */
    const columns = [
        {
            field: 'image', // 이미지 필드가 있다고 가정
            headerName: '여행 이미지',
            width: 300,

            renderCell: (params) => {
                const festivalData = FestivalfilteredData.find(festivallist => festivallist.name === params.row.festivalname);

                return (
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
                            festivalDatas={festivalData} // festivalData 추가
                        />
                    </div>
                );
            },
        },
        { // 한개의 컬럼에 여러 컬럼의 정보를 출력
            field: 'travelinformation',
            headerName: '여행 정보',
            width: 900,
            renderCell: (params) => {
                const festivalData = FestivalfilteredData.find(festivallist => festivallist.name === params.row.festivalname);
                return (
                    <div className="travelinformation">
                        <p>{params.row.name}</p>
                        {/* 클릭시'금액'과 '한국 통화 형식'변환 */}
                        <p className='inform2'>가격:</p><p className='inform3'><ToggleCell value={params.row.price} /></p>
                        <p>숙박기간: {params.row.startDate} ~ {params.row.endDate}</p>
                        <p>최대인원: {params.row.count}</p>
                        <p>흡연실(금연실): {params.row.smoke}</p>
                        <p>몇 인실: {params.row.person}</p>
                        <p>예약 가능한 상태: {params.row.reservation}</p>
                        <p>축제: {params.row.festivalname}</p>
                        <p>축제기간: {festivalData.startDate} ~ {festivalData.endDate}</p>
                    </div>
                );
            },
        },
        {
            field: 'packreservation',
            headerName: '예약하기',
            renderCell: row =>
                <Button onClick={() => { handleCellClick(row.row.packNum) }}>
                    <h1 className='button-font'>예약하기</h1>
                </Button>
            ,
            width: 110,
        },
        {
            field: 'travalpackdelete',
            headerName: '삭제하기',
            renderCell: row =>
                <Button onClick={() => { handleDelete(row.row.packNum) }}>
                    <h1 className='button-font'>삭제하기</h1>
                </Button>
            ,
            width: 110,
        }
    ];

    /* 화면 출력 */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    return (
        <div>

            {/* 패키지 여행 목록 */}
            <div className="PackageTravelList">
                <h1 className="traval-pack-list-header">
                    <HotelIcon fontSize='large' className='custom-hotel-icon' /> 숙소 목록
                </h1>

                {/* DataGrid를 이용한 여행 패키지 목록 표시 */}
                {TravalPack.length === 0 ? ( // TravalPack(패키지 여행)의 데이터가 없으면 p 있으면 DataGrid를 출력
                    <div>
                        <p>표시할 패키지 여행 데이터가 없습니다.</p>
                        <p>패키지 여행 데이터를 등록해주세요.</p>
                    </div>
                ) : (
                    <DataGrid
                        className="hideHeaders" // 컬럼 헤더 숨기기
                        rows={currentPageData} // 표시할 행 데이터
                        columns={columns}// 열(컬럼) 설정
                        getRowId={row => row.packNum}// 각 행의 고유 ID 설정
                        checkboxSelection={false} // 체크박스(false(비활성화))
                        hideFooter={true} // 표의 푸터바 제거
                        getRowHeight={params => 400} // DataGrid의 특정 행의 높이를 100 픽셀로 설정(CSS로 분리불가)
                    />
                )}
            </div>

            {/* 페이징(페이지 네이션) */}
            <PaginationComponent
                count={Math.ceil(TravalPack.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
            />
        </div>
    );

};

export default TravelPackList;
