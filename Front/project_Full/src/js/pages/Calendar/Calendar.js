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
    const [Img, setImg] = useState([]);
    const [ImgList, setImgList] = useState([]);
    let ImgNum = ([]);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    useEffect(() => { getFestival(); }, []);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    /* 축제 목록 가져오기 */
    const getFestival = (Check) => {
        fetch(SERVER_URL + 'festivalAll', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }
            return response.json();
        }).then((data) => {
            setAddr(data);
            setCheck(data);
            getFestivalImgAll();
        }).catch((e) => { alert(e) })
    }

    /* 각 축제 이미지 가져오기 */
    const getFestivalImg = async (ImgNum) => {
        fetch(SERVER_URL + `getFileFestivalList?festivalNum=${ImgNum}`, {
            method: 'GET'
        }).then((response) => {
            if (!response.ok) { return []; }
            return response.json();
        }).then((data) => {
            if (data !== undefined) {
                // console.log(data);
                setImg(data);
            }
        }).catch((e) => { console.log(e) })

    }

    /* 모든 축제 이미지 가져오기 */
    const getFestivalImgAll = () => {

        fetch(SERVER_URL + 'getFileFestivalAll', {
            method: 'GET'
        }).then((response) => {
            if (!response.ok) { return []; }
            return response.json();
        }).then((data) => {
            setImg(data);
            setImgList(data);
        }).catch((e) => { console.log(e) });
    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    /* 체크박스(TAG) 작용 */
    const onCheckedItem = async (Check, CheckName, CheckThis) => {
        const checkboxes = document.getElementsByName('check');
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== CheckThis) {
                checkboxes[i].checked = false
            }
        }

        if (Check) {
            setTag(CheckName);
            if (RegionList === "") {

                const camp = addrList.filter((data) => data.tag === CheckName);
                setCheck(camp);
                camp.map((data, idx) => { ImgNum[idx - 1] = data.festivalNum; })
                getFestivalImg(ImgNum);

            } else {
                const camp = addrList.filter((data) => data.tag === CheckName && data.region === RegionList);
                setCheck(camp);
                camp.map((data, idx) => { ImgNum[idx] = data.festivalNum; })
                setImg();
                getFestivalImg(ImgNum);
            }

        } else {
            setTag("");
            if (RegionList === "") { getFestival(); }
            else {
                const camp = addrList.filter((data) => data.region === RegionList);
                setCheck(camp);
                camp.map((data, idx) => { ImgNum[idx] = data.festivalNum; })
                setImg();
                getFestivalImg(ImgNum);
            }
        }
    }

    /* 셀렉트박스(지역) */
    const onSelectedItem = (Select) => {
        if (Select === "X") {
            setRegion("");
            if (TagList === "") { getFestival(); }
            else {
                const camp = addrList.filter((data) => data.tag === TagList);
                setCheck(camp);
                camp.map((data, idx) => { ImgNum[idx] = data.festivalNum; })
                setImg();
                getFestivalImg(ImgNum);
            }
        } else {
            setRegion(Select);
            if (TagList === "") {
                const camp = addrList.filter((data) => data.region === Select);
                setCheck(camp);
                camp.map((data, idx) => { ImgNum[idx] = data.festivalNum; })
                setImg();
                getFestivalImg(ImgNum);
            } else {
                const camp = addrList.filter((data) => data.region === Select && data.tag === TagList);
                setCheck(camp);
                camp.map((data, idx) => { ImgNum[idx] = data.festivalNum; })
                setImg();
                getFestivalImg(ImgNum);

            }
        }
    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return (
        <div className="App">

            <div id="checkBox">
                <div className='cam'>
                    캠핑
                    <input className="캠핑" type='checkbox' name="check"
                        onChange={(e) => {
                            onCheckedItem(e.target.checked, e.target.className, e.target);
                        }}
                    />
                </div>
                <div className='cul'>
                    문화
                    <input className="문화" type='checkbox' name="check"
                        onChange={(e) => {
                            onCheckedItem(e.target.checked, e.target.className, e.target);
                        }}
                    />
                </div>
                <div className='fes'>
                    축제
                    <input className="축제" type='checkbox' name="check"
                        onChange={(e) => {
                            onCheckedItem(e.target.checked, e.target.className, e.target);
                        }}
                    />
                </div>
                <div className='mapshow'>
                    공연
                    <input className="공연/행사" type='checkbox' name="check"
                        onChange={(e) => {
                            onCheckedItem(e.target.checked, e.target.className, e.target);
                        }}
                    />
                </div>

                <div className="calselectBox">
                    <p>지역선택:</p>
                    <select className="selectInput" onChange={(e) => {
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
            </div>


            <FullCalendar
                plugins={[dayGridPlugin]}
                headerToolbar={{
                    left: 'prev', /* 전 월로 넘기기 */
                    center: 'title', /* 달력 중간에 띄울 것 */
                    right: 'next', /* 다음 월로 넘기기 */
                }}
                initialView="dayGridMonth"
                height={900}
                locale={'ko'} /* 한국어 */
                nowIndicator={true}
                selectable={true}
                /* 달력에 축제 기간 띄우기 */
                events={CheckList.map((addr) => ({
                    title: `(` + addr.tag + `)` + addr.name,
                    start: addr.startDate,
                    end: addr.endDate,

                }
                ))}
            />

            <div className='line'></div>

            <div className='boxGroup'>

                {Img !== undefined ?
                    Img.map((image, index) =>
                        /* 축제 이름 비교해서 같은 사진 불러와서 출력 */

                        <span class="card">
                            <img key={`image ${index}`}
                                alt={`image ${image.orgName}`}
                                src={`data:image/png;base64,${image.imgFile}`}
                            />
                        </span>
                    )
                    :
                    <></>
                }
            </div>
        </div>);
}
export default Calendar;