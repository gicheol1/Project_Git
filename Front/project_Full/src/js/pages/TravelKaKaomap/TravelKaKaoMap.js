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

	const [addrList, setAddr] = useState([]);
	const [RegionList, setRegion] = useState("");
	const [CheckList, setCheck] = useState("");
	const [text, setText] = useState("");
	const [Search, setSearch] = useState({});

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	useEffect(() => {
		getFestival();
	}, [])

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	// Spring Boot에서 축제 이름, 위치, 기간을 json으로 가져오기
	const getFestival = () => {
		fetch(SERVER_URL + 'festivalAll', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }

		}).then((response) => {

			if (response.ok) {
				return response.json();

			} else {
				throw new Error(response.status);

			}

		}).then((data) => {
			setAddr(data);
			showMap(data);


		}).catch((e) => {
			alert(e)

		})
	}

	const onCheckedItem = (Check, Check1, CheckThis) => {

		const checkboxes = document.getElementsByName('check')
		for (let i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i] !== CheckThis) {
				checkboxes[i].checked = false
			}
		}

		if (Check) {
			setCheck(Check1);
			if (RegionList === "") {
				const camp = addrList.filter((data) => data.tag === Check1);
				showMap(camp);
				console.log(camp);

			} else {
				const camp = addrList.filter((data) => data.tag === Check1 && data.region === RegionList);
				showMap(camp);

			}
		}

		//-----------------------------------------------------------------------
		else {
			setCheck("");
			if (RegionList === "")
				getFestival();
			else {
				const camp = addrList.filter((data) => data.region === RegionList);
				showMap(camp)
			}
		}
	}

	const onSelectedItem = (Select) => {
		if (Select === "X") {
			setRegion("");
			if (CheckList === "")
				getFestival();
			else {
				const camp = addrList.filter((data) => data.tag === CheckList);
				showMap(camp)
			}

		}
		else {
			setRegion(Select);
			if (CheckList === "") {
				const camp = addrList.filter((data) => data.region === Select);
				showMap(camp)
			}
			else {
				const camp = addrList.filter((data) => data.tag === CheckList && data.region === Select);
				showMap(camp)
			}
		}
	}

	const result = () => {
		if (CheckList === "" && RegionList === "")
			getFestival();
		else if (CheckList === "" && RegionList !== "") {
			const camp = addrList.filter((data) => data.region === RegionList);
			showMap(camp)
		}
		else if (CheckList !== "" && RegionList === "") {
			const camp = addrList.filter((data) => data.tag === CheckList);
			showMap(camp)
		}
		else if (CheckList !== "" && RegionList !== "") {
			const camp = addrList.filter((data) => data.tag === CheckList && data.region === RegionList);
			showMap(camp)
		}
	}

	const handleChange = (event) => {
		setText(event.target.value);
	};

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
					showMap(camp);

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

		data.map(addr => {

			// 주소로 좌표를 검색
			geocoder.addressSearch(addr.location, function (result, status) {

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
							`${addr.name}` +
							`</p>` +
							`<p>` +
							`${addr.startDate} ~ ${addr.endDate}` +
							`</p>` +
							`</div>`
					});
					infowindow.open(map, marker);

					// 지도의 중심을 결과값으로 받은 위치로 이동
					map.setCenter(coords);
				}
			});

			return null;
		});
	}

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	return (

		<div>
			<div id="btnGroup">
				<div>

					<input className="캠핑" type='checkbox' name="check"
						onChange={(e) => {
							onCheckedItem(e.target.checked, e.target.className, e.target);
						}} />캠핑
					<input className="문화" type='checkbox' name="check"
						onChange={(e) => {
							onCheckedItem(e.target.checked, e.target.className, e.target);
						}} />문화
					<input className="축제" type='checkbox' name="check"
						onChange={(e) => {
							onCheckedItem(e.target.checked, e.target.className, e.target);
						}} />축제
					<input className="공연" type='checkbox' name="check"
						onChange={(e) => {
							onCheckedItem(e.target.checked, e.target.className, e.target);
						}} />공연/행사
					<input className="checkBox5" type='checkbox' />태그
					<input className="checkBox6" type='checkbox' />태그
					<input className="checkBox7" type='checkbox' />태그
					<input className="checkBox8" type='checkbox' />태그
				</div>
				<div>
					<select className="selectInput" onChange={(e) => {
						onSelectedItem(e.target.value);
					}}>
						<option name="select" className="selectBox1" key="X" value="X">선택 안함</option>
						<option name="select" className="selectBox2" key="Seoul" value="서울">서울</option>
						<option name="select" className="selectBox3" key="Daejeon" value="대전">대전</option>
						<option name="select" className="selectBox4" key="Daegu" value="대구">대구</option>
						<option name="select" className="selectBox5" key="Busan" value="부산">부산</option>
					</select>
					<button onClick={() => { result(); }}>지도 표시</button>

					<input maxLength='20' placeholder='검색어를 입력해주세요.' onChange={handleChange} value={text || ""} />
					<button className="Search" onClick={onTextBox} >검색</button>
				</div>
			</div>

			<div id="map"></div>

		</div>

	);
}

export default TravelKaKaoMap;
