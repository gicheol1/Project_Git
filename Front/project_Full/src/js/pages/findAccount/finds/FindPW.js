import { useState } from "react"
import { SERVER_URL } from 'js';

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

        fetch(SERVER_URL + 'resetPW', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(target)

        }).then((response) => {
            if (response.ok) {
                return response.headers
            } else {
                throw new Error(response.status);
            }
        }).then((data) => {
            if (JSON.parse(data.get('findUserResult'))) {
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
            <p>
                <span>아이디 : </span>
                <input
                    type="text"
                    name="memId"
                    placeholder="아이디"
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
            <button onClick={onClickHandle}>새 비밀번호 전송</button>
        </div>
    );

}

export default FindPW;