import './LayOut.css';

import Header from "./header/Header";
import Sidebar from './sidebar/Sidebar';
import Sidecare from './sidebar/Sidecare';
import Footer from './footer/Footer';

import { Link, Outlet } from "react-router-dom";
import { useState } from 'react';


const LayOut = ({ isLogin, isAdmin, setIsLogin }) => {

    const [isVisible, setIsVisible] = useState(false);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return (
        <div className="container" style={{ width: "100%" }}>

            {/* 헤더 */}
            <header
                style={{ backgroundColor: 'lightskyblue', width: "100vw" }}
                onMouseEnter={() => { setIsVisible(true) }}
                onMouseLeave={() => { setIsVisible(false) }}
            >
                <Header
                    isLogin={isLogin}
                    isAdmin={isAdmin}
                    setIsLogin={setIsLogin}
                />

                {/* 하위 메뉴 */}
                {isVisible ?
                    <div className="d-flex flex-wrap align-items-center">
                        <ul className="nav col-1 mb-2 justify-content-center mb-md-0 text-center">
                            <li><Link to={`/boardList/free`} className="nav-link px-1 link-dark">자유 게시판</Link></li>
                            <li><Link to={`/boardList/notic`} className="nav-link px-1 link-dark">공지사항</Link></li>
                            <li><Link to={`/boardList/promotion`} className="nav-link px-1 link-dark">공연/행사</Link></li>
                            <li><Link to={`/boardList/event`} className="nav-link px-1 link-dark">이벤트</Link></li>
                            <li><Link to={`/boardList/qa`} className="nav-link px-1 link-dark">질문 게시판</Link></li>
                        </ul>
                    </div>
                    :
                    <></>
                }
            </header>

            {/* 자식 Route의 element가 위치하는 곳(body 역할) */}
            <body style={{
                /* Outlet을 화면의 나머지 영역을 차지하도록 설정 */
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Outlet />
            </body>

            {/* 사이드바 */}
            {isLogin && (
                <sidebar>
                    {isAdmin ?
                        // 사이드바(관리자)
                        <Sidecare />
                        :
                        // 사이드바(회원)
                        <Sidebar />
                    }
                </sidebar>
            )}

            {/* 푸터 */}
            <footer class="footer" style={{
                width: "100%",
                height: '120px',

                /* 페이지 아래로 고정하기 위해 marginTop을 auto로 설정 */
                marginTop: 'auto',
            }}>
                <Footer />
            </footer>
        </div>
    );
}

export default LayOut;