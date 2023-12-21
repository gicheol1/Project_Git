import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { ModalComponent, SERVER_URL } from 'js';
import { Link } from 'react-router-dom';
import { useCheckLogin } from 'js/useCheckLogin';
import { Button } from '@mui/material';
import "./Reservationlist.css";
import FaceIcon from '@mui/icons-material/Face';
import { ModalFunction } from 'js/component/Modal/ModalFunction';

/* 여행 예약 기능 3번*/
/* 패키지 여행 예약 내역 목록 페이지*/
function Reservationlist() {

    // 패키지 여행 예약 목록
    const [Packreservation, setPackreservation] = useState([]);

    const { checkIsLogin, toLogin } = useCheckLogin();

    const [userName, setUserName] = useState('');

    /* ----------------------------------------------------------------------- */

    /* 부트스트렙을 이용한 모달 팝업창 동작 */
    const { modalOpenMap, handleModalOpen, handleModalClose } = ModalFunction();

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

                /* >로그인한 회원의 이름을 출력하기위한 코드 */
                // 회원의 이름을 가져온다고 가정하고, data에 이름이 담겨있다고 가정합니다.
                const memberName = data.name; // data에서 이름 필드를 가져온다
                setUserName(memberName);

            }).catch(err => console.error(err));



    }, []);

    /* 패키지 여행 에약 목록 */
    /* ----------------------------------------------------------------------- */

    // 패키지 여행 에약 목록 컬럼
    const columns = [
        {
            field: 'image', // 이미지 필드가 있다고 가정
            headerName: '여행 이미지',
            width: 300,
            renderCell: (params) => (
                <div className="image-cell">
                    {/* 테스트용 이미지 */}
                    <img className="custom-image"
                        src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004"
                        alt="축제이미지"
                        onClick={() => handleModalOpen(params.row.resNum)} // 모달 열기 함수 호출
                    />

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
                    <p>패키지 여행 이름: {params.row.packName}</p>
                    <p>회원: {params.row.memId}</p>
                    <p>숙박 기간: {params.row.dateCnt}</p>
                    <p>예약한 인원: {params.row.count}</p>
                    <p>예약한 날: {params.row.startDate}</p>
                </div>
            ),
        },
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
            headerClassName: 'column-header',
            sortable: false,
            headerAlign: 'center',
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
            <h1 className='reserve-list-header'><FaceIcon fontSize='large' /> {userName}님의 패키지 여행 예약 목록</h1>
            <div className='reserve-list'>
                <DataGrid
                    className="hideHeaders" // 컬럼 헤더 숨기기
                    rows={Packreservation}
                    columns={columns}
                    getRowId={row => row.resNum}
                    hideFooter={true} // 표의 푸터바 제거
                    getRowHeight={params => 300} // DataGrid의 특정 행의 높이를 100 픽셀로 설정(CSS로 분리불가)
                    // onCellClick={handleCellClick} // 셀이 클릭되었을 때의 이벤트 핸들러
                    disableColumnMenu // 컬럼메뉴 비활성화
                />
            </div>
        </div>
    );
};

export default Reservationlist;