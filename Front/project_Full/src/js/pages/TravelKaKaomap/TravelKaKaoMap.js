/* global kakao */
// - 리액트에서 카카오 맵을 뛰우려면 import React 윗부분에 /* global kakao */을 작성해야한다.
// => 참고: https://velog.io/@bearsjelly/React-kakao-%EC%A7%80%EB%8F%84-%EB%9D%84%EC%9A%B0%EA%B8%B0-2-%EC%95%B1%ED%82%A4%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EC%A7%80%EB%8F%84-%EB%9D%84%EC%9A%B0%EA%B8%B0
// - 주소로 장소 표시하기: https://apis.map.kakao.com/web/sample/addr2coord/

import React, { useEffect, useState, useRef } from "react";
import './TravelKaKaoMap.css';

import { SERVER_URL } from 'js';

const TravelKaKaoMap = () => {

	// 주소-좌표 변환 객체를 생성
	const geocoder = new kakao.maps.services.Geocoder();

	// 주소 리스트
	const [addrList, setAddr] = useState([]);

	// 지역 리스트
	const [RegionList, setRegion] = useState("");
	const [CheckList, setCheck] = useState("");

	const [text, setText] = useState("");
	const [Search, setSearch] = useState({});

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	useEffect(() => { getFestival(); }, [])

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	// Spring Boot에서 축제 이름, 위치, 기간을 json으로 가져오기
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
			
			const randomLat = Math.ceil(Math.random() * data.length);
			showMap(data[randomLat-1]);

		}).catch((e) => {
			alert(e)

		})
	}
	/* tag 체크박스 */
	const onCheckedItem = (Check, Check1, CheckThis) => {

		/* 체크박스 중복 금지 */
		const checkboxes = document.getElementsByName('check')
		for (let i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i] !== CheckThis) {
				checkboxes[i].checked = false
			}
		}

		if (Check) {
			setCheck(Check1);
			console.log(Check1);
			if (RegionList === "") {/* 지역셀렉트 박스가 NUll값일때  */
				const camp = addrList.filter((data) => data.tag === Check1); /* 체크박스 값이랑 같은 값만 추출*/
				if(camp.length !== 0){
				const randomLat = Math.ceil(Math.random() * camp.length);
				for(let i in camp){
					if(randomLat==i){
						showMap(camp[i]);
					}
				}
				}
				
				else{
					const checkboxes = document.getElementsByName('check')
					for (let i = 0; i < checkboxes.length; i++) {
							checkboxes[i].checked = false
					}
					getFestival();
					alert("데이터가 없습니다.");
				}

			} else {
				const camp = addrList.filter((data) => data.tag === Check1 && data.region === RegionList); /* 체크박스 값이랑 셀렉트 박스 값 추출*/
				if(camp.length !== 0){
					const randomLat = Math.ceil(Math.random() * camp.length);
					for(let i in camp){
						if(randomLat==i){
							showMap(camp[i]);
						}
					}
					
				}
				else{
					const checkboxes = document.getElementsByName('check')
					for (let i = 0; i < checkboxes.length; i++) {
							checkboxes[i].checked = false
					}
					getFestival();
					alert("데이터가 없습니다.");
				}
			}
		}

		//-----------------------------------------------------------------------
		else {
			setCheck("");
			if (RegionList === "")
			{	
				const checkboxes = document.getElementsByName('check')
					for (let i = 0; i < checkboxes.length; i++) {
							checkboxes[i].checked = false
					}
				getFestival();
				alert("데이터가 없습니다.");
			}
			else {
				const camp = addrList.filter((data) => data.region === RegionList);
				if(camp.length !== 0){
					const randomLat = Math.ceil(Math.random() * camp.length);
					for(let i in camp){
						if(randomLat==i){
							showMap(camp[i]);
						}
					}
					
				}
			}
		}
	}




	/* 지역 셀렉트 박스 */
	const onSelectedItem = (Select) => {
		if (Select === "X") {
			setRegion("");
			if (CheckList === ""){
				const checkboxes = document.getElementsByName('check')
					for (let i = 0; i < checkboxes.length; i++) {
							checkboxes[i].checked = false
					}
				getFestival();
				alert("데이터가 없습니다.");
			}
			else {
				const camp = addrList.filter((data) => data.tag === CheckList);
				if(camp.length !== 0){
					const randomLat = Math.ceil(Math.random() * camp.length);
					for(let i in camp){
						if(randomLat==i){
							showMap(camp[i]);
						}
					}
					
				}
			}

		}
		else {
			setRegion(Select);
			if (CheckList === "") {
				const camp = addrList.filter((data) => data.region === Select);
				if(camp.length !== 0){
					const randomLat = Math.ceil(Math.random() * camp.length);
					for(let i in camp){
						if(randomLat==i){
							showMap(camp[i]);
						}
					}
					
				}
			}
			else {
				const camp = addrList.filter((data) => data.tag === CheckList && data.region === Select);
				if(camp.length !== 0){
					const randomLat = Math.ceil(Math.random() * camp.length);
					for(let i in camp){
						if(randomLat==i){
							showMap(camp[i]);
						}
					}
					
				}
			}
		}
	}
	/* 지도표시 버튼을 눌렀을 경우 */
	const result = () => {
		if (CheckList === "" && RegionList === ""){
			const checkboxes = document.getElementsByName('check')
					for (let i = 0; i < checkboxes.length; i++) {
							checkboxes[i].checked = false
					}
			getFestival();
			alert("데이터가 없습니다.");
		}
		else if (CheckList === "" && RegionList !== "") {
			const camp = addrList.filter((data) => data.region === RegionList);
			if(camp.length !== 0){
				const randomLat = Math.ceil(Math.random() * camp.length);
				for(let i in camp){
					if(randomLat==i){
						showMap(camp[i]);
					}
				}
				
			}
		}
		else if (CheckList !== "" && RegionList === "") {
			const camp = addrList.filter((data) => data.tag === CheckList);
			if(camp.length !== 0){
				const randomLat = Math.ceil(Math.random() * camp.length);
				for(let i in camp){
					if(randomLat==i){
						showMap(camp[i]);
					}
				}
				
			}
		}
		else if (CheckList !== "" && RegionList !== "") {
			const camp = addrList.filter((data) => data.tag === CheckList && data.region === RegionList);
			if(camp.length !== 0){
				const randomLat = Math.ceil(Math.random() * camp.length);
				for(let i in camp){
					if(randomLat==i){
						showMap(camp[i]);
					}
				}
				
			}
		}
	}
	/* 검색 텍스트 박스*/
	const handleChange = (event) => {
		setText(event.target.value);
	};

	/* 텍스트 박스 검색 버튼*/
	const onTextBox = () => {

		const checkboxes = document.getElementsByName('check');
		for (let i = 0; i < checkboxes.length; i++) {
			checkboxes[i].checked = false
		}
		setCheck("");

		document.querySelector('select').value = "X";
		setRegion("");

		if (text === "")
			alert("검색어를 입력해주세요.");
		if (text.length === 1) {
			alert("두글자 이상 입력해주세요.");
		}
		else {
			addrList.map((item) => {
				if (item.name.indexOf(text) !== -1) {
					console.log(item, item.name);

					const camp = addrList.filter((data) => data.name === item.name);
					if(camp.length !== 0){
						const randomLat = Math.ceil(Math.random() * camp.length);
						for(let i in camp){
							if(randomLat==i){
								showMap(camp[i]);
							}
						}
						
					}

				}
			})
		}

	}

	// ----- ----- ----- ----- ----- ----- ----- ----- -----

	//---------------초기화--------------

	const showMap = (data) => {

		const
			// 지도를 표시할 div 
			mapContainer = document.getElementById('map'),

			// 지도 설정
			mapOption = {

				// 지도의 중심좌표
				center: new kakao.maps.LatLng(33.450701, 126.570667),

				// 지도의 확대 레벨
				level: 5
			};

		// 지도를 생성 
		const map = new kakao.maps.Map(mapContainer, mapOption);

			// 주소로 좌표를 검색
			geocoder.addressSearch(data.location, function (result, status) {

				// 정상적으로 검색이 완료됐으면 
				if (status === kakao.maps.services.Status.OK) {

					let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

					// 결과값으로 받은 위치를 마커로 표시
					let marker = new kakao.maps.Marker({
						map: map,
						position: coords
						
					});

					// 인포윈도우로 장소에 대한 설명을 표시
					let infowindow = new kakao.maps.InfoWindow({
						content:
							`<div style="width:250px;text-align:center;padding:1px 0;">` +
							`<p>` +
							`${data.name}` +
							`</p>` +
							`<p>` +
							`${data.startDate} ~ ${data.endDate}` +
							`</p>` +
							`</div>`
					});
					infowindow.open(map, marker);

					// 지도의 중심을 결과값으로 받은 위치로 이동
					map.setCenter(coords);
				}
			});

			return null;

	}

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	return (

		<div>

			<div id="btnGroup">
				<div>

					<span className="cam">
						캠핑
						<input className="캠핑" type='checkbox' name="check"
							onChange={(e) => {
								onCheckedItem(e.target.checked, e.target.className, e.target);
							}} />
					</span>

					<span className="cul">
						문화
						<input className="문화" type='checkbox' name="check"
							onChange={(e) => {
								onCheckedItem(e.target.checked, e.target.className, e.target);
							}} />
					</span>

					<span className="fes">
						축제
						<input className="축제" type='checkbox' name="check"
							onChange={(e) => {
								onCheckedItem(e.target.checked, e.target.className, e.target);
							}} />
					</span>

					<span className="mapshow">
						공연/행사
						<input className="공연행사" type='checkbox' name="check"
							onChange={(e) => {
								onCheckedItem(e.target.checked, e.target.className, e.target);
							}} />
					</span>
					{/* <input className="checkBox5" type='checkbox' />태그
					<input className="checkBox6" type='checkbox' />태그
					<input className="checkBox7" type='checkbox' />태그
					<input className="checkBox8" type='checkbox' />태그 */}
					<p className="selectInputName">지역 선택</p>
					<select className="selectInput" onChange={(e) => {
						onSelectedItem(e.target.value);
					}}>
						<option name="select" className="selectBox" key="X" value="X">선택 안함</option>
						<option name="select" className="selectBox" key="Seoul" value="서울">서울</option>
						<option name="select" className="selectBox" key="Daejeon" value="대전">대전</option>
						<option name="select" className="selectBox" key="Daegu" value="대구">대구</option>
						<option name="select" className="selectBox" key="Busan" value="부산">부산</option>
					</select>


				</div>


				<input className="Text" maxLength='20' placeholder='검색어를 입력해주세요.' onChange={handleChange} value={text || ""} />
				<button className="Search" onClick={onTextBox} >검색</button>

			</div>
			<button className="mapBtn" onClick={() => { result(); }} >지도 표시</button>

			<div id="map"></div>

		</div>

	);
}

export default TravelKaKaoMap;
