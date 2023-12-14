import './App.css';

import { Route, Routes } from "react-router-dom";

import { useEffect, useState } from 'react';

import { BoardDetail, BoardList, BoardMU, Home, Proceedpayment, Reservationlist, TravelPackList, TravelReservation } from 'js';


import { ConnectionLog, Festivals}from 'js';
import { ReservationInfo, SaleInfo, MemberInfo, QnaStatus} from 'js';
import { Likeclick, Mymilize, FestivalPage, MainPage} from 'js';
import { Copyright, Privacy, Terms} from 'js';


import { LayOut } from 'js';
import { Login } from 'js';
import { Agreement, SingUp } from 'js';
import { FindAccount } from 'js';
import { useCheckLogin } from 'js/useCheckLogin';

function App() {

	// 로그인 여부
	const [isLogin, setIsLogin] = useState();

	const { checkIsLogin } = useCheckLogin();

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	// 경로가 바뀔때마다 로그인 상태 확인
	useEffect(() => {
		checkIsLogin().then((res) => {
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
			    <Route path="/festivals" element={<Festivals />} />
				<Route path="/connectionlog" element={<ConnectionLog />} />
				<Route path="/Main" element={<MainPage />} />

				{/* 메인페이지 경로 설정 */}
			    <Route path="/likeclick" element={<Likeclick />} />
          		<Route path="/mymilize" element={<Mymilize />} />
          		<Route path="/festival" element={<FestivalPage />} /> 

				{/* 사이드바 경로 설정 */}
				<Route path="/info" element={<ReservationInfo />} />
          		<Route path="/saleinfo" element={<SaleInfo />} />
				<Route path="/membercut" element={<MemberInfo />} />
				<Route path="/Qna" element={<QnaStatus />} />

				{/* 푸터 경로 설정 */}
				<Route path="/privacy" element={<Privacy />} />
          		<Route path="/terms" element={<Terms />} />
          		<Route path="/copyright" element={<Copyright />} /> 



			</Route>

		</Routes>
		
	);
}

export default App;
