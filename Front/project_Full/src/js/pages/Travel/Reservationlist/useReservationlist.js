import { SERVER_URL } from "js/component/constants";
import { useCallback } from "react"

export function useReservationlist() {

    /* 회원이 예약한 패키지 여행 내역 데이터 가져오기 */
    const getUser = useCallback(() => {

        const jwt = sessionStorage.getItem('jwt');

        if (jwt === undefined || jwt === '') { return false; }

        return fetch(SERVER_URL + `getUser?jwt=${jwt}`, {
            method: 'GET'
        }).then(response => {
            return response.json()
        }).catch(err => { console.error(err); return false; });

    }, []);

    /* 회원이 예약한 패키지 여행 내역 데이터 가져오기 */
    const getReservations = useCallback((memId) => {
        return fetch(SERVER_URL + `packreservation/getPackReservationMemId?memId=${memId}`, {
            method: 'GET'
        }).then(response => {
            response.json()
        }).catch(err => { console.error(err); });
    }, []);

    const getFilePack = useCallback(async (packNum) => {
        return fetch(SERVER_URL + `getFileTravalPackRandom?packNum=${packNum}`, {
            method: 'GET'

        }).then((response) => {

            if (!response.ok) { return undefined; }
            return response.json();

        }).catch((e) => { console.log(e); return undefined; });
    }, [])

    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    const cancelReservation = useCallback((resNum) => {
        fetch(SERVER_URL + `packreservation/${resNum}`, {
            method: 'DELETE'
        }).then(response => {
            return response;
        }).catch(err => alert(err))
    }, []);

    return { getUser, getReservations, getFilePack, cancelReservation }
}