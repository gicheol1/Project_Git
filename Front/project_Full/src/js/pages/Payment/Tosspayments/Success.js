import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"
import { SERVER_URL } from 'js';

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
      <h1> 결제 성공 </h1>
      <div>{`주문 아이디: ${member.memId}`}</div>
      <div>{`결제 금액: ${Number(searchParams.get("amount")).toLocaleString()}원`}</div>
      <div>
        <Link to="/packreservationList">
          <button>패키지 여행목록으로</button>
        </Link>
      </div>
    </div>
  )
}