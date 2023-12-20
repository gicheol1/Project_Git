import './LayOut.css';

import Header from "./header/Header";
import Sidebar from './sidebar/Sidebar';
import Sidecare from './sidebar/Sidecare';
import Footer from './footer/Footer';

import { Link, Outlet } from "react-router-dom";
import { useState } from 'react';
import HeaderSub from './header/HeaderSub';


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
                    <HeaderSub />
                    :
                    <></>
                }
            </header>

            {/* 자식 Route의 element가 위치하는 곳(body 역할) */}
            <body style={{
                /* Outlet을 화면의 나머지 영역을 차지하도록 설정 */
                marginTop: '30px',
                marginBottom: '30px',
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
                        // <Sidecare />
                        <></>
                        :
                        // 사이드바(회원)
                        // <Sidebar />
                        <></>
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