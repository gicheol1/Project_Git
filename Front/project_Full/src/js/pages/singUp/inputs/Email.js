import { useState } from "react";
import { SERVER_URL } from 'js';
import { Button } from "@mui/material";

const Email = ({ newUser, setNewUser }) => {

    // 이메일과 인증 코드
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    // 이메일 입력 구간
    const [disableEmail, setDisableEmail] = useState(false);

    // 인증번호 입력 구간
    const [disableCode, setDisableCode] = useState(true);

    // 각 메시지 출력
    const [messageEmail, setMessageEmail] = useState(' ');
    const [messageCode, setMessageCode] = useState(' ');

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    const isEmail = (_email) => {
        return !/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/.test(_email);
    }

    const onChangeEmail = (e) => {
        if (isEmail(e.target.value)) { setMessageEmail('유효하지 않은 이메일 형식입니다.') }
        else { setMessageEmail(''); }
    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 입력한 이메일로 인증번호 전송
    const sendCode = () => {

        if (isEmail(email)) { setMessageEmail('유효하지 않은 이메일 형식입니다.'); return; }

        setMessageEmail('인증번호 전송중...');

        fetch(SERVER_URL + `sendCode?email=${email}`, {
            method: 'POST'

        }).then((response) => {
            if (response.ok) {
                setMessageEmail('인증번호가 전송되었습니다.');

                setDisableEmail(true);
                setDisableCode(false);

            } else {
                throw new Error('');

            }
        }).catch((e) => {
            setMessageEmail('서버 전송 실패. 다시 시도하세요');

        })
    }

    // 인증번호 인증받기
    const verifyCode = () => {

        fetch(SERVER_URL + `verifyCode?email=${email}&code=${code}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                code: code
            })

        }).then((response) => {
            if (response.ok) {
                return response.json();

            } else {
                throw new Error();

            }
        }).then((res) => {
            if (res) {
                setMessageEmail('');
                setMessageCode(' ----- 인증 성공 ----- ');

                setNewUser({ ...newUser, email: email });

                setDisableCode(true);

            } else {
                setMessageCode('인증 실패. 인증 코드를 다시 확인해 보세요.');

            }

        }).catch((e) => {
            setMessageCode('서버 전송 실패. 다시 시도하세요');

        })
    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return (
        <div>

            {/* ===== 이메일 입력 ===== */}
            <div style={{ display: 'flex' }}>
                <span className="inputLabel">이메일 : </span>
                <input
                    type="text"
                    placeholder="사용자명"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        onChangeEmail(e);
                    }}
                    disabled={disableEmail}
                />
                <Button
                    style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '15px' }}
                    onClick={sendCode}
                    disabled={disableEmail}
                >
                    인증번호 전송
                </Button>
            </div>

            <p>{messageEmail}</p>

            {/* ===== 인증번호 입력 ===== */}
            <div style={{ display: 'flex' }}>
                <span className="inputLabel">인증번호 : </span>
                <input
                    type="text"
                    placeholder="인증번호 입력"
                    value={code}
                    onChange={(e) => { setCode(e.target.value) }}
                    disabled={disableCode}
                />
                <Button
                    style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '15px' }}
                    onClick={verifyCode}
                    disabled={disableCode}
                >확인</Button>
            </div>

            <p>{messageCode}</p>

        </div>
    );
}

export default Email;