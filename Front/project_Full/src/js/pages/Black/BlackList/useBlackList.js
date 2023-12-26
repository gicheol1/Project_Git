import { SERVER_URL } from "js/component/constants";
import { useCallback } from "react";

export function useBlackList() {

    // 페이지별 관리자를 제외한 회원 정보 불러오기
    const getBlackListPage = useCallback(async (page) => {

        return fetch(SERVER_URL + `getBlackListPage?page=${page}`, {
            method: 'GET'

        }).then((res) => {
            return res.json();

        }).catch((e) => { console.log(e); })
    }, []);

    // 관리자를 제외한 회원의 수 가져오기
    const getBlackListCnt = useCallback(async () => {

        return fetch(SERVER_URL + `getBlackListCnt`, {
            method: 'GET'

        }).then((res) => {
            return res.json();

        }).catch((e) => { console.log(e); return 1; })
    }, []);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 차단 해제
    const deleteBlackList = useCallback(async (blackNum) => {

        const jwt = sessionStorage.getItem('jwt');

        return fetch(SERVER_URL + `deleteBlackList?blackNum=${blackNum}&jwt=${jwt}`, {
            method: 'DELETE'

        }).then((res) => {
            if (!res.ok) { throw new Error(res.status) }

            return res.json();

        }).catch((e) => { console.log(e); return false; })

    }, []);

    return { getBlackListPage, getBlackListCnt, deleteBlackList };
}