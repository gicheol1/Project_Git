import { useCallback } from "react";
import { SERVER_URL } from 'js';

export function useLogin() {

    // ----- 로그인 -----
    const login = useCallback(async (credentials) => {

        return await fetch(`${SERVER_URL}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)

        }).then((res) => {

            // 차단된 사용자인 경우(403)
            if (!res.ok) { return res.status; }

            // 해더에서 토큰 받기
            const jwtToken = res.headers.get('Authorization');

            if (jwtToken !== undefined || jwtToken !== '') {
                sessionStorage.setItem('jwt', jwtToken);
                return res.json();

            } else { return false; }

        }).catch((e) => { console.log(e); return false; });
    }, []);

    return { login };
}