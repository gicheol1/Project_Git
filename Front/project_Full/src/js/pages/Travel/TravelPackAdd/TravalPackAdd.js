import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import { SERVER_URL } from 'js';
import { useTravalPackAdd } from './useTravalPackAdd';
import { useNavigate } from "react-router-dom";

import 'react-datepicker/dist/react-datepicker.css';
import './TravalPackAdd.css';


const TravalPackAdd = () => {

    // 패키지 여행 번호(수정시)
    const { packNum } = useParams();
    const [addr,setAddr] = useState([]);
    const per=([]);
    const navigate = useNavigate(); // 페이지 이동을 위한 함수   

    for(let i=0; i<31; i++){
        per[i]=i;
    }


    // 패키지 여행 정보
    const [packInfo, setPackInfo] = useState({
        name: '',
        address: '',
        count: '0',
        startDate: '',
        endDate: '',
        person: '0',
        price: '',
        smoke: 'O',
        text: '',
        festivalname: '선택안함',
        reservation: 'YES',
    });

    // 저장된 이미지
    const [imgList, setImgList] = useState([]);

    // 버튼 비활성화 여부
    const [btnDisable, setBtnDisable] = useState(false);

    // 다음 주소 검색 창
    const open = useDaumPostcodePopup();

    const { getTravalpack, getFile, encodeFile, submitTravalPack, submitFile, deleteFile } = useTravalPackAdd();

    const inputRef = useRef(null);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    useEffect(() => {
        if (packNum !== undefined && packNum !== '') {
            getTravalpack(packNum).then(res => setPackInfo(res));
            getFile(packNum).then(res => setImgList(res));
        }
        getFestival();
    }, [packNum])

    const getFestival = () => {
		fetch(SERVER_URL + 'festivalAll', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}).then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error(response.status);
			}
		}).then((data) => {
			setAddr(data);
		}).catch((e) => {
			alert(e)
		})
	}


    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // '추가'버튼을 누를 시
    const handleSubmit = async () => {

        if (packInfo.name ==='' || packInfo.address==='' || packInfo.count==='0' || packInfo.startDate==='' || packInfo.endDate === '' || packInfo.person=== '0' || packInfo.price=== '' || packInfo.smoke=== '' || packInfo.text=== '' || packInfo.festival=== '선택안함'){
            alert('빈칸에 빈 곳이 있습니다.'); return;
        }
        if(imgList === false){
            alert('사진을 추가해 주세요'); return;
        }


        // 축제 정보 먼저 저장
        submitTravalPack(packInfo).then((packNum) => {
            console.log(packNum);
            if (packNum === undefined) { alert('저장에 실패했습니다.'); return; }
            

            submitFile(imgList, packNum).then(result => {
                if (result) {
                    alert('저장이 완료되었습니다.');
                    navigate(`/packreservationList`)
                } else {
                    alert('저장에 실패했습니다.');
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

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return (
        <div className='TravalPackAdd'>
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
            <p>축제 이름</p>
            <select value={packInfo.festival} onChange={(e)=>{ setPackInfo({ ...packInfo, festivalname: e.target.value }); }} className='select-form'>
                <option className="fesSelectBox" key="선택안함" value="선택안함">선택안함</option>
            {addr.map((data) => 
                <option className="fesSelectBox" key={data.name} value={data.name}>{data.name}</option>
            )}
            </select>

            <p>성인</p>
            <select value={packInfo.person} onChange={(e) => { setPackInfo({ ...packInfo, person: e.target.value }); }} className='select-form'> 
                
                {per.map((i) =>
                    <option className="fesSelectBox" key={i} value={i}>{i}명</option>
                )
                }
  
            </select>

            <p>방 갯수</p>
            <select value={packInfo.count} onChange={(e) => { setPackInfo({ ...packInfo, count: e.target.value }); }}  className='select-form'>
            {per.map((i) =>
                    <option className="RoomSelectBox" key={i} value={i}>{i}개</option>
                )
            }
            </select>

            <p>흡연실</p>
            <select value={packInfo.smoke} onChange={(e) => { setPackInfo({ ...packInfo, smoke: e.target.value }); }} className='select-form'>
                <option name="select" className="selectBox4" key="smoke" value="흡연실">O</option>
                <option name="select" className="selectBox4" key="smoke1" value="금연실">X</option>
            </select>

            <br></br>

            

            <input
                maxLength='20'
                placeholder='가격'
                onChange={(e) => { setPackInfo({ ...packInfo, price: e.target.value }); }}
            />

            <div>
                <input value={packInfo.address} readOnly={true} />
                <button className='roomSearch' type='button' onClick={handlePopup}>숙소위치 검색</button>
            </div>

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
            <button className="Search" onClick={handleSubmit} disabled={btnDisable}>추가</button>
      </div>

            

    );

}
export default TravalPackAdd;