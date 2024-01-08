import FaceIcon from '@mui/icons-material/Face';
import { Button } from '@mui/material';

import { DataGrid } from '@mui/x-data-grid';

import { ModalComponent, ModalFunction, SERVER_URL, ToggleCell } from 'js';
import { useCheckLogin } from 'js/useCheckLogin';
import { usePagination, PaginationComponent } from 'js';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import "./Reservationlist.css";
import { useReservationlist } from './useReservationlist';

/* 여행 예약 3번*/
/* - 패키지 여행 예약 내역 목록 페이지*/
function Reservationlist() {

    /* useState(함수의 상태관리), ModalFunction(모달창의 열고 닫는 기능) */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    const [Packreservation, setPackreservation] = useState([]); // 패키지 여행 예약 목록

    const { toLogin } = useCheckLogin(); // 로그인 체크

    const [userName, setUserName] = useState(''); // 회원 이름 

    /* 부트스트렙을 이용한 모달 팝업창 동작 */
    const { modalOpenMap, handleModalOpen, handleModalClose } = ModalFunction();

    /* 페이지네이션 동작 */
    // - usePagination 함수를 호출하여 페이징에 필요한 상태와 함수들을 가져옵니다.
    const {
        currentPage,         // 현재 페이지를 나타내는 상태
        currentPageData,     // 현재 페이지에 해당하는 데이터를 담는 변수
        itemsPerPage,        // 페이지당 항목 수를 나타내는 값
        handlePageChange     // 페이지 변경을 처리하는 함수
    } = usePagination(Packreservation); // 패키지 예약 정보

    const { getUser, getReservations, getFilePack, cancelReservation } = useReservationlist();

    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    /* 벡엔드에 Controller(컨트롤러)에서 설정한 회원이 예약한 패키지여행 예약 목록 불러오기 */
    useEffect(() => {
        if (!getData()) { toLogin(); }
    }, []);

    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    /* 회원정보 가져오기 */
    const getData = async (resNum) => {
        const user = await getUser(resNum);

        if (user === undefined || user === false) { return false; }

        setUserName(user.name);
        const result = await getReservations(user.memId);

        if (result !== undefined) {

            console.log(result);

            for (const res of result) {
                const img = await getFilePack(res.packNum);

                if (img === undefined) {
                    setPackreservation(p => p !== undefined ? [...p, { ...res }] : [{ ...res }]);
                } else {
                    setPackreservation(p => p !== undefined ? [...p, { ...res, ...img }] : [{ ...res, ...img }]);
                }
            }
        }
    };

    /* 패키지 여행 예약 취소 */
    const handleCancel = async (resNum) => {
        const res = await cancelReservation(resNum);

        if (res.ok) {
            const updatedPackreservation = Packreservation.filter(deletetravalpack => deletetravalpack.resNum !== resNum);
            setPackreservation(updatedPackreservation);
            alert('패키지 여행 예약 번호 ' + resNum + '번 이 성공적으로 삭제되었습니다.');
        } else {
            alert('패키지 여행 예약을 삭제하는 중 오류가 발생했습니다.');
        }
    };

    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    /*패키지 여행 에약 목록 컬럼*/
    const columns = [
        {
            field: 'image', // 이미지 필드가 있다고 가정
            headerName: '여행 이미지',
            width: 300,
            renderCell: (params) => (
                <div className="image-cell">
                    {params.row.imgFile === undefined ?
                        <img class="custom-image"
                            src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004"
                            alt="축제이미지"
                            onClick={() => handleModalOpen(params.row.packNum)} // 모달 열기 함수 호출
                        />
                        :

                        <img class="custom-image"
                            src={`data:image/png;base64,${params.row.imgFile}`}
                            alt={params.row.orgFile}
                            onClick={() => handleModalOpen(params.row.packNum)} // 모달 열기 함수 호출
                        />
                    }

                    {/* 부트 스트랩의 모달 폼 */}
                    <ModalComponent
                        showModal={modalOpenMap[params.row.resNum]}
                        handleClose={() => handleModalClose(params.row.resNum)}
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
                    <p>숙소: {params.row.packName}</p>
                    <p>회원: {params.row.memId}</p>
                    <p>숙박 기간: {params.row.dateCnt}</p>
                    <p>예약한 인원: {params.row.count}</p>
                    <p>예약한 날: {params.row.startDate}</p>
                    <p className='inform2'>가격:</p><p className='inform3'><ToggleCell value={params.row.price} /></p>
                    <p style={{ float: 'left', marginRight: '5px' }}>결제 금액: </p><ToggleCell value={params.row.price * params.row.count} />
                    {/* 참고: https://ojji.wayful.com/2013/12/HTML-set-Two-Parallel-DIVs-columns.html */}
                </div>
            ),
        },
        {
            field: 'payment',
            headerName: '결제하기',
            renderCell: row =>
                <Link to={`/payment/${row.row.resNum}`}>
                    <Button>
                        <h1 className='pay-button'>결제하기</h1>
                    </Button>
                </Link>
            ,
            width: 110,
            headerClassName: 'column-header',
            sortable: false,
            headerAlign: 'center',
        },
        {
            field: 'packreservationcancel',
            headerName: '예약 취소',
            renderCell: row =>
                <Button onClick={() => { handleCancel(row.row.resNum) }}>
                    <h1 className='button-font'>예약 취소</h1>
                </Button>
            ,
            width: 110,
        }

    ];

    /* 화면 출력 */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    return (
        <div>
            <h1 className='reserve-list-header'>
                <FaceIcon fontSize='large' /> {userName}님의 숙소 예약 목록
            </h1>

            {/* 패키지 여행 예약 목록 */}
            <div className='reserve-list'>
                <DataGrid
                    className="hideHeaders" // 컬럼 헤더 숨기기
                    rows={currentPageData} // currentPageData: 현재 페이지에 해당하는 데이터가 담긴 변수입니다.            
                    // rows={Packreservation} // Packreservation: 전체 데이터가 담긴 변수입니다. currentPageData는 이 데이터에서 현재 페이지의 일부를 나타냅니다.
                    columns={columns}
                    getRowId={row => row.resNum}
                    hideFooter={true} // 표의 푸터바 제거
                    getRowHeight={params => 320} // DataGrid의 특정 행의 높이를 100 픽셀로 설정(CSS로 분리불가)
                    disableColumnMenu // 컬럼메뉴 비활성화
                />
            </div>

            {/* 페이징(페이지 네이션) */}
            <PaginationComponent
                count={Math.ceil(Packreservation.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
            />

        </div>
    );
};

export default Reservationlist;