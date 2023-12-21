import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import { ModalComponent, ModalFunction, SERVER_URL, ToggleCell } from 'js';
import { useNavigate, useParams } from 'react-router';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk'; // 결제 위젯 설치
import './Proceedpayment.css';

/* 결제위젯 연동 키 [테스트] */
const clientKey = "test_ck_yZqmkKeP8gNz6vBPKOmnrbQRxB9l"
const customerKey = "test_sk_vZnjEJeQVxNJ0bwYXo2P8PmOoBN0"

/* 결제 기능 1번(여행 예약에 대한 결제) */
/* 패키지 여행 결제 페이지*/
function Proceedpayment() {
    const { resNum } = useParams(); // 패키지 여행 예약 번호 받아오기
    const [member, setMember] = useState([]); // 회원정보
    const [Packreservation, setPackreservation] = useState([]); // 패키지 여행 예약 목록 정보
    const navigate = useNavigate(); // Navigate 객체에 접근 // 메인화면으로 보내

    /* 부트스트렙을 이용한 모달 팝업창 동작 */
    const { modalOpenMap, handleModalOpen, handleModalClose } = ModalFunction();

    /* 벡엔드에 Controller(컨트롤러)에서 설정한 패키지여행 예약 목록 */
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

                // data에서 "travalPack"을 추출하고 그 안의 "price"(가격)와 예약한 인원 수 "count"(인원 수)를 곱한 값 
                const packreservation = data.price * data.count;
                console.log("최종 패키지 여행의 가격:" + packreservation)

                // 패키지 여행의 가격값을 입력폼에 출력
                setPaymentInfo({ payamount: packreservation, });

                // 패키지 여행 예약 목록 state 업데이트
                setPackreservation([data]);
            })
            .catch(err => { console.error(err); });
    }, [resNum]);

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
            headerName: '결제 정보',
            width: 900,
            renderCell: (params) => (
                <div className="travelinformation">
                    <p>예약한 회원: {params.row.memId}</p>
                    <p>패키지 여행: {params.row.packName}</p>
                    <p>예약한 날: {params.row.startDate}</p>
                    {/* 클릭시'금액'과 '한국 통화 형식'변환 */}
                    <p>가격<ToggleCell value={params.row.price} /></p>
                    <p>숙박기간: {params.row.dateCnt}</p>
                    <p>예약한 인원: {params.row.count}</p>
                </div>
            ),
        },
    ];
    /* ----------------------------------------------------------------------- */

    /* 결제 위젯 전용 */
    const paymentWidgetRef = useRef(null);
    const paymentMethodsWidgetRef = useRef(null);

    /* 패키지 예약 결제 정보 데이터베이스로 보내기 */
    /* ----------------------------------------------------------- */
    const handleButtonClick = async () => {
        if (!paymentInfo.cardnumber || paymentInfo.cardnumber.trim() === '') { // - 카드번호가 true 또는 입력 안 할시 카드번호 입력 경고문 출력 
            alert('카드 번호를 입력해주세요.');
        } else if (paymentInfo.cardnumber.length !== 16) { // - 카드번호가 16자리가 아닐 경우에 경고문 출력 
            alert('카드 번호는 16자리입니다. 다시 입력해주세요.');
        } else {
            try {
                // 처리 중일 때 버튼을 비활성화
                const button = document.querySelector('button');
                button.disabled = true;

                // 결제 위젯
                const paymentWidget = paymentWidgetRef.current;

                // 패키지예약내역, 결제금액, 카드번호에대한 데이터 추가
                const data = {
                    resNum: Packreservation[0].resNum, // 패키지 여행 예약 번호
                    payamount: paymentInfo.payamount, // 사용자 입력값으로 업데이트
                    cardnumber: paymentInfo.cardnumber, // 사용자 입력값으로 업데이트
                };

                /* 1. DB에 예약한 정보를 먼저 전송(해결해야할 문제: 결제창 닫고 다시 결제버튼 누를시 다시한번 적용되는 현상) */
                // API에 결제 정보를 전송
                const response = await fetch(`${SERVER_URL}payment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                // 콘솔창에 성공했다는 내용을 표시
                console.log('POST 요청 성공:', response);

                /* 2. 1을 수행 후 결제창(카드, 가상계좌 등)으로 이동 */
                await paymentWidget?.requestPayment({
                    orderId: member.memId + clientKey, // 주문아이디가 6~21자리가 넘어가야 하므로 내 클라이언트 키를 삽입
                    orderName: Packreservation[0].packName, // 패키지 예약내역의 여행 상품 이름
                    customerName: member.nema, // 회원 이름
                    customerEmail: member.email, // 회원 이메일
                    successUrl: `${window.location.origin}/success`, // 성공시 결제 성공 창으로
                    failUrl: `${window.location.origin}/fail`, // 실패시 결제 실패창으로(아직 미구현)
                });

            } catch (error) {
                alert(error);
            } finally {
                // 에러 발생 여부에 상관없이 처리가 끝난 후 버튼 활성화
                const button = document.querySelector('button');
                button.disabled = false;
            }
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
    // const handleCellClick = (params) => {
    //     const selectedResNum = params.row.resNum;
    //     console.log("Selected ResNum:", selectedResNum);
    //     // 여기서 선택한 ResNum을 사용하여 필요한 작업 수행
    // };

    /* Tosspayments 위젯(결제위젯) 불러오기 */
    /* --------------------------------------------------------------------------------- */
    useEffect(() => {
        if (Packreservation.length > 0) {
            const loadWidget = async () => {
                try {
                    const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
                    const paymentMethodsWidget = paymentWidget.renderPaymentMethods("#payment-widget", paymentInfo.payamount);

                    // Ref에 위젯을 할당
                    paymentWidgetRef.current = paymentWidget;
                    paymentMethodsWidgetRef.current = paymentMethodsWidget;
                } catch (error) {
                    alert('결제 위젯 로드 중 오류 발생:', error);
                }
            };

            loadWidget();
        }
    }, [paymentInfo.payamount]);
    console.log("결제 위젯에 값이 들어갔는지 확인용(패키지 여행 * 인원 수 가격): " + paymentInfo.payamount);
    /* --------------------------------------------------------------------------------- */
    console.log(member.phonNum);


    return (
        <div className='pay-form'>
            <h1> - 패키지 여행 결제 - </h1>
            {/* 패키지 여행 결제 목록 스타일 */}
            <div className='pay-header'>
                <DataGrid
                    className="hideHeaders" // 컬럼 헤더 숨기기
                    rows={Packreservation}
                    columns={columns}
                    getRowId={row => row.resNum}
                    hideFooter={true} // 표의 푸터바 제거
                    // onCellClick={handleCellClick} // 셀이 클릭되었을 때의 이벤트 핸들러
                    getRowHeight={params => 350} // DataGrid의 특정 행의 높이를 100 픽셀로 설정(CSS로 분리불가)
                />

                <div style={{ marginLeft: "20%", marginRight: "20%", marginBottom: "5%", marginTop: "5%" }}>
                    <label>
                        카드 번호:
                        <input type="text" name="cardnumber" value={paymentInfo.cardnumber} onChange={handleInputChange} />
                    </label>
                </div>

                {/* <div style={{ textAlign: 'center' }}>
                    <h1>패키지 여행 가격 정보</h1>
                    {Packreservation.map((reservation, index) => (
                        <div key={index}>
                            <h2 onClick={handleToggleFormat}>패키지 여행의 가격: {isKoreanFormat ? formatPrice(reservation.price) : reservation.price.toLocaleString() + '원' }</h2>
                            <h2>예약인원: {reservation.count}</h2>
                            <h2>{reservation.price.toLocaleString() + ' X ' + reservation.count}</h2>
                        </div>
                    ))}
                </div> */}

                <div>
                    <h1>최종 결제 금액</h1>
                    {/* 금액(~원)을 클릭시 '금액'과 '한국 통화 형식'변환 */}
                    <h2><ToggleCell value={paymentInfo.payamount} /></h2>
                </div>

                {/* 결제 위젯을 화면에 출력 */}
                <div id="payment-widget" />

                <button onClick={handleButtonClick}>
                    결제하기
                </button>
            </div>
        </div >
    );
};

export default Proceedpayment;

/*
    - 참고
        - React로 결제 페이지 개발하기 (ft. 결제위젯)
        > https://velog.io/@tosspayments/React%EB%A1%9C-%EA%B2%B0%EC%A0%9C-%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0-ft.-%EA%B2%B0%EC%A0%9C%EC%9C%84%EC%A0%AF

*/