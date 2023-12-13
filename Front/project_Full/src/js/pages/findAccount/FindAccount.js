import { useState } from "react";
import FindId from "./finds/FindId";
import FindPW from "./finds/FindPW";

const FindAccount = () => {

    const [target, setTarget] = useState('findId');

    return (
        <div>
            <label>
                <input
                    type="radio"
                    value="findId"
                    checked={target === "findId"}
                    onClick={(e) => setTarget(e.target.value)}
                />
                아이디 찾기
            </label>
            <label>
                <input
                    type="radio"
                    value="findPw"
                    checked={target === "findPw"}
                    onClick={(e) => setTarget(e.target.value)}
                />
                비밀번호 찾기
            </label>
            {
                target === "findId" ? <FindId /> : <FindPW />
            }
        </div>
    );
}

export default FindAccount;