import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import { useLogOut } from "./useLogOut";


const Header = ({ setIsLogin }) => {

    const naviagte = useNavigate();

    const { logOut } = useLogOut();

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    // 로그아웃
    const toLogout = async () => {
        logOut().then((res) => {
            sessionStorage.removeItem('jwt');
            setIsLogin(res);
            naviagte('/');
        });
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    const move = (e) => {
        naviagte(e.target.value);
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <>
            <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                {/* <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink: href="#bootstrap" /></svg> */}
            </a>

            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><Link href="/" class="nav-link px-2 link-secondary">홈</Link></li>
                <li><Link href="#" class="nav-link px-2 link-dark">Features</Link></li>
                <li><Link href="#" class="nav-link px-2 link-dark">Pricing</Link></li>
                <li><Link href="#" class="nav-link px-2 link-dark">FAQs</Link></li>
                <li><Link href="#" class="nav-link px-2 link-dark">About</Link></li>
            </ul>

            <div class="col-md-3 text-end">
                <button type="button" class="btn btn-outline-primary me-2">Login</button>
                <button type="button" class="btn btn-primary">Sign-up</button>
            </div>
        </>

    );
}

export default Header;