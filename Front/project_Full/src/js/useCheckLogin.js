import { SERVER_URL } from "js";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useCheckLogin() {

    const navigate = useNavigate();

    // ========== ========== ========== ========== ========== ========== ========== ========== ==========
    // ========== ========== ========== ========== ========== ========== ========== ========== ==========
    // ========== ========== ========== ========== ========== ========== ========== ========== ==========

    // 로그인 상태인지 검사
    const checkIsLogin = useCallback(async () => {

        const jwt = sessionStorage.getItem('jwt');

        // 토큰이 없는 경우
        if (jwt === undefined || jwt === null) { sessionStorage.removeItem('jwt'); return false; }

        return await fetch(SERVER_URL + `checkIsLogin?jwt=${jwt}`, {
            method: 'GET'

        }).then((res) => {

            if (!res.ok) { return false; }

            // 해더에서 토큰 받아오기
            const jwtToken = res.headers.get('Authorization');

            if (jwtToken !== undefined && jwtToken !== '') {

                // 새 토큰 저장
                sessionStorage.setItem('jwt', jwtToken);
                return true;

            } else { return false; }

        }).catch((e) => {
            console.log(e);
            sessionStorage.removeItem('jwt');
            return false;
        })

    }, []);

    // ========== ========== ========== ========== ========== ========== ========== ========== ==========
    // ========== ========== ========== ========== ========== ========== ========== ========== ==========
    // ========== ========== ========== ========== ========== ========== ========== ========== ==========

    // 관리자 상태인지 검사
    const checkIsAdmin = useCallback(async () => {

        const jwt = sessionStorage.getItem('jwt');

        // 토큰이 비어있는 경우
        if (jwt === undefined || jwt === '') { return false; }

        return fetch(SERVER_URL + `isAdmin?jwt=${jwt}`, {
            method: 'GET'

        }).then((res) => {
            if (!res.ok) { return false; }

            return res.json();

        }).catch((e) => { console.log(e); return false; })

    }, []);

    // ========== ========== ========== ========== ========== ========== ========== ========== ==========
    // ========== ========== ========== ========== ========== ========== ========== ========== ==========
    // ========== ========== ========== ========== ========== ========== ========== ========== ==========

    // 로그인 페이지로 이동
    const toLogin = useCallback(async () => {
        alert('로그인이 필요합니다.');
        navigate('/login');
    }, []);

    return { checkIsLogin, checkIsAdmin, toLogin };
}