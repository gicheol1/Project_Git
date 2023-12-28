import { useState } from "react"
import { SERVER_URL } from 'js';
import { Button } from "@mui/material";

const FindPW = () => {

    const [target, setTarget] = useState({
        memId: '',
        email: ''
    })

    const [findResult, setFindResult] = useState('');

    const onClickHandle = () => {

        if (target.name === '' || target.email === '') {
            alert('필수 정보를 입력해야 합니다.');
            return;
        };

        fetch(SERVER_URL + `resetPW?memId=${target.memId}&email=${target.email}`, {
            method: 'POST'

        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();

        }).then((data) => {
            if (data) {
                setFindResult('새 비밀번호가 전송되었습니다.');

            } else {
                setFindResult('일치하는 회원이 없습니다.');

            }
        }).catch((e) => {
            console.log(e);
            setFindResult('서버 전송 실패. 다시 시도하세요.');
        })
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <span className="inputLabel">아이디 : </span>
                <input
                    type="text"
                    name="memId"
                    placeholder="아이디"
                    onChange={(e) => setTarget({ ...target, [e.target.name]: e.target.value })}
                />
            </div>
            <div style={{ display: 'flex' }}>
                <span className="inputLabel">이메일 : </span>
                <input
                    type="text"
                    name="email"
                    placeholder="이메일"
                    onChange={(e) => setTarget({ ...target, [e.target.name]: e.target.value })}
                />
            </div>
            <p>{findResult}</p>
            <Button onClick={onClickHandle}>새 비밀번호 전송</Button>
        </div>
    );

}

export default FindPW;