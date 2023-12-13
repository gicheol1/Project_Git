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

const Addr = ({ setNewUser }) => {

    // 우편번호와 도로/지번 주소를 저장하는 객체
    const [addrFull, setAddrFull] = useState({
        addrRoad: '', // 도로
        addrJibun: '', // 지번
        addrCode: '' // 우편번호
    })

    const open = useDaumPostcodePopup();

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    const handlePopup = () => {
        open({ onComplete: handleComplete });
    }

    const handleComplete = (data) => {
        setAddrFull({
            addrR: data.roadAddress,
            addrJ: data.jibunAddress,
            zCode: data.zonecode
        });

        setNewUser(addrFull);
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div>
            <p>
                <input type='text' name='zonecode' placeholder='우편번호' value={addrFull.zCode} readOnly={true} />
                <Button onClick={handlePopup}>우편번호 찾기</Button>
            </p>
            <p>
                <input type='text' name='roadAddress' placeholder='도로명' value={addrFull.addrR} readOnly={true} />
                <input type='text' name='jibunAddress' placeholder='지번주소' value={addrFull.addrJ} readOnly={true} />
            </p>
            <p>
                <input type='text' name='' placeholder='상세주소' />
            </p>
        </div>
    );
}

export default Addr;