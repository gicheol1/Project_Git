import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Servicedown.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useServicedown } from './useServicedown';

const Servicedown = () => {

  const navigate = useNavigate();

  // 확인하고자 하는 블랙리스트 번호
  const { blackNum } = useParams();

  // 블랙리스트 상세 정보
  const [blackInfo, setBlackInfo] = useState({
    memId: '',
    banDate: '',
    banEndDate: '',
    reason: '',
  });

  const [switchs, setSwitchs] = useState({
    selfTextEnable: false,
    setReason: '',
    selfEndDate: false,
    setEndDate: '',
  });

  const { getBlackDetail, updateBlack, deleteBlack } = useServicedown();

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  useEffect(() => {

    if (blackNum !== undefined || blackNum !== '') {
      getBlackDetail(blackNum).then(result => {

        if (!result) { alert('데이터가 없습니다.'); navigate(`/blacklist`); }
        setBlackInfo({ result });

      });
    }
  }, [blackNum]);

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  const handleSubmit = () => {

    if (isNotNull()) { alert('필수 사항을 입력하세요.'); return; }

    updateBlack(blackInfo).then((result) => {

      if (result) {
        alert('저장되었습니다.');
        navigate('/blackList');

      } else { alert('저장에 실패했습니다'); }
    })
  }

  const handleDelete = () => {

    if (!window.confirm('정말로 해제하시겠습니까?')) { return; }

    deleteBlack(blackNum).then((result) => {

      if (result) {
        alert('삭제되었습니다.');
        navigate('/blackList');

      } else { alert('삭제에 실패했습니다'); }
    })
  }

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  // 차단사유(선택)
  const handleSelectChange = (value) => {
    if (value === 'self') {
      setBlackInfo({ ...blackInfo, reason: '' });
      setSwitchs({ ...switchs, textEnable: true });
      return;
    }

    setSwitchs({ ...switchs, textEnable: false });

    switch (value) {
      case 'maner':
        setBlackInfo({ ...blackInfo, reason: '부적절한 행위' }); break;

      case 'bug':
        setBlackInfo({ ...blackInfo, reason: '버그 발생' }); break;

      default:
        break;
    }
  };

  // 조치내용 선택
  const handleActionChange = (value) => {
    if (value === 'self') {
      setSwitchs({ ...switchs, selfEndDate: true });
      return;
    }

    setSwitchs({ ...switchs, selfEndDate: false });

    // 현재 날짜를 가져오기
    const currentDate = new Date();

    switch (value) {
      case '10':
        currentDate.setDate(currentDate.getDate() + 10);
        setBlackInfo({ ...blackInfo, banEndDate: currentDate.toISOString().split('T')[0] }); break;

      case 'infinity':
        setBlackInfo({ ...blackInfo, banEndDate: null }); break;

      default:
        break;
    }

  };

  const isNotNull = () => {

    for (let key in blackInfo.key) {

      if (key === 'banDate') { continue; }

      if (blackInfo[key] === undefined || blackInfo[key] === '') { return true; }
    }

    return false;
  }

  // const showDate = () => { console.log(blackInfo); }

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  return (
    <div className="center-container">

      <label htmlFor="memId">아이디:</label>
      <input
        type="text"
        id="memId"
        name="memId"
        value={blackInfo.memId}
        onChange={(e) => setBlackInfo({ ...blackInfo, memId: e.target.value })}
        required
      />

      <br />

      <label htmlFor="blockReason">차단 사유:</label>
      <select
        id="blockReason"
        name="blockReason"
        value={blackInfo.blockReason}
        onChange={(e) => { handleSelectChange(e.target.value) }}
      >
        <option value="">선택</option>
        <option value="self">-직접 입력-</option>
        <option value="maner">부적절한 행위</option>
        <option value="bug">버그 발생</option>
      </select>

      <br />

      {switchs.textEnable && (
        <>
          <textarea
            id="directReason"
            name="directReason"
            value={blackInfo.reason}
            onChange={(e) => setBlackInfo({ ...blackInfo, reason: e.target.value })}
            style={{ border: '1px solid black', marginTop: '10px', width: '100%', height: '100px', resize: 'none' }}
          />
          <br />
        </>
      )}

      <label htmlFor="action">조치내용:</label>
      <select
        id="action"
        name="action"
        value={blackInfo.action}
        onChange={(e) => { handleActionChange(e.target.value) }}
      >
        <option value="">선택</option>
        <option value="self">직접 선택</option>
        <option value="10">차단 10일</option>
        <option value="infinity">영구 차단</option>
      </select>

      <br />

      {switchs.selfEndDate && (
        <>
          <label htmlFor="banEndDate">차단 종료 일자:</label>
          <input
            type="date"
            id="banEndDate"
            name="banEndDate"
            min={new Date().toISOString().split('T')[0]}
            value={blackInfo.banEndDate}
            onChange={(e) => setBlackInfo({ ...blackInfo, banEndDate: e.target.value })}
            required
          />
          <br />
        </>
      )}

      {blackNum === 'null' ?
        <button type="button" onClick={handleSubmit}>적용</button>
        :
        <div>
          <button type="button" onClick={handleSubmit}>수정</button>
          <button type="button" onClick={handleDelete}>삭제</button>
        </div>
      }
      {/* <button type="button" onClick={showDate}>데이터 확인</button> */}
    </div>
  );
};

export default Servicedown;
