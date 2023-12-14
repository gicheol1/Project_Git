import { SERVER_URL } from "js";
import { useCallback } from "react";

export function useBoardList() {

    // ----- 페이지별 게시판 정보 -----
    const getBoardList = useCallback(async (target, page) => {

        return fetch(SERVER_URL + `boardPage?target=${target}&page=${page}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }

        }).then((response) => {
            if (response.status === 404) {
                return undefined;
            } else if (!response.ok) {
                throw new Error(response.status);
            }

            return response.json();

        }).catch((e) => {
            console.log(e);

        })
    }, [])

    // ----- 게시판 총 갯수 -----
    const getBoardCnt = useCallback(async (target) => {

        return fetch(SERVER_URL + `boardCnt?target=${target}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }

        }).then((response) => {
            if (response.ok) {
                return response.json();
            }

        }).then((data) => {
            return data;

        }).catch((e) => {
            console.log(e);

        })
    }, [])

    // ----- 게시판 소유자 확인(비공개 게시판을 공개) -----
    const isOwnerBoard = useCallback(async (target, boardNum) => {

        const jwt = sessionStorage.getItem('jwt');

        if (jwt !== undefined || jwt === '') {
            return false;
        }

        return fetch(SERVER_URL + `isOwner?target=${target}&boardNum=${boardNum}&jwt=${jwt}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }

        }).then((response) => {
            if (response.ok) {
                return response.json();

            }

        }).catch((e) => {
            console.log(e);

        })
    }, [])

    return { getBoardList, getBoardCnt, isOwnerBoard };
}