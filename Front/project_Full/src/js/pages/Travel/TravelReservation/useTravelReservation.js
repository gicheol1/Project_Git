import { SERVER_URL } from "js/component/constants";
import { useCallback } from "react";

export function useTravelReservation() {

    /* 회원이 예약한 패키지 여행 내역 데이터 가져오기 */
    const getTravalpack = useCallback((packNum) => {
        return fetch(SERVER_URL + `getTravalpack?packNum=${packNum}`, {
            method: 'GET'
        }).then(response => {
            return response.json()
        }).catch(err => { console.error(err); return undefined; });
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

    return { getTravalpack, getFilePack };
}