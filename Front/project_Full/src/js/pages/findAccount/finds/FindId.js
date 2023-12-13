import { useState } from "react";
import { SERVER_URL } from 'js';

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

        fetch(SERVER_URL + 'findUserId', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(target)

        }).then((response) => {
            if (response.ok) {
                return response.headers;

            } else {
                throw new Error(response.status);

            }

        }).then((data) => {
            if (JSON.parse(data.get('findUserResult'))) {
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
            <p>
                <span>이름 : </span>
                <input
                    type="text"
                    name="name"
                    placeholder="회원 이름"
                    onChange={(e) => setTarget({ ...target, [e.target.name]: e.target.value })}
                />
            </p>
            <p>
                <span>이메일 : </span>
                <input
                    type="text"
                    name="email"
                    placeholder="이메일"
                    onChange={(e) => setTarget({ ...target, [e.target.name]: e.target.value })}
                />
            </p>
            <p>{findResult}</p>
            <button onClick={onClickHandle}>아이디 전송</button>
        </div>
    );
}

export default FindId;