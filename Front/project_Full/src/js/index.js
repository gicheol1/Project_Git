// <js 파일 경로 관리> //
// - default export 로 내보내고 있다면 export { default as 내보내는 함수명 } from '파일(명) 경로'; 로 작성
// - export 로 내보내고 있다면 export * from '파일(명) 경로'; 로 작성
// 참고: https://velog.io/@rimo09/React%EC%97%90%EC%84%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B2%BD%EB%A1%9C-%EA%B9%94%EB%81%94%ED%9E%88-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0

// -------------------------------------------------------------------------------- //
// [component 폴더] //
export { SERVER_URL } from './component/constants'; // 벡엔드 주소

// component 폴더 > ToggleCell 폴더(금액 표시 변환)
export { default as ToggleCell } from './component/ToggleCell/ToggleCell';

// component 폴더 > Modal 폴더(팝업창)
export { default as ModalComponent } from './component/Modal/ModalComponent'; // 화면 출력
export { ModalFunction } from './component/Modal/ModalFunction'; // 화면 동작 기능(열기, 닫기)

// component 폴더 > Pagination 폴더(페이징[페이지네이션])
export { usePagination, PaginationComponent } from './component/Pagination/PaginationComponent'; // 페이지 네이션

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
export { default as Comment } from './pages/board/boardDetail/comments/Comment';

// -------------------------------------------------------------------------------- //
// [pages 폴더] //
// > Travel(여행) 폴더: 여행 예약에 대한 기능

// 1. 여행 패키지 목록 페이지
export { default as TravelPackList } from './pages/Travel/TravelPackList/TravelPackList';

// 2. 여행 패키지 예약 페이지(날짜와 상품갯수 선택)
export { default as TravelReservation } from './pages/Travel/TravelReservation/TravelReservation';

// 2-1. 패키지 여행 예약 달력(여행 패키지 예약 페이지)
export { default as TravelCalendar } from './pages/Travel/TravelCalendar/TravelCalendar';
// 2-2. 패키지 여행 지도(여행 패키지 예약 페이지)
export { default as TravelPackMap } from './pages/Travel/TravelPackMap/TravelPackMap';

// 3. 패키지 여행 예약 목록 페이지
export { default as Reservationlist } from './pages/Travel/Reservationlist/Reservationlist';

// > Payment(결제) 폴더: 결제 기능에 대한 JS 파일 모음
// 1. 패키지 여행 결제 페이지(여행예약 마지막 페이지)
export { default as Proceedpayment } from './pages/Payment/Proceedpayment';

// 2. 결제내역
export { default as Paymenthistory } from './pages/Payment/Paymenthistory'

// > Payment(결제) 폴더 > Tosspayments(토스 결제 위젯) 폴더
export { SuccessPage } from './pages/Payment/Tosspayments/Success';

export { default as Calendar } from './pages/Calendar/Calendar';

// 패키지 여행 지도
export { default as TravelKaKaoMap } from './pages/TravelKaKaomap/TravelKaKaoMap';

// -------------------------------------------------------------------------------- //

// > Festivals 폴더: 축제관리
export { default as FestivalList } from './pages/Festivals/festivalList/FestivalList'; //  축제관리 리스트
export { default as FestivalDetail } from './pages/Festivals/festivalDetail/FestivalDetail'; //  축제관리 상세 정보페이지
export { default as Festivals } from './pages/Festivals/festivals/Festivals'; //  축제관리 추가, 수정 페이지

// > ConnectionLog 폴더: 최근 본 내역
export { default as ConnectionLog } from './pages/ConnectionLog/ConnectionLog'; // 최근 본 내역

//---------------------------------------------------------------------------------//

// > MainPage 폴더: 메인 페이지
export { default as MainPage } from './pages/MainPage/MainPage'; // 메인페이지

// > Likeclick 폴더: 좋아요 누른 계시글 보기 페이지
export { default as Likeclick } from './pages/Likeclick/Likeclick'; // 좋아요 누른 계시글 보기 페이지

// > LocalFestival 폴더: 지역 페이지
export { default as LocalFestival } from './pages/LocalFestival/LocalFestival'; // 지역 페이지

// > Mymilize 폴더: 마일리지 페이지
export { default as Mymilize } from './pages/Mymilize/Mymilize'; // 마일리지 페이지

// --------------------------------------------------------------------------------//
//Footer

// > Privacy 폴더: 개인정보 처리방침
export { default as Privacy } from './layout/footer/Footerlink/Privacy'; //  개인정보 처리방침 페이지

// > Terms 폴더: 이용약관
export { default as Terms } from './layout/footer/Footerlink/Terms'; //  이용약관 페이지

// > Copyright 폴더: 저작권장
export { default as Copyright } from './layout/footer/Footerlink/Copyright'; // 저작권장 페이지


//--------------------------------------------------------------------------------//
//Sidebar

// > ReservationInfo 폴더: 예약 정보
export { default as ReservationInfo } from './pages/ReservationInfo/ReservationInfo'; // 예약 정보

// > SaleInfo 폴더: 판매 정보
export { default as SaleInfo } from './pages/Sale/SaleInfo'; // 판매 정보

// > QnaStatus 폴더: 내 Q&A 현황
export { default as QnaStatus } from './pages/Qna/QnaStatus'; // 내 Q&A 현황

//Sidebar(m) (추가)

// > UserManage 폴더 : 회원 관리
export { default as UserList } from './pages/UserManage/UserList/UserList'; // 회원 리스트
export { default as UserDetail } from './pages/UserManage/UserDetail/UserDetail'; // 회원 수정

// > Blacklist 폴더: 블랙 리스트
export { default as BlackList } from './pages/Black/BlackList/BlackList'; // 블랙 리스트

// > Servicedown 폴더: 서비스 제한
export { default as Servicedown } from './pages/Black/Servicedown/Servicedown'; // 서비스 제한

// > 패키지 추가 사이트
export { default as TravalPackAdd } from './pages/Travel/TravelPackAdd/TravalPackAdd'; // 패키지 추가