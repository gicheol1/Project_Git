import { Link } from "react-router-dom";

const HeaderSub = () => {

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return (
        <div style={{ marginLeft: '250px' }} className="d-flex flex-wrap align-items-center">
            <ul className="nav col-1 mb-2 justify-content-center text-center">
                <li><Link to={`/boardList/free`} className="nav-link px-1 link-dark">자유 게시판</Link></li>
                <li><Link to={`/boardList/notic`} className="nav-link px-1 link-dark">공지사항</Link></li>
                <li><Link to={`/boardList/promotion`} className="nav-link px-1 link-dark">공연/행사</Link></li>
                <li><Link to={`/boardList/event`} className="nav-link px-1 link-dark">이벤트</Link></li>
                <li><Link to={`/boardList/qa`} className="nav-link px-1 link-dark">질문 게시판</Link></li>
            </ul>
        </div>
    );
}

export default HeaderSub;