import { SERVER_URL } from "js/component/constants";
import { useCallback } from "react";

export function useFestivalDetail() {

    // 축제 상세 정보
    const getFestivalDetail = useCallback(async (festivalNum) => {
        return fetch(SERVER_URL + `getFeatival?festivalNum=${festivalNum}`, {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); })
    }, [])

    // 축제 이미지 가져오기
    const getFileFeatival = useCallback(async (festivalNum) => {
        return fetch(SERVER_URL + `getFileFeatival?festivalNum=${festivalNum}`, {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); })
    }, [])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 축제 삭제
    const deleteFestival = useCallback(async (festivalNum) => {

        if (!window.confirm('정말로 삭제하시겠습니까? 다시 복구할 수 없습니다!')) { return; }

        // 이미지 삭제
        fetch(SERVER_URL + `deleteAllFileFeatival?festivalNum=${festivalNum}`, {
            method: 'DELETE'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

        }).catch((e) => { console.log(e); })

        // 축제 정보 삭제
        fetch(SERVER_URL + `deleteFeatival?festivalNum=${festivalNum}`, {
            method: 'DELETE'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }
            alert('성공적으로 삭제되었습니다.');

        }).catch((e) => { console.log(e); alert('삭제에 실패했습니다'); })
    }, [])

    return {
        getFestivalDetail,
        getFileFeatival,

        deleteFestival
    };
}