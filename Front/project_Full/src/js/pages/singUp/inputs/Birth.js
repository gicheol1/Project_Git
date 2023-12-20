import { useEffect, useState } from "react";

const Birth = ({ setNewUser }) => {

    const [birth, setBirth] = useState('');

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    const ohandleChange = (e) => {
        setNewUser({ birth: e.target.value });
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div className="birth">
            <span>생년월일 : </span>
            <input type="date" onChange={ohandleChange} />
            {/* <p>
                <select name="year" onChange={onChangeYear}>
                    <option value={new Date().getFullYear() - 19}>
                        {`${new Date().getFullYear() - 19}년`}
                    </option>
                    {optYear}
                </select>

                <select name="month" onChange={onChangeMonthDay}>
                    <option key={1} value={1}>1월</option>
                    {optMonth}
                </select>

                <select name="day" onChange={onChangeMonthDay}>
                    <option key={1} value={1}>1일</option>
                    {optDay}
                </select>
            </p> */}
        </div>
    );
}

export default Birth;