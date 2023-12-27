import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Button } from '@mui/material';
import DatePicker from 'react-datepicker';

import { useTravalPackAdd } from './useTravalPackAdd';

import 'react-datepicker/dist/react-datepicker.css';
import './TravalPackAdd.css';


const TravalPackAdd = () => {

    // 패키지 여행 번호(수정시)
    const { packNum } = useParams();

    // 패키지 여행 정보
    const [packInfo, setPackInfo] = useState({
        name: '',
        address: '',
        count: '',
        startDate: '',
        endDate: '',
        person: '',
        price: '',
        smoke: '',
        text: '',
        reservation: 'YES',
    });

    // 저장된 이미지
    const [imgList, setImgList] = useState([]);

    // 버튼 비활성화 여부
    const [btnDisable, setBtnDisable] = useState(false);

    // 다음 주소 검색 창
    const open = useDaumPostcodePopup();

    const { encodeFile, submitTravalPack, submitFile, deleteFile } = useTravalPackAdd();

    const inputRef = useRef(null);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    useEffect(() => {

    }, [packNum])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // '추가'버튼을 누를 시
    const handleSubmit = async () => {

        // 축제 정보 먼저 저장
        submitTravalPack(packInfo).then((res) => {
            if (res === undefined) { alert('저장에 실패했습니다.'); return; }

            submitFile(submitFile).then(result => {
                if (result) {
                    alert('저장이 완료되었습니다.');
                } else {
                    alert('저장에 실패했습니다.'); return;
                }
            })
        })
    };

    // '숙소위치 찾기' 버튼 클릭시
    const handlePopup = () => { open({ onComplete: handleComplete }); }

    // Daum 주소 창에서 주소를 클릭했을때
    const handleComplete = (data) => { setPackInfo({ ...packInfo, address: data.roadAddress }); }

    // 파일 추가 버튼을 누를시
    const handleButton = () => { inputRef.current.click(); };

    // 파일 추가 및 저장
    const handleFileChange = async (e) => {

        const selectedFiles = e.target.files;
        const imageFiles = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const fileType = file.type.toLowerCase();

            // 이미지 파일인지 확인 (이미지 파일 확장자: 'image/jpeg', 'image/png', 'image/gif', 등)
            if (
                fileType === 'image/jpg' ||
                fileType === 'image/jpeg' ||
                fileType === 'image/png' ||
                fileType === 'image/gif'
            ) { imageFiles.push(file); }
        }

        // 비동기 처리를 위한 내부 함수
        const encodeImageFiles = async () => {
            for (const imgFile of imageFiles) {
                const res = await encodeFile(imgFile);
                setImgList(prevList => [...prevList, res]);
            }
        };

        setBtnDisable(true);
        encodeImageFiles();
        setBtnDisable(false);
    };

    // 선택한 파일 제거 함수
    const handleCancel = async (indexTarget) => {

        const deleteOneFile = async () => {
            deleteFile(packNum, imgList.find((images, index) => index !== indexTarget)).then(() => {
                setImgList(imgList.filter((images, index) => index !== indexTarget));
            });
        }

        setBtnDisable(true);
        deleteOneFile();
        setBtnDisable(false);
    }

    // ===== (테스트용) 데이터 확인 =====
    const showData = () => { console.log(packInfo); }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return (
        <div>

            <div className="ImgBox">
                <Button onClick={handleButton}>파일 추가</Button>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}

                    // 해당 태그를 참조하는 변수 설정
                    ref={inputRef}
                />

                {/* 첨부한 파일들을 표시 */}
                {imgList !== undefined && (
                    imgList.map((image, index) => (
                        <div>
                            <img
                                key={`image ${index}`}
                                alt={`image ${image.orgName}`}
                                src={`data:image/png;base64,${image.imgFile}`}
                                style={{ width: '150px', height: '150px' }}
                            />
                            <Button
                                key={index}
                                onClick={() => handleCancel(index)}
                            >
                                취소
                            </Button>
                        </div>
                    ))
                )}
            </div>

            <div>
                <input
                    maxLength='20'
                    placeholder='패키지명'
                    onChange={(e) => { setPackInfo({ ...packInfo, name: e.target.value }); }}
                />
                <br></br>
                <input
                    maxLength='20'
                    placeholder='패키지 설명'
                    onChange={(e) => { setPackInfo({ ...packInfo, text: e.target.value }); }}
                />
            </div>

            <div>
                <DatePicker
                    type='date'
                    value={packInfo.startDate}
                    maxDate={packInfo.endDate !== undefined ? new Date(packInfo.endDate) : ''}
                    onChange={(date) => { setPackInfo({ ...packInfo, startDate: date.toISOString().split('T')[0] }) }}

                    style={{ width: '30px' }}
                />
                ~
                <DatePicker
                    type='date'
                    value={packInfo.endDate}
                    minDate={new Date(packInfo.startDate)}
                    onChange={(date) => { setPackInfo({ ...packInfo, endDate: date.toISOString().split('T')[0] }) }}
                    disabled={packInfo.startDate === '' ? true : false}

                    style={{ width: '30px' }}
                />
            </div>

            <p>성인:</p>
            <select value={packInfo.person} onChange={(e) => { setPackInfo({ ...packInfo, person: e.target.value }); }}>
                <option className="perSelectBox1" key="person1" value="0">0</option>
                <option className="perSelectBox2" key="person2" value="1">1</option>
                <option className="perSelectBox3" key="person3" value="2">2</option>
            </select>

            <p>흡연실</p>
            <select value={packInfo.smoke} onChange={(e) => { setPackInfo({ ...packInfo, smoke: e.target.value }); }}>
                <option name="select" className="selectBox4" key="smoke" value="흡연실">O</option>
                <option name="select" className="selectBox4" key="smoke1" value="금연실">X</option>
            </select>

            <br></br>

            <p>방 갯수</p>
            <select value={packInfo.count} onChange={(e) => { setPackInfo({ ...packInfo, count: e.target.value }); }}>
                <option className="selectBox5" key="count1" value="0">0</option>
                <option className="selectBox5" key="count2" value="1">1</option>
                <option className="selectBox5" key="count3" value="2">2</option>
            </select>

            <input
                maxLength='20'
                placeholder='가격'
                onChange={(e) => { setPackInfo({ ...packInfo, price: e.target.value }); }}
            />

            <div>
                <button type='button' onClick={handlePopup}>숙소위치 검색</button>
                <input value={packInfo.address} readOnly={true} />
            </div>

            <button className="Search" onClick={handleSubmit} disabled={btnDisable}>추가</button>

            <button onClick={showData}>데이터 확인</button>

        </div>


    );

}
export default TravalPackAdd;