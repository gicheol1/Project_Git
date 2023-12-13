// <js 파일 경로 관리> //
// - default export 로 내보내고 있다면 export { default as 내보내는 함수명 } from '파일(명) 경로'; 로 작성
// - export 로 내보내고 있다면 export * from '파일(명) 경로'; 로 작성
// 참고: https://velog.io/@rimo09/React%EC%97%90%EC%84%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B2%BD%EB%A1%9C-%EA%B9%94%EB%81%94%ED%9E%88-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0

// -------------------------------------------------------------------------------- //
// [component 폴더] //

// > Common 폴더
export { SERVER_URL } from './component/constants'; // 벡엔드 주소

// -------------------------------------------------------------------------------- //

// 헤더와 푸터
export { default as LayOut } from './layout/LayOut';

// 홈페이지('/')
export { default as Home } from './pages/home/Home';

// 로그인 , 동의, 회원가입, 아이디/비밀번호 찾기
export { default as Login } from './pages/login/Login';
export { default as Agreement } from './pages/singUp/Agreement';
export { default as SingUp } from './pages/singUp/SingUp';
export { default as FindAccount } from './pages/findAccount/FindAccount';

// 게시판
export { default as BoardList } from './pages/board/boardList/BoardList';
export { default as BoardDetail } from './pages/board/boardDetail/BoardDetail';
export { default as BoardMU } from './pages/board/boardMU/BoardMU';

// -------------------------------------------------------------------------------- //
// [pages 폴더] //
// > Travel(여행) 폴더: 여행 예약에 대한 기능
export { default as TravelPackList } from './pages/Travel/TravelPackList'; // 1. 여행 패키지 목록 페이지

export { default as TravelReservation } from './pages/Travel/TravelReservation'; // 2. 여행 패키지 예약 페이지(날짜와 상품갯수 선택)
export { default as TravelCalendar } from './pages/Travel/TravelCalendar'; // 2-1. 패키지 여행 예약 달력(여행 패키지 예약 페이지)

export { default as Reservationlist } from './pages/Travel/Reservationlist'; // 3. 패키지 여행 예약 목록 페이지

// > Travel(여행) 폴더 > KaKaomap(카카오 지도) 폴더
export { default as TravelKaKaoMap } from './pages/Travel/TravelKaKaomap/TravelKaKaoMap'; // 2-2. 패키지 여행 지도(여행 패키지 예약 페이지)

// > Payment(결제) 폴더: 결제 기능에 대한 JS 파일 모음
export { default as Proceedpayment } from './pages/Payment/Proceedpayment'; // 1. 패키지 여행 결제 페이지(여행예약 마지막 페이지)

// -------------------------------------------------------------------------------- //



