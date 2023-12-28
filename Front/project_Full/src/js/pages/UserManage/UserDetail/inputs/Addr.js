// Kakao 주소 API (공식)
// https://postcode.map.daum.net/guide

// Kakao 주소 API(React 에서 사용하는 방법)
// https://jforj.tistory.com/268

// 팝업창 띄우기
// https://infodon.tistory.com/117

// address(addr) : 주소
// roadAddress(addrR) : 도로명 주소
// jibunAddress(addrJ) : 지번 주소
// zonecode(zCode) : 우편번호

import { Button } from '@mui/material';
import { useState } from 'react';
import { useDaumPostcodePopup } from "react-daum-postcode";

const Addr = ({ addrRoad, addrJibun, addrCode, addrOther, newUser, setNewUser }) => {

    // 우편번호와 도로/지번 주소를 저장하는 객체
    const [addrFull, setAddrFull] = useState({
        addrRoad: addrRoad, // 도로
        addrJibun: addrJibun, // 지번
        addrCode: addrCode // 우편번호
    })

    const open = useDaumPostcodePopup();

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    const handlePopup = () => {
        open({ onComplete: handleComplete });
    }

    const handleComplete = (data) => {
        setAddrFull({
            addrRoad: data.roadAddress,
            addrJibun: data.jibunAddress,
            addrCode: data.zonecode
        });

        setNewUser({
            ...newUser,
            addrRoad: data.roadAddress,
            addrJibun: data.jibunAddress,
            addrCode: data.zonecode
        });
    }

    const onChangeOther = (addr) => {
        setNewUser({ ...newUser, addrOther: addr });
    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input style={{ flex: '1' }} type='text' name='zonecode' placeholder='우편번호' value={addrFull.addrCode} readOnly={true} />
                <Button onClick={handlePopup}>우편번호 찾기</Button>
            </div>
            <div>
                <input type='text' name='roadAddress' placeholder='도로명' value={addrFull.addrRoad} readOnly={true} />
                <input type='text' name='jibunAddress' placeholder='지번주소' value={addrFull.addrJibun} readOnly={true} />
            </div>
            <div>
                <input type='text' name='' value={addrOther} onChange={(e) => { onChangeOther(e.target.value) }} placeholder='상세주소' />
            </div>
        </>
    );
}

export default Addr;