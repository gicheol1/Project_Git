import { useState } from "react";
import FindId from "./finds/FindId";
import FindPW from "./finds/FindPW";

import './FindAccount.css';

const FindAccount = () => {

    const [target, setTarget] = useState('findId');

    return (
        <div>
            <label style={{ display: 'flex' }}>
                아이디 찾기
                <input
                    type="radio"
                    style={{ flex: '1', marginTop: '5px' }}
                    value="findId"
                    checked={target === "findId"}
                    onClick={(e) => setTarget(e.target.value)}
                />
            </label>
            <label style={{ display: 'flex' }}>
                비밀번호 찾기
                <input
                    type="radio"
                    style={{ flex: '1', marginTop: '5px' }}
                    value="findPw"
                    checked={target === "findPw"}
                    onClick={(e) => setTarget(e.target.value)}
                />
            </label>
            <hr />
            {
                target === "findId" ? <FindId /> : <FindPW />
            }
        </div>
    );
}

export default FindAccount;