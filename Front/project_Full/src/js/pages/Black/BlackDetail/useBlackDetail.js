import { SERVER_URL } from "js/component/constants";
import { useCallback } from "react";

export function useBlackDetail() {

    // 회원 상세 정보 가져오기
    const getBlackDetail = useCallback(async (blackId) => {

        const jwt = sessionStorage.getItem('jwt');

        return fetch(SERVER_URL + `getBlackListDetail?blackId=${blackId}&jwt=${jwt}`, {
            method: 'GET'

        }).then((res) => {
            return res.json();

        }).catch((e) => { console.log(e); return false; })
    }, []);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 회원 정보 수정
    const updateBlack = useCallback(async (newBlack) => {

        return fetch(SERVER_URL + `updateUser`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBlack)

        }).then((res) => {
            return res.json();

        }).catch((e) => { console.log(e); return false; })
    }, []);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 회원 삭제
    const deleteBlack = useCallback(async (blackNum) => {

        const jwt = sessionStorage.getItem('jwt');

        return fetch(SERVER_URL + `deleteUser?memId=${blackNum}&jwt=${jwt}`, {
            method: 'DELETE'

        }).then((res) => {
            if (!res.ok) { throw new Error(res.status) }

            return res.json();

        }).catch((e) => { console.log(e); return false; })

    }, []);

    return { getBlackDetail, updateBlack, deleteBlack };
}