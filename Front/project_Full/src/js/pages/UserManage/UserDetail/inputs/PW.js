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

        } else {
            setIsCorrect('비밀번호가 일치합니다.');
            setNewUser({ ...newUser, pw: pw })
        }
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <>
            <div>
                <span>비밀번호 : </span>
                <input
                    type="text"
                    onChange={onChangePW}
                />
            </div>
            <div>
                <span>비밀번호 확인 : </span>
                <input
                    type="text"
                    onChange={onChangePWCheck}
                />
            </div>
            <div>
                <span>{isCorrect}</span>
            </div>
        </>
    );
}

export default PW;