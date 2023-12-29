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

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 첨푸파일 인코딩
    const encodeFile = useCallback(async (target, file) => {

        const formData = new FormData();
        formData.append('file', file);

        return fetch(SERVER_URL + `encodeFile?target=${target}&orgName=${file.name}`, {
            method: 'POST',
            body: formData

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); })
    }, [])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 게시판 저장, 수정
    const submitDetail = useCallback(async (target, board, boardNum) => {

        const jwt = sessionStorage.getItem('jwt');

        let path = '';

        if (boardNum === undefined) {
            path = SERVER_URL + `submitDetail?target=${target}&jwt=${jwt}&boardNum=${0}`;
        } else {
            path = SERVER_URL + `submitDetail?target=${target}&jwt=${jwt}&boardNum=${boardNum}`;
        }

        return fetch(path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(board)

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); })
    }, [])

    // 이미지 정보 등록 및 파일 저장 
    const submitFile = useCallback(async (target, fileList, boardNum) => {

        if (fileList === undefined || fileList.length === 0) {

            alert('저장되었습니다.');
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

            alert('저장되었습니다.');
            navigate(`/boardList/${target}`);

        }).catch((e) => {
            console.log(e);

        })
    }, [])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 게시판 삭제
    const deleteBoard = useCallback(async (target, bNum) => {

        // ----- 저장된 게시판 정보 제거 -----
        fetch(SERVER_URL + `boardDelete?target=${target}&boardNum=${bNum}`, {
            method: 'DELETE'

        }).then((res) => {
            if (!res.ok) { throw new Error(res.status); }

            return res.json();

        }).catch((e) => { console.log(e); return false; })

    }, [])

    // ----- 특정 이미지 정보와 파일 제거 -----
    const deleteFile = useCallback(async (target, bNum, fileDto) => {

        if (!window.confirm('이미지를 삭제하시겠습니까?')) { return; }

        const jwt = sessionStorage.getItem('jwt');

        fetch(SERVER_URL + `deleteFile?target=${target}&boardNum=${bNum}&jwt=${jwt}`, {
            method: 'DELETE',
            body: JSON.stringify(fileDto)

        }).then((res) => {
            if (!res.ok) { throw new Error(res.status); }
            alert('이미지가 삭제되었습니다.');

        }).catch((e) => { console.log(e); })

    }, []);

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

    return {
        getDetail,
        getFile,

        encodeFile,

        submitDetail,
        submitFile,

        deleteBoard,
        deleteFile,
        deleteAllFile
    }
}