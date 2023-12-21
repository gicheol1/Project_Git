import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { DataGrid } from '@mui/x-data-grid';
import { SERVER_URL, TravelCalendar, TravelPackMap } from 'js';
import { useCheckLogin } from 'js/useCheckLogin';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import './TravelReservation.css';

import { ToggleCell, ModalComponent } from 'js';

/* 여행 예약 기능 2번*/
/* - 여행 패키지 예약 페이지(날짜와 상품갯수 선택) */
function TravelReservation() {
    /* <데이터를 받을 공간, 리스트에 나타낼 아이템들> */
    /* ----------------------------------------------------------- */

    const { packNum } = useParams(); // - 회원아이디와 패키지 여행 번호 받아오기

    const [TravalPack, setTravalPack] = useState([]); // - 패키지 정보

    // 예약인원
    const [count, setCount] = useState(0);

    const navigate = useNavigate(); // - Navigate 객체에 접근, 패키지 여행 예약 목록으로 리다이렉트

    // 패키지 여행 정보
    const [reservationInfo, setReservationInfo] = useState({});

    /* ----------------------------------------------------------- */

    const { checkIsLogin } = useCheckLogin();

    /* 부트스트렙을 이용한 모달 팝업창 동작 */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    // showModal: 모달을 보여줄지 여부를 결정하는 상태 변수
    // setShowModal: 모달의 보이기/숨기기 상태를 설정하는 함수
    const [showModal, setShowModal] = useState(false);

    // selectedImage: 모달에 표시할 이미지의 URL을 저장하는 상태 변수
    // setSelectedImage: 모달에 표시할 이미지 URL을 설정하는 함수
    const [selectedImage, setSelectedImage] = useState('');

    // handleImageClick: 이미지를 클릭했을 때 모달을 열기 위한 핸들러 함수
    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl); // 선택한 이미지 URL 설정
        setShowModal(true); // 모달 보이기
    };

    // handleClose: 모달을 닫기 위한 핸들러 함수
    const handleClose = () => setShowModal(false); // 모달 숨기기
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    /* <벡엔드에서 설정한 패키지여행 DB(데이터베이스) 연결> */
    /* ----------------------------------------------------------- */
    useEffect(() => { // - 패키지와 회원 데이터를 가져오는 부분을 묶음

        if (!checkIsLogin()) {
            alert('로그인이 필요합니다');
            navigate('/login');
        }

        fetch(SERVER_URL + `travalpack/${packNum}`)
            .then((response) => response.json())
            .then((data) => {
                setTravalPack([data]) // - 번호(기본키)에 해당된는 여행 패키지 정보 

                setReservationInfo({
                    startDate: data.startDate,
                    dateCnt: `${data.startDate} ~ ${data.endDate}`,
                    count: count
                });
            })
            .catch((err) => console.error(err));

    }, []);
    /* ----------------------------------------------------------- */

    /* <패키지 예약 신청정보 DB(데이터베이스)로 보내기(POST)> */
    /* ----------------------------------------------------------- */
    const handleButtonClick = async () => {

        // 인원이 0명 또는 음수인 경우
        if (count <= 0) { alert('인원수는 1명 이상이이여야 합니다.'); return; }

        // 로그인 상태(토큰 존재여부) 확인
        const jwt = sessionStorage.getItem('jwt');


        // 로그인이 필요합니다. 에 대한 동작을 안해서 약간 코드 수정
        // if (jwt === undefined || jwt === '') { alert('로그인이 필요합니다'); navigate('/login'); return;}
        // ↓ 코드 수정 ↓
        if (!jwt) { alert('로그인이 필요합니다'); navigate('/login'); return; }

        // 예약 정보 저장
        fetch(`${SERVER_URL}packreservation/reservation/${packNum}/${jwt}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservationInfo)

        }).then((res) => {
            if (!res.ok) {
                throw new Error(res);
            }

            return res.json();

        }).then((data) => {
            alert(data.memId + '님의 예약이 완료되었습니다.');
            navigate(`/packreservation/memberpackreservation`); // 패키지 여행 예약 목록으로 리다이렉트

        }).catch((e) => {
            if (e.status === 401) {
                alert('로그인이 필요합니다.');
                navigate('/login');

            } else if (e.status === 500) {
                alert('서버에서 데이터를 저장하지 못했습니다.');

            }
        });

    };
    /* ----------------------------------------------------------- */

    /* <인원수와 여행기간 직접 입력> */
    /* ----------------------------------------------------------- */

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case "count":
                setCount(e.target.value)
                break;

            case "dateCnt":

                break;

            default:
                return;
        }
        setReservationInfo({
            ...reservationInfo,
            [e.target.name]: e.target.value,
        });
    };
    /* ----------------------------------------------------------- */

    /* - 패키지 여행의 컬럼 */
    /* ----------------------------------------------------------- */
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
                        onClick={() =>
                            handleImageClick(
                                'https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004'
                            )
                        }
                    />

                    {/* 부트 스트랩의 모달 폼 */}
                    <ModalComponent
                        showModal={showModal}
                        handleClose={handleClose}
                        selectedImage={selectedImage}
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
                    <p>패키지번호: {params.row.packNum}</p>
                    <p>패키지이름: {params.row.name}</p>
                    {/* 클릭시'금액'과 '한국 통화 형식'변환 */}
                    <p>[가격]<ToggleCell text="가격:" value={params.row.price} /></p>
                    <p>숙박기간: {params.row.startDate} ~ {params.row.endDate}</p>
                    <p>최대인원: {params.row.count}</p>
                    <p>주소: {params.row.address}</p>
                    <p>흡연실(금연실): {params.row.smoke}</p>
                    <p>몇 인실: {params.row.person}</p>
                    <p>상세내용: {params.row.text}</p>
                    <p>예약 가능한 상태: {params.row.reservation}</p>
                </div>
            ),
        },

    ];
    /* ----------------------------------------------------------- */

    return (
        <div>
            {/* 패키지 정보 */}
            <div>
                {/* 패키지 여행 목록 스타일 */}
                <div className="traval-reservation-container">
                    <h2 className="traval-reservation-header"><LocalAirportIcon className='icon-rotation' fontSize='large' /> 여행 패키지 정보</h2>
                    <DataGrid
                        className="hideHeaders" // 컬럼 헤더 숨기기
                        rows={TravalPack} // TravalPack 데이터
                        columns={columns} // 컬럼 명
                        getRowId={row => row.packNum} // packNum을 기준으로 출력
                        hideFooter={true} // 표의 푸터바 제거
                        disableColumnMenu={true} // 열 메뉴 제거
                        getRowHeight={params => 500} // DataGrid의 특정 행의 높이를 100 픽셀로 설정(CSS로 분리불가)
                    />
                </div>
            </div>

            {/* - 패키지 여행의 대한 정보를 달력에 출력 
                - packNum을 TravelCalendar 컴포넌트로 전달 */}
            <div>
                <TravelCalendar packNum={packNum} />
            </div>

            {/* - 카카오 지도를 이용한 패키지 여행의 장소를 출력 
                - packNum을 TravelKaKaoMap 컴포넌트로 전달*/}
            <div style={{
                marginRight: "20%",
                marginLeft: "20%",
                marginBottom: "1%",
                backgroundColor: 'white',
                border: '1px solid'
            }}>
                <TravelPackMap packNum={packNum} />
            </div>

            {/* 여행 예약 정보 입력 */}
            <div className='inform'>
                {/* count 입력 폼 */}
                <div className='box'>
                    <label>
                        <PersonAddIcon />
                        <span className='inform-font'> 인원 선택 : </span>
                        <input className='count'
                            type="number"
                            name="count"
                            value={count}
                            onChange={handleInputChange}
                        />
                        {/* dateCnt 입력 폼 */}
                        <ConnectingAirportsIcon fontSize='large' />
                        <span className='inform-font'> 패키지 여행기간 :</span>
                        <input className='date'
                            type="text"
                            name="dateCnt"
                            value={reservationInfo.dateCnt}
                            onChange={handleInputChange}
                            readOnly
                        />
                    </label>
                </div>
                <br />
                <br />

                {/* 패키지 여행 예약하기 */}
                <div className='reserve-button'>
                    <button className='reserve-button-font'
                        onClick={handleButtonClick}>
                        여행 예약하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TravelReservation;

/* 참고: https://m.blog.naver.com/PostView.naver?blogId=loveyou_a_a&logNo=222828107745&categoryNo=60&proxyReferer= */
/* 참고: https://stackoverflow.com/questions/72774211/getrowid-from-material-ui-datagrid-doesnt-work */
/* 참고: https://velog.io/@fearofcod/React-Big-Calendar */
/* 참고: chat Gpt */ 