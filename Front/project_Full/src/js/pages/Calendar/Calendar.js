import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './TravelCalendar.css';
import { SERVER_URL } from 'js';
//import MyCalendar_SelectBox from './MyCalendar_SelectBox';


const Calendar = () => {

    const [addrList, setAddr] = useState([]);
    const [CheckList, setCheck] = useState([]);
    const [TagList, setTag] = useState("");
    const [RegionList, setRegion] = useState("");


    useEffect(() => {
        getFestival();
    }, [])

    //-------------------------------------------------------------------

    const getFestival = (Check) => {
        fetch(SERVER_URL + 'festivalAll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }

        }).then((response) => {

            if (response.ok) {
                return response.json();

            } else {
                throw new Error(response.status);

            }

        }).then((data) => {

            setAddr(data);
            setCheck(data);

        }).catch((e) => {
            alert(e)

        })
    }

    const onCheckedItem = (Check, CheckName, CheckThis) => {

        const checkboxes = document.getElementsByName('check');
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== CheckThis) {
                checkboxes[i].checked = false
            }
        }

        console.log(CheckName);
        if (Check) {
            setTag(CheckName);
            if (RegionList === "") {
                const camp = addrList.filter((data) => data.tag === CheckName);
                setCheck(camp);
            }
            else {
                const camp = addrList.filter((data) => data.tag === CheckName && data.region === RegionList);
                setCheck(camp);

            }
        }

        else {
            setTag("");
            if (RegionList === "") {
                getFestival();
            }
            else {
                const camp = addrList.filter((data) => data.region === RegionList);
                setCheck(camp);
            }

        }

    }

    const onSelectedItem = (Select) => {
        if (Select === "X") {
            setRegion("");
            if (TagList === "")
                getFestival();
            else {
                const camp = addrList.filter((data) => data.tag === TagList);
                setCheck(camp);
            }
        }
        else {
            setRegion(Select);

            if (TagList === "") {
                const camp = addrList.filter((data) => data.region === Select);
                setCheck(camp);
            }
            else {
                const camp = addrList.filter((data) => data.region === Select && data.tag === TagList);
                setCheck(camp);
            }


        }


    }


    //--------------------------------------------------------------------------

    return (
        <div className="App">

            <div id="checkBox">
                <input className="축제" type='checkbox' name="check"
                    onChange={(e) => {
                        onCheckedItem(e.target.checked, e.target.className, e.target);
                    }} />축제
                <input className="공연" type='checkbox' name="check"
                    onChange={(e) => {
                        onCheckedItem(e.target.checked, e.target.className, e.target);
                    }} />공연
                <input className="캠핑" type='checkbox' name="check"
                    onChange={(e) => {
                        onCheckedItem(e.target.checked, e.target.className, e.target);
                    }} />캠핑
                <input className="문화" type='checkbox' name="check"
                    onChange={(e) => {
                        onCheckedItem(e.target.checked, e.target.className, e.target);
                    }} />문화

                <select onChange={(e) => {
                    onSelectedItem(e.target.value);
                }}
                >
                    <option key="X" value="X">선택 안함</option>
                    <option key="Seoul" value="서울">서울</option>
                    <option key="Daejeon" value="대전">대전</option>
                    <option key="Daegu" value="대구">대구</option>
                    <option key="Busan" value="부산">부산</option>
                </select>

            </div>

            <div>

                <FullCalendar
                    plugins={[dayGridPlugin]}
                    headerToolbar={{
                        left: 'prev',
                        center: 'title',
                        right: 'next',
                    }}
                    initialView="dayGridMonth"
                    nowIndicator={true}
                    selectable={true}
                    events={CheckList.map((addr) => ({
                        title: `(` + addr.tag + `)` + addr.name,
                        start: addr.endDate,
                        end: addr.startDate

                    }
                    ))}
                />
            </div>


            <div className='line'>

            </div>

            <div className='boxGroup'>


                {CheckList.map(addr =>

                    <div className='img'>
                        <img src={require("./img/" + addr.name + ".png")} />
                    </div>
                )}


            </div>
        </div>);

}

export default Calendar;