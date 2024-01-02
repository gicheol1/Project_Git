import { useState } from "react";

const PW = ({ newUser, setNewUser }) => {

    const [pw, setPw] = useState('');
    const [isCorrect, setIsCorrect] = useState('');

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    const onChangePW = (e) => {
        setPw(e.target.value);
    }

    const onChangePWCheck = (e) => {
        if (e.target.value !== pw) {
            setIsCorrect('비밀번호가 일치하지 않습니다.');
            setNewUser({ ...newUser, pw: '' })

        } else {
            setIsCorrect('비밀번호가 일치합니다.');
            setNewUser({ ...newUser, pw: pw })
        }
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <span className="inputLabel">비밀번호 : </span>
                <input
                    style={{ flex: '1' }}
                    type='password'
                    placeholder="비밀번호"
                    onChange={onChangePW}
                />
            </div>
            <div style={{ display: 'flex' }}>
                <span className="inputLabel">비밀번호 확인 : </span>
                <input
                    style={{ flex: '1' }}
                    type="password"
                    placeholder="비밀번호 확인"
                    onChange={onChangePWCheck}
                />
            </div>
            <div>
                <span>{isCorrect}</span>
            </div>
        </div>
    );
}

export default PW;