import { SERVER_URL } from "js/component/constants";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useFestivals() {

    const navigate = useNavigate();

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 기존 축제 상세 정보
    const getFestival = useCallback(async (festivalNum) => {

        return fetch(SERVER_URL + `getFeatival?festivalNum=${festivalNum}`, {
            method: 'GET'

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); })
    }, [])

    // 기존 첨부파일 이미지 가져오기
    const getFileFeatival = useCallback(async (festivalNum) => {

        return fetch(SERVER_URL + `getFileFeatival?festivalNum=${festivalNum}`, {
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

    // 첨푸파일 인코딩
    const encodeFile = useCallback(async (file) => {

        const formData = new FormData();
        formData.append('file', file);

        return fetch(SERVER_URL + `encodeFileFestival?&orgName=${file.name}`, {
            method: 'POST',
            body: formData

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); })
    }, [])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 축제 추가/수정
    const submitFestival = async (festival) => {

        return fetch(SERVER_URL + `submitFeatival`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(festival)

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            return response.json();

        }).catch((e) => { console.log(e); })
    };

    // 이미지 정보 및 파일 저장
    const submitFileFestival = async (fileList, festivalNum) => {

        if (fileList === undefined || fileList.length === 0) {

            alert('저장되었습니다.');
            navigate(`/festivalList`);
            return;
        }

        fetch(SERVER_URL + `submitFileFeatival?festivalNum=${festivalNum}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fileList)

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

            alert('새 축제를 저장하였습니다.');
            navigate(`/festivalList`);

        }).catch((e) => { console.log(e); })
    };

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 이미지 첨부 취소
    const deleteFileFestival = useCallback(async (file) => {

        return fetch(SERVER_URL + `deleteFileFeatival`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(file)

        }).then((response) => {
            if (!response.ok) { throw new Error(response.status); }

        }).catch((e) => { console.log(e); })

    }, [])

    return {
        getFestival,
        getFileFeatival,

        encodeFile,

        submitFestival,
        submitFileFestival,

        deleteFileFestival
    };
}