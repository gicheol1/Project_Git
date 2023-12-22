import { SERVER_URL } from 'js';
import { useEffect, useState } from 'react';
/* ----------------------------------------------------------- */
/* react-big-calendar 라이브러리 사용 */
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./TravelCalendar.css";

const localizer = momentLocalizer(moment); // 현지 시간 양식을 가져온다. 
/* ----------------------------------------------------------- */

/* 여행 예약 기능 2-1번*/
/* - 캘린더 */
/* > TravelReservation에서 packNum를 전달받는다. 
*/
function TravelCalendar({ packNum }) {

    /* 캘린더에 출력할 정보 */
    const [events, setEvents] = useState([]);

    // 여행 전체 정보
    const [TravalPacks, setTravalPack] = useState([]); // 패키지 정보

    const TravalPackfestival = TravalPacks.map(Tfestivalname => ({
        festivalname: Tfestivalname.festivalname,
    }));

    console.log(TravalPackfestival);

    /* 축제 정보 */
    const [FestivalAll, setFestivalAll] = useState([]);

    // - FestivalAll에서 name, startDate, endDate 데이터만 출력하는 부분
    const FestivalfilteredData = FestivalAll.map(festivallist => ({
        name: festivallist.name,
        startDate: festivallist.startDate,
        endDate: festivallist.endDate
    }));
    console.log(FestivalfilteredData);

    // 공통 조건에 따라 TravalPacks와 FestivalAll을 매핑
    const matchedData = TravalPackfestival.map(travalPack => {
        // name과 festivalname을 기준으로 해당하는 축제 데이터 찾기
        const matchedFestival = FestivalAll.find(festival => festival.name === travalPack.festivalname);
        return {
            title: matchedFestival.name,
            start: new Date(matchedFestival.startDate),
            end: new Date(matchedFestival.endDate),
            // 포함시키고자 하는 다른 속성 추가
        };
    });
    console.log(matchedData);

    /* =========================================================== */
    /* =========================================================== */
    /* =========================================================== */

    /* 벡엔드에서 설정한 패키지여행, 축제 정보 DB 연결 */
    useEffect(() => {
        fetch(SERVER_URL + `travalpack/${packNum}`) // 패키지 여행의 상세정보(테스트)
            .then((response) => response.json())
            .then((data) => {
                // 패키지 상세 정보가 객체 형태인 경우
                const formattedData = [{
                    title: data.name,
                    start: new Date(data.startDate),
                    end: new Date(data.endDate),
                }];
                setEvents(formattedData);

                setTravalPack([data]);
            })
            .catch((error) => {
                console.error("데이터를 가져오는 중에 오류가 발생했습니다.:", error);
            });

        fetch(SERVER_URL + "festivalAll", { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                setFestivalAll(data); // 전체 데이터를 그대로 설정
            })
            .catch(err => { console.error(err); });

    }, [packNum]);

    /* =========================================================== */
    /* =========================================================== */
    /* =========================================================== */

    /* 이전, 오늘, 다음 버튼과 년, 월 타이틀 기능 */
    const CustomToolbar = (toolbar) => {
        const goToBack = () => {
            toolbar.onNavigate("PREV");
        };

        const goToNext = () => {
            toolbar.onNavigate("NEXT");
        };

        const goToToday = () => {
            toolbar.onNavigate("TODAY");
        };

        const goToSpecificDate = () => {
            const specificDate = moment(events[0].start).toDate(); // 첫 번째 패키지 여행의 시작일로 이동
            toolbar.onNavigate("DATE", specificDate);
        };

        const label = () => {
            const date = moment(toolbar.date);
            return (
                <div className='calendar-date'>
                    <span className='calendar-font' >
                        {date.format("YYYY")}
                    </span>
                    {" "}
                    <span className='calendar-font'>
                        {date.locale("ko").format("MM")}
                    </span>
                </div>
            );
        };

        /* ----------------------------------------------------------- */

        return (
            <div className="rbc-toolbar" style={{ backgroundColor: '#f8f9fa' }}>
                <span className="rbc-btn-group">
                    <button className='calendar-button-font' type="button" onClick={goToBack}>
                        이전
                    </button>
                </span>
                <span className="rbc-btn-group">
                    <button className='calendar-button-font' type="button" onClick={goToNext}>
                        다음
                    </button>
                </span>
                <span className="rbc-btn-group">
                    <button className='calendar-button-font' type="button" onClick={goToToday}>
                        오늘
                    </button>
                </span>
                <span className="rbc-btn-group">
                    <button className='calendar-button-font' type="button" onClick={goToSpecificDate}>
                        예약 시작일로 이동
                    </button>
                </span>
                <span className="rbc-toolbar-label">
                    {label()}
                </span>
            </div>
        );
    };

    /* =========================================================== */
    /* =========================================================== */
    /* =========================================================== */

    /* 패키지 여행에 색깔 부여 */
    const eventStyleGetter = (event, start, end, isSelected) => {
        const startDate = moment(start).toDate(); // 아직 날짜 개체가 아닌 경우 날짜 개체로 변환

        const month = startDate.getMonth();// startDate가 속한 월을 가져옵니다(0-인덱스)

        // 매달 다른 색상을 지정합니다.
        const monthColors = [
            // "red", "orange", "skyblue", "green", "blue", "indigo", "violet",
            // "purple", "pink", "brown", "gray", "black",
            "lightskyblue",
        ];

        // 모듈를 사용하여 매월 색상이 반복되도록 합니다.
        const backgroundColor = monthColors[month % monthColors.length];

        var style = {
            backgroundColor: backgroundColor,
        }

        return {
            style: style
        };
    };

    /* =========================================================== */
    /* =========================================================== */
    /* =========================================================== */

    /* 패키지 여행 이름과 날짜 정보를 출력 */
    const customEventContent = ({ event }) => {
        return (
            <div>
                <b>{event.title}</b>
                [{moment(event.start).format('YYYY-MM-DD')} ~ {moment(event.end).format('YYYY-MM-DD')}]
            </div>
        );
    };

    /* =========================================================== */
    /* =========================================================== */
    /* =========================================================== */

    return (
        /* 달력과 예약일 */
        <div>
            <div className='calendar'>
                <Calendar
                    // 현지 시간 양식을 가져온다.
                    localizer={localizer}

                    // DB혹은 파일을 읽어와 실제 달력에 뿌려 줄 데이터
                    // events={events} // 테스트 용 (숙소일정) 
                    // events={matchedData} // 테스트 용 (축제 일정)
                    events={[...matchedData, ...events]}

                    // 캘린더 몸통 스타일
                    style={{ height: 800, width: "100%", backgroundColor: '#f8f9fa' }}


                    // toolbar:이전, 오늘, 다음 버튼과 년, 월 타이틀, event: 패키지 여행 이름과 날짜 정보
                    components={{ toolbar: CustomToolbar, event: customEventContent }}

                    // 월 만 나오개 뷰 위치 고정 한다.
                    views={["month"]}

                    // 스타일 적용(패키지 여행의 스타일 적용)
                    eventPropGetter={eventStyleGetter}

                    // +more 를 클릭시 초과된 데이터도 보이게 해준다. 
                    popup
                />
            </div>
            <br />
        </div>
    );
}

export default TravelCalendar;

/* 참고: chatGpt */