
import { Link, useNavigate } from "react-router-dom";
import { useLogOut } from "./useLogOut";
import { useState } from "react";


const Header = ({ isLogin, isAdmin, setIsLogin }) => {

    const naviagte = useNavigate();

    const { logOut } = useLogOut();

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 로그아웃
    const toLogout = async () => {
        logOut().then((res) => {
            sessionStorage.removeItem('jwt');
            setIsLogin(res);
            naviagte('/');
        });
    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return (
        <div
            className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom"
        >
            {/* 이미지 링크 */}
            <a href="/" className="d-flex align-items-center col-md-3 text-dark text-decoration-none"></a>

            {/* 메뉴 */}
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><Link to="/" className="nav-link px-2 link-dark">홈</Link></li>
                <li><Link to="*" className="nav-link px-2 link-dark">게시판</Link></li>
                <li><Link to="/travelKaKaoMap" className="nav-link px-2 link-dark">여행지도</Link></li>
                <li><Link to="/calendar" className="nav-link px-2 link-dark">여행달력</Link></li>
                <li><Link to="/packreservationList" className="nav-link px-2 link-dark">여행상품</Link></li>
                <li><Link to="/connectionlog" className="nav-link px-2 link-dark">⏱ 최근 본 내역</Link></li>
                {isAdmin && (
                    <>
                        <li><Link to="/festivalList" className="nav-link px-2 link-dark">축제관리</Link></li>
                        <li><Link to="/travalpackadd" className="nav-link px-2 link-dark">패키지관리</Link></li>
                    </>
                )}
            </ul>

            {/* 우측 버튼 */}
            {isLogin ?
                <div className="col-md-4 text-end">
                    <ul className="nav col-md-auto justify-content-center mb-md-0">
                        <li><button onClick={toLogout} class="btn btn-primary">로그아웃</button></li>
                        <li><Link to='/myPage' className="btn btn-outline-primary me-2">👤 마이페이지</Link></li>
                        <li><Link to='/mycart' className="btn btn-outline-primary me-2">🛒 장바구니</Link></li>
                        <li><Link to='/packreservation/memberpackreservation' className="btn btn-outline-primary me-2">⏱ 예약 목록</Link></li>
                    </ul>
                </div>
                :
                <div className="col-md-2 text-end">
                    <ul className="nav col-md-auto justify-content-center mb-md-0">
                        <li><Link to='/login' className="btn btn-primary">로그인</Link></li>
                    </ul>
                </div>
            }
        </div>
    );
}

export default Header;