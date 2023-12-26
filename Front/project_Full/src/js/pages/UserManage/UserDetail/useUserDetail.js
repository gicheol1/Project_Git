import { SERVER_URL } from "js/component/constants";
import { useCallback } from "react";

export function useUserDetail() {

    // 회원 상세 정보 가져오기
    const getUserDetail = useCallback(async (memId) => {

        const jwt = sessionStorage.getItem('jwt');

        return fetch(SERVER_URL + `getUserDetail?memId=${memId}&jwt=${jwt}`, {
            method: 'GET'

        }).then((res) => {
            return res.json();

        }).catch((e) => { console.log(e); return false; })
    }, []);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 회원 정보 수정
    const updateUser = useCallback(async (newUser) => {

        return fetch(SERVER_URL + `updateUser`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)

        }).then((res) => {
            return res.json();

        }).catch((e) => { console.log(e); return false; })
    }, []);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 회원 삭제
    const deleteUser = useCallback(async (memId) => {

        const jwt = sessionStorage.getItem('jwt');

        return fetch(SERVER_URL + `deleteUser?memId=${memId}&jwt=${jwt}`, {
            method: 'DELETE'

        }).then((res) => {
            if (!res.ok) { throw new Error(res.status) }

            return res.json();

        }).catch((e) => { console.log(e); return false; })

    }, []);

    return { getUserDetail, updateUser, deleteUser };
}