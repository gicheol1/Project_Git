import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './TravelCalendar.css';
import { SERVER_URL } from 'js';


const Calendar = () => {

    // 모든 축제 목록
    const [festivalAllList, setFestivalAllList] = useState([{}]);

    // 선택한 태그와 지역
    const [tagList, setTag] = useState([]);
    const [region, setRegion] = useState("");

    // 선택한 태그와 지역의 축제 목록
    const [filteredFestival, setFilteredFestival] = useState([]);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    useEffect(() => { getFestival().then(data => setFestivalAllList(data)); }, [])

    // 태그와 지역을 선택할때마다 실행
    useEffect(() => {

        //선택하지 않은경우
        if (tagList.length === 0) { return; }

        let filterFestival;

        // 태그별 필터
        if (tagList !== undefined && tagList.length !== 0) {
            filterFestival = festivalAllList.filter(f => tagList.includes(f.tag));
        }

        // 지역별 필터
        if (region !== undefined && region !== '') {
            filterFestival = filterFestival.filter(f => region === f.region);
        }

        setFilteredFestival(filterFestival);
    }, [tagList, region])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 모든 축제 가져오기
    const getFestival = () => {
        return fetch(SERVER_URL + 'festivalAll', {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }
            return response.json();

        }).catch((e) => { alert(e) })
    }

    // 태그 선택시
    const onCheckedTag = (target) => {
        if (tagList.includes(target)) { // 태그가 있으면 제거
            const filteredTag = tagList.filter((t) => { return t !== target });
            setTag(filteredTag);

        } else { // 없으면 추가
            setTag([...tagList, target]);
        }
    }

    // 지역 선택시
    const onSelectedRegion = (target) => { setRegion(target); }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return (
        <div style={{ width: "100%" }}>
            <div id="checkBox">

                {/* 태그 선택 */}
                <label>
                    축제
                    <input
                        value="축제"
                        type='checkbox'
                        name="tag"
                        checked={tagList.includes("축제") ? true : false}
                        onChange={(e) => {
                            onCheckedTag(e.target.value, e.target.name);
                        }} />
                </label>
                <label>
                    공연
                    <input
                        value="공연/행사"
                        type='checkbox'
                        name="tag"
                        checked={tagList.includes("공연/행사") ? true : false}
                        onChange={(e) => {
                            onCheckedTag(e.target.value, e.target.className);
                        }} />
                </label>
                <label>
                    캠핑
                    <input
                        value="캠핑"
                        type='checkbox'
                        name="tag"
                        checked={tagList.includes("캠핑") ? true : false}
                        onChange={(e) => {
                            onCheckedTag(e.target.value, e.target.className);
                        }} />
                </label>
                <label>
                    문화
                    <input
                        value="문화"
                        type='checkbox'
                        name="tag"
                        checked={tagList.includes("문화") ? true : false}
                        onChange={(e) => {
                            onCheckedTag(e.target.value, e.target.className);
                        }} />
                </label>

                {/* 지역 선택 */}
                <select
                    name="region"
                    onChange={(e) => { onSelectedRegion(e.target.value); }}
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
                    events={filteredFestival.map((addr) => ({
                        title: `(${addr.tag})${addr.name}`,
                        start: addr.endDate,
                        end: addr.startDate
                    }
                    ))}
                />
            </div>

            <div className='line'></div>

            <div className='boxGroup'>
                {filteredFestival !== undefined && filteredFestival.length !== 0 ?
                    filteredFestival.map(addr =>
                        <div key={addr.festivalNum} className='img'>
                            <img src={require(`./img/${addr.name}.png`)} />
                        </div>
                    ) :
                    festivalAllList.map(addr =>
                        <div key={addr.festivalNum} className='img'>
                            <img src={require(`./img/${addr.name}.png`)} />
                        </div>
                    )
                }
            </div>
        </div>);

}

export default Calendar;