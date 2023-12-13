import { useEffect, useState } from "react";

const Birth = ({ setNewUser }) => {

    const [year, setYear] = useState(new Date().getFullYear() - 19);
    const [month, setMonth] = useState('01');
    const [day, setDay] = useState('01');

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    // 년(Year) 설정
    const onChangeYear = (e) => {

        if (e.target.value === undefined) { return; }

        setYear(`${e.target.value}`);

    }

    // 월(Month) 설정
    const onChangeMonthDay = (e) => {

        if (e.target.value === undefined) { return; }

        if (e.target.name === 'month') {
            setMonth(e.target.value < 10 ? `0${e.target.value}` : `${e.target.value}`);
        } else {
            setDay(e.target.value < 10 ? `0${e.target.value}` : `${e.target.value}`);
        }
    }

    // 일(Day) 설정
    const [optYear, setOptYear] = useState([]);
    const [optMonth, setOptMonth] = useState([]);
    const [optDay, setOptDay] = useState([]);

    useEffect(() => {
        const yearNow = new Date().getFullYear();

        const options_year = [];
        const options_month = [];
        const options_day = [];

        for (let y = 20; y < 70; y++) {
            options_year.push(<option key={yearNow - y} value={yearNow - y}>{yearNow - y}</option>);
        }

        for (let m = 2; m < 13; m++) {
            options_month.push(<option key={m} value={m}>{m}</option>);
        }

        for (let d = 2; d < 31; d++) {
            options_day.push(<option key={d} value={d}>{d}</option>);
        }

        setOptYear(options_year);
        setOptMonth(options_month);
        setOptDay(options_day);

    }, []);

    // ----- ----- ----- ----- ----- ----- ----- ----- -----

    // 날짜 값이 변할때마다 사용자 정보 업데이트
    useEffect(() => {

        // 월별 일수 지정
        setOptDay(setOptionDay(parseInt(month)));

        setNewUser({ birth: `${year}-${month}-${day}` });

    }, [year, month, day]);

    // ----- ----- ----- ----- ----- ----- ----- ----- -----

    // 월별 일수 지정
    const setOptionDay = (m) => {

        const options_day = [];

        if (m % 2 === 0) { // 짝수인 경우

            if (m === 2) { // 2월인 경우 29일 까지
                for (let d = 2; d < 30; d++) {
                    options_day.push(<option key={d} value={d}>{d}</option>);
                }

            } else { // 그 외에는 31일 까지
                for (let d = 2; d < 32; d++) {
                    options_day.push(<option key={d} value={d}>{d}</option>);
                }

            }

        } else { // 홀수인 경우 30일 까지
            for (let d = 2; d < 31; d++) {
                options_day.push(<option key={d} value={d}>{d}</option>);
            }

        }

        return options_day;
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div className="birth">
            <p>
                <span>생년월일 : </span>
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
            </p>
        </div>
    );
}

export default Birth;