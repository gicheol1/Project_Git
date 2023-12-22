import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"
import { SERVER_URL } from 'js';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
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
      
      <div><h1 className="success"><EventAvailableIcon fontSize="large"/> {`${member.memId}님의 예약이 완료되었습니다.`}</h1></div>
      <div><h1 className="success">{`결제 금액: ${Number(searchParams.get("amount")).toLocaleString()}원`}</h1></div>
      <br/>
      <hr/>
      <h1 className="success-inform">예약내역 확인은 "마이페이지 / 예약정보" 에서 확인하실 수 있습니다.</h1>
      <div>
        <Link to="/packreservationList">
          <button className="success-button-style"><h1 className="success-button">숙소 목록으로</h1></button>
        </Link>
      </div>
    </div>
  )
}