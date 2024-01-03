import { SERVER_URL } from "js/component/constants";
import { useCallback } from "react";

export function useFestivalDetail() {

    // 축제 상세 정보
    const getFestivalDetail = useCallback(async (festivalNum) => {
        return fetch(SERVER_URL + `getFestival?festivalNum=${festivalNum}`, {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); })
    }, [])

    // 축제 이미지 가져오기
    const getFileFestival = useCallback(async (festivalNum) => {
        return fetch(SERVER_URL + `getFileFestival?festivalNum=${festivalNum}`, {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); return undefined; })
    }, [])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 축제 정보 삭제
    const deleteFestival = useCallback(async (festivalNum) => {

        // 축제 정보 삭제
        fetch(SERVER_URL + `deleteFestival?festivalNum=${festivalNum}`, {
            method: 'DELETE'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

        }).catch((e) => { console.log(e); return false; })
    }, [])

    // 축제 이미지 삭제
    const deleteFileFestival = useCallback(async (festivalNum) => {

        // 이미지 삭제
        fetch(SERVER_URL + `deleteAllFileFestival?festivalNum=${festivalNum}`, {
            method: 'DELETE'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

        }).catch((e) => { console.log(e); })
    }, [])

    return {
        getFestivalDetail,
        getFileFestival,

        deleteFestival,
        deleteFileFestival
    };
}