import Header from "./header/Header";
import Sidebar from './sidebar/Sidebar';
import Sidecare from './sidebar/Sidecare';
import Footer from './footer/Footer';

import { Link, Outlet } from "react-router-dom";
import { useState } from 'react';

import HeaderSub from './header/HeaderSub';

import './LayOut.css';

const LayOut = ({ isLogin, isAdmin, setIsLogin }) => {

    const [isVisible, setIsVisible] = useState(false);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return (
        <div className="layoutContainer" style={{ width: "100%" }}>

            {/* 헤더 */}
            <header
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
            <main>
                <Outlet />
            </main>

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
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default LayOut;