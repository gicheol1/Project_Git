import { SERVER_URL } from "js/component/constants";

export function useReservationInfo() {

    // 사용자 정보 가져오기
    const getUser = async () => {
        const jwt = sessionStorage.getItem('jwt');

        if (jwt === undefined || jwt === '') { return false; }

        return fetch(SERVER_URL + `getUser?jwt=${jwt}`, {
            method: 'GET'
        }).then(res => {
            return res.json();
        }).catch(e => { return undefined; })
    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 페이지별 회원이 예약한 패키지 여행 가져오기
    const getPackReserv = async (page, memId) => {

        return fetch(SERVER_URL + `packreservation/getPackReservPage?memId=${memId}&page=${page}`, {
            method: 'GET'
        }).then(res => {
            return res.json();

        }).catch(e => { console.log(e) })
    }

    // 회원이 예약한 패키지 여행의 수
    const getPackReservCnt = async (memId) => {

        return fetch(SERVER_URL + `packreservation/getPackReservCnt?memId=${memId}`, {
            method: 'GET'
        }).then(res => {
            return res.json();

        }).catch(e => { console.log(e) })
    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 특정 기간 안에 회원이 예약한 패키지 여행 가져오기
    const getPackReservDate = async (page, memId, startDate, endDate) => {

        return fetch(SERVER_URL + `packreservation/getPackReservDatePage?memId=${memId}&page=${page}&startDate=${startDate}&endDate=${endDate}`, {
            method: 'GET'
        }).then(res => {
            return res.json();

        }).catch(e => { console.log(e) })
    }

    // 특정 기간 안에 회원이 예약한 패키지 여행의 수

    const getPackReservDateCnt = async (memId, startDate, endDate) => {

        return fetch(SERVER_URL + `packreservation/getPackReservDateCnt?memId=${memId}&startDate=${startDate}&endDate=${endDate}`, {
            method: 'GET'
        }).then(res => {
            return res.json();

        }).catch(e => { console.log(e) })
    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return {
        getUser,

        getPackReserv,
        getPackReservCnt,

        getPackReservDate,
        getPackReservDateCnt
    };
}