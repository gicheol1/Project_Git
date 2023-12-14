import { SERVER_URL } from "js";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useCheckLogin() {

    const navigate = useNavigate();

    // 로그인 상태인지 검사
    const checkIsLogin = useCallback(async () => {

        const jwt = sessionStorage.getItem('jwt');

        // 토큰이 비어있는 경우
        if (jwt === undefined || jwt === '') {
            return false;
        }

        return fetch(SERVER_URL + `checkIsLogin?jwt=${jwt}`, {
            method: 'GET'

        }).then((res) => {

            // 토큰이 올바르지 않거나 만료 등
            if (res.status === 401) {
                sessionStorage.removeItem('jwt');
                return false;
            }

            if (res.ok) {
                const jwtToken = res.headers.get('Authorization');

                // 정상
                if (jwtToken !== undefined || jwtToken !== '') {
                    sessionStorage.setItem('jwt', jwtToken);
                    return true;

                } else { // 비정상
                    return false;

                }
            }

            return false;

        }).catch((e) => {
            return false;

        })

    }, []);

    // 로그인 페이지로 이동
    const toLogin = useCallback(async () => {
        alert('로그인이 필요합니다.');
        navigate('/login');

    }, []);

    return { checkIsLogin, toLogin };
}