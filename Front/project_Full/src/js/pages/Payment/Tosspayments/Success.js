import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"
import { SERVER_URL } from 'js';
import './Success.css';

export function SuccessPage() {
  const [searchParams] = useSearchParams()
  // 서버로 승인 요청
  const [member, setMember] = useState([]); // 회원정보

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if (jwt === undefined || jwt === '') { return; }
    // - 회원 
    fetch(SERVER_URL + `getUser?jwt=${jwt}`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => { setMember(data); })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="success"> 결제 성공 </h1>
      <div><h1 className="success">{`주문 아이디: ${member.memId}`}</h1></div>
      <div><h1 className="success">{`결제 금액: ${Number(searchParams.get("amount")).toLocaleString()}원`}</h1></div>
      <div>
        <Link to="/packreservationList">
          <button><h1 className="success-button">패키지 여행목록으로</h1></button>
        </Link>
      </div>
    </div>
  )
}