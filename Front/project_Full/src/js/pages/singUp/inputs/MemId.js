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
        fetch(SERVER_URL + `idCheck?memId=${memId}`, {
            method: 'POST'

        }).then((res) => {

            if (res.ok) {

                if (res.json) {

                    if (window.confirm('사용 가능한 아이디 입니다. 사용하시겠습니까?')) {
                        setNewUser({ ...newUser, memId: memId });
                        setIsStatic(true);
                    }

                } else { alert('이미 사용중인 아이디 입니다.'); }

            } else { throw new Error(' ----- 서버 전송 실패 -----\n다시 시도하세요'); }

        }).catch((e) => { console.log(e); })
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div style={{ display: 'flex' }}>
            <span className="inputLabel">아이디 : </span>
            <input
                type="text"
                placeholder="아이디"
                onChange={(e) => { setMemId(e.target.value) }}
                disabled={isStatic}
            />
            <Button
                style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}
                onClick={onClickBtn}
            >
                중복확인
            </Button>
        </div>
    );
}

export default MemId;