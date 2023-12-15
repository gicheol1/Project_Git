import './LayOut.css';

import Header from "./header/Header";
import Sidebar from './sidebar/Sidebar';
import Sidecare from './sidebar/Sidecare';
import Footer from './footer/Footer';

import { Outlet } from "react-router-dom";


const LayOut = ({ isLogin, setIsLogin }) => {

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div className="container">

            {/* 헤더 */}
            <header style={{
                backgroundColor: "greenyellow"
            }}>
                <Header isLogin={isLogin} setIsLogin={setIsLogin} />
            </header>
            
            {/* 자식 Route의 element가 위치하는 곳 */}
            <main style={{

                /* Outlet을 화면의 나머지 영역을 차지하도록 설정 */
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                
                <Outlet />
                
            </main>


            {/* 사이드바 */}
            <sidebar style={{

            }}>
                {/* 사이드바(회원) */}
                {/* <Sidebar />  */}
                {/* 사이드바(관리자) */}
                <Sidecare />  
            </sidebar>



            {/* 푸터 */}
            <footer style={{
                height: '120px',
                background: 'lightgray',
                padding: 16,
                fontSize: 24,

                /* 페이지 아래로 고정하기 위해 marginTop을 auto로 설정 */
                marginTop: 'auto',
            }}>
                <Footer />
            </footer>
        </div>
    );
}

export default LayOut;