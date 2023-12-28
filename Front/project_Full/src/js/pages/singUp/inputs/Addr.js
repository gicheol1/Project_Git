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

const Addr = ({ newUser, setNewUser }) => {

    // 우편번호와 도로/지번 주소를 저장하는 객체
    const [addrFull, setAddrFull] = useState({
        addrRoad: '', // 도로
        addrJibun: '', // 지번
        addrCode: '', // 우편번호
        addrOther: '' // 상세주소
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

        setNewUser({
            ...newUser,
            addrRoad: data.roadAddress,
            addrJibun: data.jibunAddress,
            addrCode: data.zonecode
        });
    }

    const onChangeOther = (addrOther) => {
        setNewUser({ ...newUser, addrOther: addrOther });
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div>
            <p style={{ display: 'flex' }}>
                <input type='text' name='zonecode' placeholder='우편번호' value={addrFull.zCode} disabled={true} />
                <Button
                    style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '15px' }}
                    onClick={handlePopup}
                >
                    우편번호 찾기
                </Button>
            </p>
            <p>
                <input type='text' name='roadAddress' placeholder='도로명' value={addrFull.addrR} disabled={true} />
                <input type='text' name='jibunAddress' placeholder='지번주소' value={addrFull.addrJ} disabled={true} />
            </p>
            <p>
                <input type='text' name='' value={newUser.addrOther} onChange={(e) => { onChangeOther(e.target.value) }} placeholder='상세주소' />
            </p>
        </div>
    );
}

export default Addr;