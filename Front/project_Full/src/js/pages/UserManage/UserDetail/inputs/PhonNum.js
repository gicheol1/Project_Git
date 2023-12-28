import { useEffect, useState } from "react";

const PNum = ({ phonNum, newUser, setNewUser }) => {

    const [num, setNum] = useState({
        num1: '',
        num2: '',
        num3: '',
    });

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    useEffect(() => {

        const parts = phonNum.split('-');
        setNum(prevNum => ({
            num1: parts[0],
            num2: parts[1],
            num3: parts[2],
        }));

    }, [])

    useEffect(() => {

        if (!checkNumber()) { return; }

        setNewUser({ ...newUser, phonNum: `${num.num1}-${num.num2}-${num.num3}` });

    }, [num])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    const checkNumber = () => {
        for (const key in phonNum) {
            if (phonNum[key] === '') {
                return false;
            }
        }
        return true;
    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return (
        <>
            <span className="inputLabel">전화번호 : </span>
            <input
                type="text"
                name="num1"
                maxLength={3}
                value={num.num1}
                style={{ width: '50px', textAlign: 'center' }}
                onChange={e => setNum({ ...num, num1: e.target.value })}
            />
            <span className="inputLabel">-</span>
            <input
                type="text"
                name="num2"
                maxLength={4}
                value={num.num2}
                style={{ width: '60px', textAlign: 'center' }}
                onChange={e => setNum({ ...num, num2: e.target.value })}
            />
            <span className="inputLabel">-</span>
            <input
                type="text"
                name="num3"
                maxLength={4}
                value={num.num3}
                style={{ width: '60px', textAlign: 'center' }}
                onChange={e => setNum({ ...num, num3: e.target.value })}
            />
        </>
    );
}

export default PNum;