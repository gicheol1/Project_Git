import { SERVER_URL } from "js";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useBoard() {

    const navigate = useNavigate();

    // 기존 게시판 정보 가져오기
    const getDetail = useCallback(async (target, boardNum) => {

        return fetch(SERVER_URL + `getDetail?target=${target}&boardNum=${boardNum}`, {
            method: 'GET'

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

    // 기존 첨부파일 가져오기
    const getFile = useCallback(async (target, boardNum) => {

        return fetch(SERVER_URL + `getFile?target=${target}&boardNum=${boardNum}`, {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }

            return response.json();

        }).catch((e) => {
            console.log(e);

        })
    }, [])

    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    // 첨푸파일 저장
    const setFile = useCallback(async (target, fileList, bNum) => {

        if (fileList === undefined || fileList.length === 0) { return }

        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append(`files`, file); // 각 이미지 파일을 FormData에 추가
        });

        return fetch(SERVER_URL + `setFile?target=${target}`, {
            method: 'POST',
            body: formData

        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }

            return response.json();

        }).catch((e) => {
            console.log(e);
        })
    }, [])

    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    // 게시판 저장, 수정
    const submitDetail = useCallback(async (target, board, boardNum) => {

        const jwt = sessionStorage.getItem('jwt');

        let path = '';

        if (boardNum === undefined) {
            path = SERVER_URL + `setDetail?target=${target}&jwt=${jwt}&boardNum=${0}`;
        } else {
            path = SERVER_URL + `setDetail?target=${target}&jwt=${jwt}&boardNum=${boardNum}`;
        }

        return fetch(path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(board)

        }).then((response) => {
            if (!response.status === 401) {
                alert('로그인이 필요합니다.');
            } else if (!response.ok) {
                throw new Error(response.status);
            }

            return response.json();

        }).catch((e) => {
            console.log(e);

        })
    }, [])

    // 이미지 DB 등록
    const submitFile = useCallback(async (target, fileList, boardNum) => {

        if (fileList === undefined || fileList.length === 0) {

            navigate(`/boardList/${target}`);
            return;
        }

        fetch(SERVER_URL + `submitFile?target=${target}&boardNum=${boardNum}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fileList)

        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }

            navigate(`/boardList/${target}`);

        }).catch((e) => {
            console.log(e);

        })
    }, [])

    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    // 게시판 삭제
    const deleteBoard = useCallback(async (target, bNum) => {

        if (!window.confirm('정말로 삭제하시겠습니까? 다시 복수할수 없습니다!')) { return; }

        fetch(SERVER_URL + `boardDelete?target=${target}&boardNum=${bNum}`, {
            method: 'DELETE'

        }).then((response) => {
            if (response.status === 404) {
                return undefined;
            } else if (!response.ok) {
                throw new Error(response.status);
            }

            alert("삭제가 완료되었습니다.");
            navigate(`/boardList/${target}`);

        }).catch((e) => {
            console.log(e);
            alert("삭제에 실패하였습니다.");
        })
    }, [])

    // 이미지 첨부 취소
    const deleteFile = useCallback(async (target, file) => {

        return fetch(SERVER_URL + `deleteFile?target=${target}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(file)

        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }

        }).catch((e) => {
            console.log(e);
        })

    }, [])

    return {
        getDetail,
        getFile,

        setFile,

        submitDetail,
        submitFile,

        deleteBoard,
        deleteFile
    }
}