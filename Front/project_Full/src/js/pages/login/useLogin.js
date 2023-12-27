import { useCallback } from "react";
import { SERVER_URL } from 'js';

export function useLogin() {

    // ----- 로그인 -----
    const login = useCallback(async (credentials) => {

        return await fetch(`${SERVER_URL}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)

        }).then((res) => { // 전송 후
            if (!res.ok) { return res.status; }

            const jwtToken = res.headers.get('Authorization');

            if (jwtToken !== undefined || jwtToken !== '') {
                sessionStorage.setItem('jwt', jwtToken);
                return res.json();

            } else { throw new Error('로그인에 실패했습니다.'); }

        }).catch((e) => {
            console.log(e);
        });
    }, []);

    return { login };
}