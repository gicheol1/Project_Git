import { SERVER_URL } from "js/component/constants";
import { useCallback } from "react";

export function useFestivalDetail() {

    // 축제 상세 정보
    const getFestivalDetail = useCallback((festivalNum) => {
        return fetch(SERVER_URL + `getFeatival?festivalNum=${festivalNum}`, {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); })
    }, [])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 축제 상세 정보
    const deleteFestival = useCallback((festivalNum) => {

        if (!window.confirm('정말로 삭제하시겠습니까? 다시 복구할 수 없습니다!')) { return; }

        return fetch(SERVER_URL + `festival?festivalNum=${festivalNum}`, {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); })
    }, [])

    return { getFestivalDetail, deleteFestival };
}