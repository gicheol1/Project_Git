import NightsStayIcon from '@mui/icons-material/NightsStay';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { DataGrid } from '@mui/x-data-grid';

import { ModalComponent, ModalFunction, SERVER_URL, ToggleCell, TravelCalendar, TravelPackMap } from 'js';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import './TravelReservation.css';
import { useTravelReservation } from './useTravelReservation';

/* 여행 예약 2번*/
/* - 여행 패키지 예약 페이지(날짜와 상품갯수 선택) */
function TravelReservation() {

    /* useState(함수의 상태관리), useNavigate(라우터 내에서 경로를 변경), ModalFunction(모달창의 열고 닫는 기능) */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    const { packNum } = useParams(); // 패키지 여행 번호 받아오기
    const [TravalPack, setTravalPack] = useState([]); // 패키지 정보
    const [reservationInfo, setReservationInfo] = useState({}); // 패키지 여행 정보
    const [count, setCount] = useState(0);  // 예약인원
    const navigate = useNavigate(); // 페이지 이동을 위한 함수

    /* 부트 스트랩 팝업창 기능 */
    const { modalOpenMap, handleModalOpen, handleModalClose } = ModalFunction();

    /* 축제 정보 */
    const [FestivalAll, setFestivalAll] = useState([]);

    // - FestivalAll에서 name, startDate, endDate 데이터만 출력하는 부분
    const FestivalfilteredData = FestivalAll.map(festivallist => ({
        name: festivallist.name,
        startDate: festivallist.startDate,
        endDate: festivallist.endDate
    }));


    const { getTravalpack, getFilePack } = useTravelReservation();

    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    /* 벡엔드에 Controller(컨트롤러)에서 설정한 패키지여행 번호에 맞는 상세정보, 축제 정보 불러오기 */
    useEffect(() => {

        getTravalpack(packNum).then((data) => {
            getFilePack(packNum).then((img) => {

                if (img === undefined) {
                    setTravalPack(p => [{ ...data }]);
                } else {
                    setTravalPack(p => [{ ...data, ...img }]);
                }
                setReservationInfo({ ...data });
            });
        });

        fetch(SERVER_URL + "festivalAll", { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setFestivalAll(data); // 전체 데이터를 그대로 설정
            })
            .catch(err => { console.error(err); });

    }, []);

    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    /* 패키지 예약 신청정보 DB(데이터베이스)로 보내기(POST) */
    const handleButtonClick = async () => {

        // 인원이 0명 또는 음수인 경우
        if (count <= 0) { alert('인원수는 1명 이상이이여야 합니다.'); return; }

        // 로그인 상태(토큰 존재여부) 확인
        const jwt = sessionStorage.getItem('jwt');
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
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
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
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    /* 패키지 여행의 상세정보에 대한 컬럼 */
    const columns = [
        {
            field: 'image', // 이미지 필드가 있다고 가정
            headerName: '여행 이미지',
            width: 300,

            renderCell: (params) => {
                const festivalData1 = FestivalfilteredData.find(festivallist => festivallist.name === params.row.festivalname);
                return (
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

                        <ModalComponent
                            showModal={modalOpenMap[params.row.packNum]}
                            handleClose={() => handleModalClose(params.row.packNum)}
                            selectedImage={"https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004"}
                            params={params}
                            festivalDatas={festivalData1} // festivalData 추가
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
                const festivalData2 = FestivalfilteredData.find(festivallist => festivallist.name === params.row.festivalname);
                return (
                    <div className="travelinformation">
                        <p>패키지번호: {params.row.packNum}</p>
                        <p>숙소: {params.row.name}</p>
                        {/* 클릭시'금액'과 '한국 통화 형식'변환 */}
                        <p className='inform2'>가격:</p><p className='inform3'><ToggleCell value={params.row.price} /></p>
                        <p>숙박기간: {params.row.startDate} ~ {params.row.endDate}</p>
                        <p>최대인원: {params.row.count}</p>
                        <p>주소: {params.row.address}</p>
                        <p>흡연실(금연실): {params.row.smoke}</p>
                        <p>몇 인실: {params.row.person}</p>
                        <p>상세내용: {params.row.text}</p>
                        <p>예약 가능한 상태: {params.row.reservation}</p>
                        <p>축제: {festivalData2?.name}</p>
                        <p>축제기간: {festivalData2?.startDate} ~ {festivalData2?.endDate}</p>
                    </div>
                );
            },
        },

    ];

    /* 화면 출력 */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    return (
        <div>
            {/* 패키지 정보 */}
            <div>
                {/* 패키지 여행 목록 스타일 */}
                <div className="traval-reservation-container">
                    <h2 className="traval-reservation-header"><BedtimeIcon className='bed-time-icon' fontSize='large' /> 숙박 정보</h2>
                    <DataGrid
                        className="hideHeaders" // 컬럼 헤더 숨기기
                        rows={TravalPack} // TravalPack 데이터
                        columns={columns} // 컬럼 명
                        getRowId={row => row.packNum} // packNum을 기준으로 출력
                        hideFooter={true} // 표의 푸터바 제거
                        disableColumnMenu={true} // 열 메뉴 제거
                        getRowHeight={params => 550} // DataGrid의 특정 행의 높이를 100 픽셀로 설정(CSS로 분리불가)
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
            <div className='map-style'>
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
                        <NightsStayIcon fontSize='large' />
                        <span className='inform-font'> 숙박 기간 :</span>
                        <input className='date'
                            type="text"
                            name="dateCnt"
                            value={`${reservationInfo.startDate} ~ ${reservationInfo.endDate}`}
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
                        예약하기
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