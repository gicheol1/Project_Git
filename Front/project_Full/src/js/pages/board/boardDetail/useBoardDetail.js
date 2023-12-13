import { SERVER_URL } from "constants";
import { useCallback } from "react";

export function useBoardDetail() {

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

    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    // ----- 게시판 댓글 추가-----
    const submitComment = useCallback(async (target, boardNum, comment) => {

        const jwt = sessionStorage.getItem('jwt');

        if (jwt === undefined || jwt === '') {
            return;
        }

        return fetch(SERVER_URL + `submitComm?target=${target}&boardNum=${boardNum}&jwt=${jwt}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)

        }).then((response) => {
            if (response.status === 401) {
                alert('로그인이 필요합니다.');
            }
            if (response.status === 400) {
                alert('저장에 실패했습니다.');
                throw new Error(response.status);
            }

        }).catch((e) => {
            console.log(e);

        })
    }, [])

    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    // ----- 게시판 완전 삭제 -----
    const deleteBoard = useCallback((target, boardNum) => {

        if (!window.confirm('정말로 삭제하시겠습니까? 다시 복구할 수 없습니다!')) { return; }

        const jwt = sessionStorage.getItem('jwt');

        if (jwt === undefined || jwt === '') {
            return;
        }

        // 댓글 삭제
        if (!fetch(SERVER_URL + `deleteAllComm?target=${target}&boardNum=${boardNum}&jwt=${jwt}`, {
            method: 'DELETE'

        }).then((response) => {
            if (response.status === 404) {
                return undefined;
            } else if (response.status === 400) {
                alert('삭제에 실패했습니다.');
                throw new Error(response.status);

            } else if (!response.ok) {
                throw new Error(response.status);

            }

        }).catch((e) => {
            console.log(e);

        })) { alert('삭제에 실패했습니다.'); return; }

        // 파일 삭제
        if (!fetch(SERVER_URL + `deleteAllFile?target=${target}&boardNum=${boardNum}&jwt=${jwt}`, {
            method: 'DELETE'

        }).then((response) => {
            if (response.status === 404) {
                return undefined;
            } else if (response.status === 400) {
                alert('삭제에 실패했습니다.');
                throw new Error(response.status);

            } else if (!response.ok) {
                throw new Error(response.status);

            }

        }).catch((e) => {
            console.log(e);

        })) { alert('삭제에 실패했습니다.'); return; }

        // 게시판 삭제
        fetch(SERVER_URL + `deleteBoard?target=${target}&boardNum=${boardNum}&jwt=${jwt}`, {
            method: 'DELETE'

        }).then((response) => {
            if (response.status === 404) {
                return undefined;
            } else if (response.status === 400) {

                throw new Error(response.status);

            } else if (!response.ok) {
                throw new Error(response.status);

            }

            alert('성공적으로 삭제되었습니다.');
            window.location.href = `/boardList/${target}`;

        }).catch((e) => {
            console.log(e);

        })

    }, []);

    // ----- 댓글만 삭제 -----
    const deleteComment = useCallback((target, boardNum) => {

        if (!window.confirm('정말로 삭제하시겠습니까? 다시 복구할 수 없습니다!')) { return; }

        const jwt = sessionStorage.getItem('jwt');

        if (jwt === undefined || jwt === '') {
            return;
        }

        fetch(SERVER_URL + `deleteComm?target=${target}&boardNum=${boardNum}&jwt=${jwt}`, {
            method: 'DELETE'

        }).then((response) => {
            if (response.status === 404) {
                return undefined;
            } else if (response.status === 400) {
                alert('삭제에 실패했습니다.');
                throw new Error(response.status);

            } else if (!response.ok) {
                throw new Error(response.status);

            }

        }).then(() => {
            alert('성공적으로 삭제되었습니다.');

        }).catch((e) => {
            console.log(e);

        })

    }, [])

    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    // ----- 게시판 소유자 확인(게시판 수정, 삭제 제공) -----
    const isOwnerBoard = useCallback(async (target, boardNum) => {

        const jwt = sessionStorage.getItem('jwt');

        if (jwt === undefined || jwt === '') {
            return;
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

    // ----- 댓글 소유자 확인(게시판 수정, 삭제 제공) -----
    const isOwnerComment = useCallback(async (target, boardNum, coNum) => {

        const jwt = sessionStorage.getItem('jwt');

        if (jwt === undefined || jwt === '') {
            return;
        }

        return fetch(SERVER_URL + `isOwnerComm?target=${target}&boardNum=${boardNum}&coNum=${coNum}&jwt=${jwt}`, {
            method: 'GET'

        }).then((response) => {
            if (response.ok) {
                return response.json();

            }

        }).catch((e) => {
            console.log(e);

        })
    }, [])

    return {
        getDetail,
        getComment,
        getFile,

        deleteBoard,

        isOwnerBoard,
        isOwnerComment
    };
}