import { SERVER_URL } from "js";
import { useCallback } from "react";

export function useSingUp() {

    // ----- 회원 가입 -----
    const singUp = useCallback(async (newUser) => {
        return fetch(SERVER_URL + 'singUp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)

        }).then((res) => {
            if (!res.ok) { return false; }

            return true;

        }).catch((e) => { alert(e); return false; })
    }, []);

    return { singUp }
}