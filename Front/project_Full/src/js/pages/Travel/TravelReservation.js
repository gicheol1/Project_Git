import { DataGrid } from '@mui/x-data-grid';
import { SERVER_URL, TravelCalendar, TravelPackMap } from 'js';
import { useCheckLogin } from 'js/useCheckLogin';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

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

        if (jwt === undefined || jwt === '') { alert('로그인이 필요합니다'); navigate('/login'); }

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
        { field: 'packNum', headerName: '패키지 번호', width: 100 },
        { field: 'name', headerName: '패키지 이름', width: 200 },
        { field: 'price', headerName: '가격', width: 100 },
        { field: 'startDate', headerName: '예약기간(시작일)', width: 200 },
        { field: 'endDate', headerName: '예약기간(끝)', width: 150 },
        { field: 'singupDate', headerName: '등록일자', width: 150 },
        { field: 'count', headerName: '최대인원', width: 100 },
    ];
    /* ----------------------------------------------------------- */


    return (
        <div>
            {/* 패키지 정보 */}
            <div>
                {/* 패키지 여행 목록 스타일 */}
                <div style={{
                    marginRight: "0%",
                    marginLeft: "0%",
                    marginBottom: "1%",
                    marginTop: "1%",
                    backgroundColor: 'white',
                    border: '1px solid'
                }}>
                    <h2>여행 패키지 정보</h2>
                    <DataGrid
                        rows={TravalPack} // TravalPack 데이터
                        columns={columns} // 컬럼 명
                        getRowId={row => row.packNum} // packNum을 기준으로 출력
                        hideFooter={true} // 표의 푸터바 제거
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
            <div style={{
                marginRight: "20%",
                marginLeft: "20%",
                marginBottom: "1%",
                backgroundColor: 'white',
                justifyContent: 'center',
                border: '1px solid',
                textAlign: 'center'
            }}>
                {/* count 입력 폼 */}
                <div>
                    <label>
                        예약할 인원 수:
                        <input
                            type="number"
                            name="count"
                            value={count}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <br />

                {/* dateCnt 입력 폼 */}
                <div>
                    <label>
                        패키지 여행기간:
                        <input
                            type="text"
                            name="dateCnt"
                            value={reservationInfo.dateCnt}
                            onChange={handleInputChange}
                            readOnly
                        />
                    </label>
                </div>
                <br />

                {/* 패키지 여행 예약하기 */}
                <div>
                    <button
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