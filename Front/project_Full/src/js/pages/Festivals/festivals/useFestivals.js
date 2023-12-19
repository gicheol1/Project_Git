import { SERVER_URL } from "js/component/constants";
import { useCallback } from "react";

export function useFestivals() {

    // 축제 상세 정보
    const getFestival = useCallback(async (festivalNum) => {

        return fetch(SERVER_URL + `getFeatival?festivalNum=${festivalNum}`, {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); })
    }, [])

    return { getFestival };
}