import { useState } from "react";

const PNum = ({ phonNum, newUser, setNewUser }) => {

    const [newPhonNum, setNewPhonNum] = useState(phonNum);

    const onChangePW = (e) => {
        setNewPhonNum(e.target.value);
        setNewUser({ ...newUser, phonNum: e.target.value });
        console.log(newUser);
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div className="pNum">
            <p>
                <span>전화번호 : </span>
                <input
                    type="text"
                    value={newPhonNum}
                    onChange={onChangePW}
                />
            </p>
        </div>
    );
}

export default PNum;