import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { SERVER_URL } from 'js';
import { useNavigate, useParams } from 'react-router';

/* 결제 기능 1번(여행 예약에 대한 결제) */
/* 패키지 여행 결제 페이지*/
function Proceedpayment() {
    const { resNum } = useParams(); // 회원아이디 받아오기
    const [member, setMember] = useState([]); // 회원정보
    const [Packreservation, setPackreservation] = useState([]); // 패키지 여행 예약 목록 정보
    const navigate = useNavigate(); // Navigate 객체에 접근 // 메인화면으로 보내준다.

    /* 벡엔드에 Constructor에서 설정한 패키지여행 예약 목록 */
    useEffect(() => {

        const jwt = sessionStorage.getItem('jwt');

        if (jwt === undefined || jwt === '') { return; }

        // - 회원 
        fetch(SERVER_URL + `getUser?jwt=${jwt}`, { method: 'GET' })
            .then((response) => response.json())
            .then((data) => { setMember(data); })
            .catch(err => console.error(err));

        // - 패키지 여행에 대한 상세 정보
        fetch(SERVER_URL + `packreservation/${resNum}`)
            .then(response => response.json())
            .then(data => {

                console.log(data) // 패키지여행의 데이터를 잘가져오는지 확인

                // data에서 "travalPack"을 추출하고 그 안의 "price"를 출력
                const packreservation = data.price;
                console.log(packreservation)

                // 패키지 여행의 가격값을 입력폼에 출력
                setPaymentInfo({ payamount: packreservation,});

                // 패키지 여행 예약 목록 state 업데이트
                setPackreservation([data]);
            })
            .catch(err => { console.error(err); });
    }, [resNum]);

    /* 패키지 여행 에약 목록 */
    /* ----------------------------------------------------------------------- */
    // 패키지 여행 에약 목록 컬럼
    const columns = [
        // { field: 'resNum', headerName: '패키지 예약 번호', width: 150 },
        { field: 'memId', headerName: '예약한 회원', width: 200 },
        { field: 'packName', headerName: '패키지 여행명', width: 200 },
        { field: 'startDate', headerName: '예약한 날', width: 200 },
        { field: 'price', headerName: '가격', width: 100 },
        { field: 'dateCnt', headerName: '기간', width: 200 },
        { field: 'count', headerName: '인원수', width: 100 },
    ];
    /* ----------------------------------------------------------------------- */

    /* 패키지 예약 결제 정보 데이터베이스로 보내기 */
    /* ----------------------------------------------------------- */
    const handleButtonClick = async () => {

        // 패키지예약내역, 결제금액, 카드번호에대한 데이터 추가
        const data = {
            resNum: Packreservation[0].resNum, // 패키지 여행 예약 번호
            payamount: paymentInfo.payamount, // 사용자 입력값으로 업데이트
            cardnumber: paymentInfo.cardnumber, // 사용자 입력값으로 업데이트
        };

        try {
            const response = fetch(`${SERVER_URL}payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            // .then(res => res.json());

            // 콘솔창에 성공했다는 내용을 표시
            console.log('POST 요청 성공:', response);

            // 결제가 성공적으로 완료되면 alert으로 메시지 표시
            alert(member.name + '님의 결제이 완료되었습니다.');

            // 패키지 여행 예약 목록으로 리다이렉트
            navigate(`/packreservationList`);

        } catch (error) {
            console.error('POST 요청 오류:', error);
        }
    };
    /* ----------------------------------------------------------- */


    /* 결재 금액과 카드번호 입력 */
    /* ----------------------------------------------------------- */
    const [paymentInfo, setPaymentInfo] = useState({
        payamount: 0, // 초기값은 0으로 설정하거나 다른 값으로 초기화
        cardnumber: "", // 초기값은 빈 문자열로 설정하거나 다른 값으로 초기화
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({
            ...paymentInfo,
            [name]: value,
        });
    };
    /* ----------------------------------------------------------- */

    /* 행 클릭시 해당되는 row.resNum 번호를 콘솔에 출력 */
    const handleCellClick = (params) => {
        const selectedResNum = params.row.resNum;
        console.log("Selected ResNum:", selectedResNum);
        // 여기서 선택한 ResNum을 사용하여 필요한 작업 수행
    };

    return (
        <div style={{
            textAlign: 'center'
            }}>
            <h1> - 패키지 여행 결제 - </h1>

            {/* 패키지 여행 결제 목록 스타일 */}
            <div style={{
                marginLeft: "0%",
                marginRight: "0%",
                marginBottom: "3%",
                marginTop: "1%",
                backgroundColor: 'white',
                border: '1px solid',

            }}>
                <DataGrid
                    rows={Packreservation}
                    columns={columns}
                    getRowId={row => row.resNum}
                    hideFooter={true} // 표의 푸터바 제거
                    onCellClick={handleCellClick} // 셀이 클릭되었을 때의 이벤트 핸들러
                />
                <div>
                    <label>
                        결제 금액:
                        <input
                            type="number"
                            name="payamount"
                            value={paymentInfo.payamount}
                            onChange={handleInputChange}
                            // readOnly
                        />
                    </label>
                </div>
                <div>
                    <label>
                        카드 번호:
                        <input type="text" name="cardnumber" value={paymentInfo.cardnumber} onChange={handleInputChange} />
                    </label>
                </div>
                <button onClick={handleButtonClick}>
                    결제하기
                </button>
            </div>
        </div >
    );
};

export default Proceedpayment;