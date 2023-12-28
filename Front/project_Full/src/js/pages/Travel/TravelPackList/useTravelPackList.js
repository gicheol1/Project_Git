import { SERVER_URL } from "js/component/constants";
import { useCallback } from "react"

export function useTravelPackList() {

    const getTravalpack = useCallback(async () => {
        return fetch(SERVER_URL + "getTravalpackAll", {
            method: 'GET'

        }).then(response => { return response.json(); }

        ).catch(err => { console.error(err); return false; });
    }, [])

    const getFestival = useCallback(async () => {
        return fetch(SERVER_URL + "festivalAll", {
            method: 'GET'

        }).then(response => { return response.json(); }

        ).catch(err => { console.error(err); return false; });
    }, [])

    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    const deleteTravalpack = useCallback(async (packNum) => {
        return fetch(SERVER_URL + `deleteTravalpack?packNum=${packNum}`, {
            method: 'DELETE'

        }).then(response => { return response.json(); }

        ).catch(err => { console.error(err); return false; })
    }, [])

    return { getTravalpack, getFestival, deleteTravalpack }
}