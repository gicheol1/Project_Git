import { SERVER_URL } from "js";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useBoardDetail() {

    const navigate = useNavigate();

    // ----- 게시판 상세 정보 -----
    const getDetail = useCallback((target, boardNum) => {

        return fetch(SERVER_URL + `getDetail?target=${target}&boardNum=${boardNum}`, {
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
    }, []);

    // ----- 이미지 -----
    const getFile = useCallback((target, boardNum) => {

        return fetch(SERVER_URL + `getFile?target=${target}&boardNum=${boardNum}`, {
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
    }, []);

    // ----- 댓글 -----
    const getComment = useCallback((target, boardNum) => {

        return fetch(SERVER_URL + `getComm?target=${target}&boardNum=${boardNum}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); return undefined; })
    }, []);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // ----- 게시판 댓글 추가-----
    const submitComment = useCallback(async (target, boardNum, newComment) => {

        const jwt = sessionStorage.getItem('jwt');
        if (jwt === undefined || jwt === '') { return; }

        fetch(SERVER_URL + `submitComm?target=${target}&boardNum=${boardNum}&jwt=${jwt}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment)

        }).then((response) => {
            if (response.status === 401) {
                alert('로그인이 필요합니다.');
            }
            if (!response.ok) {
                throw new Error(response.status);
            }

            alert('댓글을 추가했습니다.');
            navigate(`/boardDetail/${target}/${boardNum}`);

        }).catch((e) => {
            console.log(e);
            alert('저장에 실패했습니다.');
            navigate(`/boardDetail/${target}/${boardNum}`);

        })
    }, [])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // ----- 게시판 삭제 -----
    const deleteBoard = useCallback(async (target, bNum) => {

        fetch(SERVER_URL + `boardDelete?target=${target}&boardNum=${bNum}`, {
            method: 'DELETE'

        }).then((res) => {
            if (!res.ok) { throw new Error(res.status); }

            return res.json();

        }).catch((e) => { console.log(e); return false; })

    }, [])

    // ----- 모든 이미지 파일 제거 -----
    const deleteAllFile = useCallback(async (target, bNum) => {

        const jwt = sessionStorage.getItem('jwt');

        fetch(SERVER_URL + `deleteAllFile?target=${target}&boardNum=${bNum}&jwt=${jwt}`, {
            method: 'DELETE'

        }).then((res) => {
            if (!res.ok) { throw new Error(res.status); }
            return res.json();

        }).catch((e) => { console.log(e); return false; })

    }, []);

    // ========== ========== ========== ========== ========== ========== ========== ========== ==========
    // ========== ========== ========== ========== ========== ========== ========== ========== ==========
    // ========== ========== ========== ========== ========== ========== ========== ========== ==========

    // ----- 댓글만 삭제 -----
    const deleteComment = useCallback((target, boardNum, coNum) => {

        if (!window.confirm('정말로 삭제하시겠습니까? 다시 복구할 수 없습니다!')) { return; }

        const jwt = sessionStorage.getItem('jwt');
        if (jwt === undefined || jwt === '') { return; }

        fetch(SERVER_URL + `deleteComm?target=${target}&boardNum=${boardNum}&coNum=${coNum}&jwt=${jwt}`, {
            method: 'DELETE'

        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }

            alert('성공적으로 삭제되었습니다.');

        }).catch((e) => {
            console.log(e);
            alert('삭제에 실패했습니다.');

        })

    }, [])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // ----- 게시판 소유자 확인(게시판 수정, 삭제 제공) -----
    const isOwnerBoard = useCallback(async (target, boardNum) => {

        const jwt = sessionStorage.getItem('jwt');
        if (jwt === null || jwt === '') { return false; }

        return fetch(SERVER_URL + `isOwner?target=${target}&boardNum=${boardNum}&jwt=${jwt}`, {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status) }
            return response.json();

        }).catch((e) => {
            console.log(e);
            return false;

        })
    }, [])

    // ----- 댓글 소유자 확인(게시판 수정, 삭제 제공) -----
    const isOwnerComment = useCallback(async (target, boardNum, coNum) => {

        const jwt = sessionStorage.getItem('jwt');
        if (jwt === null || jwt === '') { return false; }

        return fetch(SERVER_URL + `isOwnerComm?target=${target}&boardNum=${boardNum}&coNum=${coNum}&jwt=${jwt}`, {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status) }
            return response.json();

        }).catch((e) => { console.log(e); return false; })
    }, [])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return {
        getDetail,
        getComment,
        getFile,

        submitComment,

        deleteBoard,
        deleteAllFile,
        deleteComment,

        isOwnerBoard,
        isOwnerComment
    };
}