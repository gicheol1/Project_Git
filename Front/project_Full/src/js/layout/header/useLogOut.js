import { SERVER_URL } from "js";
import { useCallback } from "react";

export function useLogOut() {

    const logOut = useCallback(() => {

        const jwt = sessionStorage.getItem('jwt');

        return fetch(`${SERVER_URL}logOut?jwt=${jwt}`, {
            method: 'POST'

        }).then((res) => {
            if (!res.ok) {
                throw new Error(res.status);
            }

            sessionStorage.removeItem('jwt');
            return false;

        }).catch((err) => {
            console.log(err);
            return false;

        });

    }, []);

    return { logOut };
}