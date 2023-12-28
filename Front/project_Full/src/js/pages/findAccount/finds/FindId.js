import { useState } from "react";
import { SERVER_URL } from 'js';
import { Button } from "@mui/material";

const FindId = () => {

    const [target, setTarget] = useState({
        name: '',
        email: ''
    })

    const [findResult, setFindResult] = useState('');

    const onClickHandle = () => {

        if (target.name === '' || target.email === '') {
            alert('필수 정보를 입력해야 합니다.');
            return;
        };

        fetch(SERVER_URL + `findUserId?name=${target.name}&email=${target.email}`, {
            method: 'POST'

        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();

        }).then((data) => {
            if (data) {
                setFindResult('이메일로 회원 아이디를 전송하였습니다.');

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
                <span className="inputLabel">이름 : </span>
                <input
                    type="text"
                    name="name"
                    placeholder="회원 이름"
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
            <Button onClick={onClickHandle}>아이디 전송</Button>
        </div>
    );
}

export default FindId;