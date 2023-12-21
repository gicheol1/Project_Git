import { useState } from "react";
import { SERVER_URL } from 'js';
import { Button } from '@mui/material';

const MemId = ({ newUser, setNewUser }) => {

    const [memId, setMemId] = useState('');
    const [isStatic, setIsStatic] = useState(false);

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    const onClickBtn = () => {
        fetch(SERVER_URL + `idCheck/${memId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: memId

        }).then((response) => {

            if (response.ok) {

                if (JSON.parse(response.headers.get('idCheckResult'))) {
                    alert('사용 가능한 아이디 입니다.');
                    setNewUser({ ...newUser, memId: memId });
                    setIsStatic(true);

                } else { // 이미 존재하는 경우
                    alert('이미 사용중인 아이디 입니다.');

                }

            } else {
                throw new Error(' ----- 서버 전송 실패 -----\n다시 시도하세요');
            }

        }).catch((e) => {
            console.log(e);
        })
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div className="memid">
            <p>
                <span>아이디 : </span>
                <input
                    type="text"
                    onChange={(e) => { setMemId(e.target.value) }}
                    disabled={isStatic}
                />
                <Button onClick={onClickBtn}>중복확인</Button>
            </p>
        </div>
    );
}

export default MemId;