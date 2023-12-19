import { SERVER_URL } from "js/component/constants";
import { useCallback } from "react";

export function useFestivalList() {

    // ----- 페이지별 축제 정보 -----
    const getFestivalList = useCallback(async (page) => {

        return fetch(SERVER_URL + `festivalPage?page=${page}`, {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); })
    }, [])

    // ----- 등록된 축제 총 갯수 -----
    const getFestivalCnt = useCallback(async (target) => {

        return fetch(SERVER_URL + `festivalCnt`, {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); })
    }, [])

    return { getFestivalList, getFestivalCnt };
}