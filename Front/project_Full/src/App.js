// import './App.css';

import { Route, Routes } from "react-router-dom";

import { useEffect, useState } from 'react';

import {
	BoardDetail,
	BoardList,
	BoardMU,
	Calendar,

	Home,
	Proceedpayment,
	Reservationlist,
	SuccessPage,
	TravalPackAdd,
	TravelKaKaoMap,
	TravelPackList,
	TravelReservation
} from 'js';

//header
import { ConnectionLog, Festivals } from 'js';

//Sidebar
import { MemberInfo, QnaStatus, ReservationInfo, SaleInfo } from 'js';

//Sidebar(관리자) 추가내용
import { Blacklist, Membercare, Servicedown, UserPage } from 'js';

//main
import { FestivalPage, Likeclick, MainPage, Mymilize } from 'js';

//footer
import { Copyright, Privacy, Terms } from 'js';


import { Agreement, FindAccount, LayOut, Login, SingUp } from 'js';
import { FestivalList, FestivalDetail } from 'js';

import { useCheckLogin } from 'js/useCheckLogin';

function App() {

	// 로그인 여부
	const [isLogin, setIsLogin] = useState();

	// 관리자 여부
	const [isAdmin, setIsAdmin] = useState();

	const { checkIsLogin, checkIsAdmin } = useCheckLogin();

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	// 경로가 바뀔때마다 로그인 상태 확인
	useEffect(() => {
		checkIsLogin().then((res) => {

			if (res) { checkIsAdmin().then((r) => { setIsAdmin(r); }) }


			setIsLogin(res);
		})

	}, [window.location.href]);

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	return (
		<Routes>

			{/* 헤더, 푸터 레이아웃 지정 */}
			<Route element={
				<LayOut
					isLogin={isLogin}
					isAdmin={isAdmin}
					setIsLogin={setIsLogin}
				/>
			}>

				{/* 기본 페이지('/') */}
				<Route index element={<Home isLogin={isLogin} />} />

				{/* 게시판 리스트 */}
				<Route path='/boardList/:target' element={<BoardList isLogin={isLogin} />} />

				{/* 게시판 상세 정보 */}
				<Route path="/boardDetail/:target/:boardNum" element={<BoardDetail isLogin={isLogin} />} />

				{/* 게시글 만들기 */}
				<Route path='/boardMake/:target' element={<BoardMU isLogin={isLogin} />} />

				{/* 개시글 수정하기 */}
				<Route path='/boardUpdate/:target/:boardNum' element={<BoardMU isLogin={isLogin} />} />

				{/* ===== ===== ===== ===== ===== */}

				{/* 여행 목록 페이지 */}
				<Route path="/packreservationList" element={<TravelPackList />} />

				{/* 여행 예약 페이지(캘린더, 지도) */}
				<Route path="/packreservation/reservation/:packNum" element={<TravelReservation isLogin={isLogin} />} />

				{/* 여행 예약 내역 페이지  */}
				<Route path="/packreservation/memberpackreservation" element={<Reservationlist />} />

				{/* 여행 결제 페이지 */}
				<Route path="/payment/:resNum" element={<Proceedpayment />} />
				<Route path="/success" element={<SuccessPage />} />

				{/* 여행 지도 */}
				<Route path="/travelKaKaoMap" element={<TravelKaKaoMap />} />

				{/* 여행 달력 */}
				<Route path="/calendar" element={<Calendar />} />

				{/* ===== ===== ===== ===== ===== */}

				{/* 로그인 상태에 따른 경로 지정 */}
				{isLogin ?
					<></>
					:
					<>
						<Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
						<Route path="/agreement" element={<Agreement />} />
						<Route path="/singUp" element={<SingUp />} />
						<Route path="/findAccount" element={<FindAccount />} />
					</>
				}

				{/* 헤더 경로 설정 */}
				{/* 축제 관리 */}
				<Route path="/festivalList" element={<FestivalList />} />
				<Route path="/festivalDetail/:festivalNum" element={<FestivalDetail />} />
				<Route path="/festivals" element={<Festivals />} />
				<Route path="/festivals/:festivalNum" element={<Festivals />} />
				{/* 최근 본 내역 */}
				<Route path="/connectionlog" element={<ConnectionLog />} />
				{/* 마이 페이지 */}
				<Route path="/myPage" element={<MainPage />} />

				{/* 메인페이지 경로 설정 */}
				{/* 좋아요 누른 계시글 */}
				<Route path="/likeclick" element={<Likeclick />} />
				{/* OOO님의 마일리지 */}
				<Route path="/mymilize" element={<Mymilize />} />
				{/* 지역 */}
				<Route path="/festival" element={<FestivalPage />} />

				{/* 사이드바 경로 설정 */}
				{/* 예약정보, 예약정보 관리 */}
				<Route path="/info" element={<ReservationInfo />} />
				{/* 판매 정보 */}
				<Route path="/saleinfo" element={<SaleInfo />} />
				{/* 회원 정보 수정 */}
				<Route path="/membercut" element={<MemberInfo />} />
				{/* 내Q&A 현황, Q&A관리 */}
				<Route path="/Qna" element={<QnaStatus />} />

				{/* 사이드바(관리자) 추가내용 경로 설정 */}
				{/* 유저 관리 */}
				<Route path="/user" element={<UserPage />} />
				{/* 블랙 리스트 */}
				<Route path="/blacklist" element={<Blacklist />} />
				{/* 회원정보 수정(관리자) */}
				<Route path="/memberinfo" element={<Membercare />} />
				{/* 서비스 제한 */}
				<Route path="/servicedown" element={<Servicedown />} />

				{/* 푸터 경로 설정 */}
				{/* 개인 정보 처리 방침 */}
				<Route path="/privacy" element={<Privacy />} />
				{/* 이용약관 */}
				<Route path="/terms" element={<Terms />} />
				{/* 저작권장 */}
				<Route path="/copyright" element={<Copyright />} />
				{/* 패키지 추가 */}
				<Route path="/travalpackadd" element={<TravalPackAdd />} />



			</Route>

		</Routes>

	);
}

export default App;
