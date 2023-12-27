import React, { useEffect, useState,useRef} from 'react';
import {useParams } from 'react-router-dom';
import { SERVER_URL } from 'js';
import './TravalPackAdd.css';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { TravalPackMU } from './TravalPackMU';
import { Button } from '@mui/material';


const TravalPackAdd = () => {

    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [name, setName] = useState([]);
    const [address, setAddress] = useState([]);
    const [count, setCount] = useState("0");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [person, setPerson] = useState("0");
    const [price, setPrice] = useState("0");
    const [smoke, setSmoke] = useState("흡연실");
    const [text, setText] = useState([]);
    const {
        encodeFile,

        submitFile,
        deleteFile
    } = TravalPackMU();
    const inputRef = useRef(null);
    const { target, boardNum } = useParams();


    
    useEffect(() => {

    },[])

    

    const handleButtonClick = async () => {
        const url = `${SERVER_URL}travalpack/new`

        const data ={
            name: name,
            address: address,
            count: count,
            startDate: startDate,
            endDate: endDate,
            person: person,
            price: price,
            smoke: smoke,
            text: text,
            reservation: "YES",

        };

        try {
            const response = await axios.post(url, data);
            console.log(data);
            console.log('POST 요청 성공:', response.data); // 콘솔창에 성공했다는 내용을 표시
            submitFile(imgList, boardNum).then((res) => {

                if (res !== undefined) {

                    // 실패한 경우(false)
                    if (!res) { return; }

                    // console.log(imgList);

                    // 성공시 
                    if (res > 0) { submitFile(target, imgList, res); }
                }

            });
            alert('패키지 추가가 완료되었습니다.'); // 예약이 성공적으로 완료되면 alert으로 메시지 표시

        } catch (error) {
            console.error('POST 요청 오류:', error);
        }
    };
        // 버튼 비활성화 여부
        const [btnDisable, setBtnDisable] = useState(false);

        // 저장된 이미지
        const [imgList, setImgList] = useState([]);




    //패키지 이름 저장
    const onChangeName = (event) =>{
        setName(event.target.value);
    };

    const onChangeAddress = (data) =>{
        setAddress(data);
    };

    const onChangeCount = (event) =>{
        setCount(event);
    };

    const onChangePerson = (event) =>{
        setPerson(event);
    };

    const onChangePrice = (event) =>{
        setPrice(event.target.value);
    };

    const onChangeSmoke = (event) =>{
        setSmoke(event);
    };

    const onChangeText = (event) =>{
        setText(event.target.value);
    };
 
	// 팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true)
    }
 
	// 팝업창 닫기
    const closePostCode = (data) => {
        setIsPopupOpen(false)
        onChangeAddress(data);
    }

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
                const res = await encodeFile(target, imgFile);
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
            deleteFile(target, boardNum, imgList.find((images, index) => index !== indexTarget)).then(() => {
                setImgList(imgList.filter((images, index) => index !== indexTarget));
            });
        }

        setBtnDisable(true);
        deleteOneFile();
        setBtnDisable(false);

    }


    
    
  


    return(
        <div>
            <div className='ImgBox'>

                        <div className="board-div">
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




            </div>
            <div>
            <input maxLength='20' placeholder='패키지명을 입력해주세요.'  onChange={onChangeName}/><br></br>
            <input maxLength='20' placeholder='패키지 설명을 입력해주세요.' onChange={onChangeText}/>
            </div>
            <div>
            <DatePicker
			  selected={startDate}
			  onChange={(date) => setStartDate(date)}
			  dateFormat="yyyy-MM-dd"
			/>
            ~
            <DatePicker
			  selected={endDate}
			  onChange={(date) => setEndDate(date)}
			  dateFormat="yyyy-MM-dd"
			/>
            </div>
            
            
            <p>성인:</p>
            <select onChange={(e) => {
					onChangePerson(e.target.value);}}>
            <option className = "perSelectBox1" key="person1" value="0">0</option>
            <option className = "perSelectBox2" key="person2" value="1">1</option>
            <option className = "perSelectBox3" key="person3" value="2">2</option>
            </select>
            <p>흡연실</p>
            <select onChange={(e) => {
					onChangeSmoke(e.target.value);}}>
            <option name = "select" className = "selectBox4" key="smoke" value="흡연실">O</option>
            <option name = "select" className = "selectBox4" key="smoke1" value="금연실">X</option>
            </select>
            <br></br>
            <p>방 갯수</p>
            <select onChange={(e) => {
					onChangeCount(e.target.value);}}>
            <option className = "selectBox5" key="count1" value="0">0</option>
            <option className = "selectBox5" key="count2" value="1">1</option>
            <option className = "selectBox5" key="count3" value="2">2</option>
            </select>

            <input maxLength='20' placeholder='가격' onChange={onChangePrice}/>

            <div>
        
                숙소위치
                    

                길안내
            </div>
            
            <button type='button' onClick={openPostCode}>우편번호 검색</button>

            <div id='popupDom'>
                {isPopupOpen && (
                    <PopupDom>
                        <PopupPostCode onClose={closePostCode} />
                    </PopupDom>
                )}
            </div>

            <button className="Search" onClick={handleButtonClick}>완료</button>
 
        </div>


    );

}
export default TravalPackAdd;