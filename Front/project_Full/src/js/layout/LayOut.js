import Header from "./header/Header";
import Sidebar from './sidebar/Sidebar/Sidebar';
import Sidecare from './sidebar/Sidecare/Sidecare';
import Footer from './footer/Footer';

import { Outlet } from "react-router-dom";
import { useState } from 'react';

import HeaderSub from './header/HeaderSub';

import './LayOut.css';

const LayOut = ({ isLogin, isAdmin, setIsLogin }) => {

    // 해더에 마우스가 올라오면 
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
                isAdmin ?
                    // 사이드바(관리자)
                    <sidebar>
                        <Sidecare />
                    </sidebar>

                    :
                    // 사이드바(회원)
                    <sidebar>
                        <Sidebar />
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