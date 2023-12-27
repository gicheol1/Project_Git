import { SERVER_URL } from "js";
import { useCallback } from "react";

export function useTravalPackAdd() {

    // 기존 첨부파일 가져오기
    const getFile = useCallback(async (packNum) => {

        return fetch(SERVER_URL + `getFileTravalPack?packNum=${packNum}`, {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); })
    }, [])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 첨푸파일 인코딩
    const encodeFile = useCallback(async (file) => {

        const formData = new FormData();
        formData.append('file', file);

        return fetch(SERVER_URL + `encodeFileTravalPack?orgName=${file.name}`, {
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

    // 패키지 등록
    const submitTravalPack = useCallback(async (travalInfo) => {

        fetch(SERVER_URL + `travalpack/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(travalInfo)

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }
            return response.json();

        }).catch((e) => { console.log(e); return undefined; })
    }, [])

    // 이미지 정보 등록 및 파일 저장 
    const submitFile = useCallback(async (fileList, festivalNum) => {

        if (fileList === undefined || fileList.length === 0) {
            return;
        }

        fetch(SERVER_URL + `submitFileFeatival?festivalNum=${festivalNum}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fileList)

        }).then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return true;

        }).catch((e) => {
            console.log(e);
            return false;
        })
    }, [])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // ----- 특정 이미지 정보와 파일 제거 -----
    const deleteFile = useCallback(async (packNum, fileDto) => {

        if (!window.confirm('이미지를 삭제하시겠습니까?')) { return; }

        const jwt = sessionStorage.getItem('jwt');

        fetch(SERVER_URL + `deleteFileTravalPack?packNum=${packNum === undefined ? 0 : packNum}&jwt=${jwt}`, {
            method: 'DELETE',
            body: JSON.stringify(fileDto)

        }).then((res) => {
            if (!res.json()) { throw new Error(res.status); }
            alert('이미지가 삭제되었습니다.');

        }).catch((e) => { console.log(e); })

    }, []);

    return {

        getFile,

        encodeFile,

        submitTravalPack,
        submitFile,

        deleteFile
    }
}