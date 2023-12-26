import { SERVER_URL } from "js/component/constants";
import { useCallback } from "react";

export function useUserList() {

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 페이지별 관리자를 제외한 회원 정보 불러오기
    const getUserListPage = useCallback(async (page) => {

        return fetch(SERVER_URL + `getUserListPage?page=${page}`, {
            method: 'GET'

        }).then((res) => {
            return res.json();

        }).catch((e) => { console.log(e); })
    }, []);

    // 관리자를 제외한 회원의 수 가져오기
    const getUserListCnt = useCallback(async () => {

        return fetch(SERVER_URL + `getUserListCnt`, {
            method: 'GET'

        }).then((res) => {
            return res.json();

        }).catch((e) => { console.log(e); })
    }, []);

    // 해당 회원 삭제
    const deleteUser = useCallback(async (memId) => {

        const jwt = sessionStorage.getItem('jwt');

        return fetch(SERVER_URL + `deleteUser?memId=${memId}&jwt=${jwt}`, {
            method: 'DELETE'

        }).then((res) => {
            if (!res.ok) { throw new Error(res.status) }

            return res.json();

        }).catch((e) => {
            console.log(e);
            return false;
        })

    }, []);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return { getUserListPage, getUserListCnt, deleteUser };
}