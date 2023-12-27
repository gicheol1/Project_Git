import { SERVER_URL } from "js/component/constants";
import { useCallback } from "react";

export function useServicedown() {

    // 차단 상세 정보 가져오기
    const getBlackDetail = useCallback(async (blackNum) => {

        const jwt = sessionStorage.getItem('jwt');

        return fetch(SERVER_URL + `getBlackDetail?blackNum=${blackNum}&jwt=${jwt}`, {
            method: 'GET'

        }).then((res) => {
            return res.json();

        }).catch((e) => { console.log(e); return false; })
    }, []);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 차단 정보 수정
    const updateBlack = useCallback(async (newBlack) => {

        return fetch(SERVER_URL + `addBlackList`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBlack)

        }).then((res) => {
            return res.json();

        }).catch((e) => { console.log(e); return false; })
    }, []);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 차단 해제
    const deleteBlack = useCallback(async (blackNum) => {

        const jwt = sessionStorage.getItem('jwt');

        return fetch(SERVER_URL + `deleteBlackList?memId=${blackNum}&jwt=${jwt}`, {
            method: 'DELETE'

        }).then((res) => {
            if (!res.ok) { throw new Error(res.status) }

            return res.json();

        }).catch((e) => { console.log(e); return false; })

    }, []);

    return { getBlackDetail, updateBlack, deleteBlack };
}