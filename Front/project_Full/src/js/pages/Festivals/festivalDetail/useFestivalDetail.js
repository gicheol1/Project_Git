import { SERVER_URL } from "js/component/constants";
import { useCallback } from "react";

export function useFestivalDetail() {

    const getFestivalDetail = useCallback((fNum) => {
        return fetch(SERVER_URL + `festival?fNum=${fNum}`, {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); })
    }, [])

    return { getFestivalDetail };
}