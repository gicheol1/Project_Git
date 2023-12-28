import { useEffect, useState } from "react";

const PNum = ({ newUser, setNewUser }) => {

    const [phonNum, setPhonNum] = useState({
        num1: '',
        num2: '',
        num3: '',
    });

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    useEffect(() => {
        if (checkNumber()) {
            setNewUser({ ...newUser, phonNum: `${phonNum.num1}-${phonNum.num2}-${phonNum.num3}` });
        }
    }, [phonNum])

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    const checkNumber = () => {
        for (const key in phonNum) {
            if (phonNum[key] === '') {
                return false;
            }
        }
        return true;
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div style={{ display: 'flex' }}>
            <span className="inputLabel">전화번호 : </span>
            <input
                type="text"
                name="num"
                maxLength={3}
                value={phonNum.num1}
                style={{ width: '50px', textAlign: 'center' }}
                onChange={e => setPhonNum({ ...phonNum, num1: e.target.value })}
            />
            <span className="inputLabel">-</span>
            <input
                type="text"
                name="num"
                maxLength={4}
                value={phonNum.num2}
                style={{ width: '60px', textAlign: 'center' }}
                onChange={e => setPhonNum({ ...phonNum, num2: e.target.value })}
            />
            <span className="inputLabel">-</span>
            <input
                type="text"
                name="num"
                maxLength={4}
                value={phonNum.num3}
                style={{ width: '60px', textAlign: 'center' }}
                onChange={e => setPhonNum({ ...phonNum, num3: e.target.value })}
            />
        </div>
    );
}

export default PNum;