import { SERVER_URL } from "js/component/constants";

export function useHome() {

    const getPackNumber = () => {
        return fetch(SERVER_URL + 'getTravalpackAllNumber', {
            method: 'GET'

        }).then((response) => {

            if (!response.ok) { return []; }
            return response.json();

        }).catch((e) => { console.log(e) });
    }

    const getFilePack = (packNum) => {
        return fetch(SERVER_URL + `getFileTravalPackRandom?packNum=${packNum}`, {
            method: 'GET'

        }).then((response) => {

            if (!response.ok) { return undefined; }
            return response.json();

        }).catch((e) => { console.log(e); return undefined; });
    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    const getFestivalNumber = () => {
        return fetch(SERVER_URL + 'festivalAllNumber', {
            method: 'GET'

        }).then((response) => {

            if (!response.ok) { return []; }
            return response.json();

        }).catch((e) => { console.log(e) });
    }

    const getFileFestival = (festivalNum) => {
        return fetch(SERVER_URL + `getFileFestivalRandom?festivalNum=${festivalNum}`, {
            method: 'GET'

        }).then((response) => {

            if (!response.ok) { return undefined; }
            return response.json();

        }).catch((e) => { console.log(e); return undefined; });
    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return { getPackNumber, getFilePack, getFestivalNumber, getFileFestival }
}