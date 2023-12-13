import { useCallback } from "react";
import { SERVER_URL } from 'js';

export function useLogin() {

    // ----- 로그인 -----
    const login = useCallback((credentials) => {

        return fetch(`${SERVER_URL}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)

        }).then((res) => { // 전송 후
            if (res.status === 404) {
                return false;

            } else if (!res.ok) {
                throw new Error(res.status);
            }

            const jwtToken = res.headers.get('Authorization');

            if (jwtToken !== '' || jwtToken !== undefined) {
                sessionStorage.setItem('jwt', jwtToken);
                return true;

            } else {
                throw new Error('로그인에 실패했습니다.');

            }

        }).catch((err) => {
            console.error(err);

        });
    }, []);

    return { login };
}