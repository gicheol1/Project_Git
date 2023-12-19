import React, { useEffect, useState } from 'react';
import { SERVER_URL } from 'js';
import './TravalPackAdd.css';
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';



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
            alert('패키지 추가가 완료되었습니다.'); // 예약이 성공적으로 완료되면 alert으로 메시지 표시

        } catch (error) {
            console.error('POST 요청 오류:', error);
        }
    };




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
    
    
  


    return(
        <div>
            <div className='ImgBox'>
                사진
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