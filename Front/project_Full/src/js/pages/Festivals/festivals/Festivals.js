import { SERVER_URL } from 'js/component/constants';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import './Festivals.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useFestivals } from './useFestivals';
import { useDaumPostcodePopup } from "react-daum-postcode";

const Festivals = () => {

	const navigate = useNavigate();

	const { festivalNum } = useParams();

	const [festival, setFestival] = useState({
		name: '',
		content: '',
		location: '',
		startDate: '',
		endDate: '',
		officialWebsite: '',
		tags: [],
		region: ''
	});

	// 우편번호와 도로/지번 주소를 저장하는 객체
	const [addrFull, setAddrFull] = useState({
		addrRoad: '', // 도로
		addrJibun: '', // 지번
		addrCode: '' // 우편번호
	})
	const [selectedOption, setSelectedOption] = useState('');
	const [btnEnable, setBtnEnable] = useState(false);

	const open = useDaumPostcodePopup();
	const { getFestival } = useFestivals();

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	useEffect(() => {
		if (festivalNum !== undefined) { getFestival().then(res => setFestival(res)); }
	}, [festivalNum])

	useEffect(() => {
		setBtnEnable(isFestivalComplete());
	}, [festival])

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	// 데이터 입력시
	const handleChange = (e) => { setFestival({ [e.target.name]: e.target.value }); };

	// 시작 날짜 선택시
	const handleDateChange = (e) => { setFestival({ [e.target.name]: e.target.value }); };

	// 태그 선택시
	const handleTagChange = (e) => {
		const checkedTag = e.target.value;

		// 체크박스를 체크하면 추가, 체크를 해제하면 제거
		if (festival.tags.includes(checkedTag)) {
			const updatedTags = festival.tags.filter(tag => tag !== checkedTag);
			setFestival({ ...festival, tags: updatedTags });
		} else {
			setFestival({ ...festival, tags: [...festival.tags, checkedTag] });
		}
	};

	const handlePopup = () => { open({ onComplete: handleComplete }); }

	const handleComplete = (data) => {
		setAddrFull({
			addrR: data.roadAddress,
			addrJ: data.jibunAddress,
			zCode: data.zonecode
		});

		if (selectedOption !== '') {
			if (selectedOption === "roadAddress") {
				setFestival({ ...festival, location: addrFull.addrRoad });
			} else {
				setFestival({ ...festival, location: addrFull.addrJibun });
			}
		}

	}

	// 주소 설정
	const handleOptionChange = (e) => {
		const checkedOption = e.target.value;
		setSelectedOption(checkedOption);

		if (selectedOption === "roadAddress") {
			setFestival({ ...festival, location: addrFull.addrRoad });
		} else {
			setFestival({ ...festival, location: addrFull.addrJibun });
		}
	};

	// 추가 버튼 클릭시
	const handleAdd = () => { submitFestival(); };

	// 모든 데이터가 있는지 확인
	const isFestivalComplete = () => {
		for (const key in festival) {
			if (festival[key] === '') {
				return false; // 하나라도 비어있는 필드가 있다면 false 반환
			}
		}
		return true; // 모든 필드가 채워져 있다면 true 반환
	};

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	// 축제 추가
	const submitFestival = async () => {
		try {
			const response = await fetch(SERVER_URL + 'submitFeatival', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(festival),
			});

			if (!response.ok) { throw new Error(response.status); }

			alert('새 축제가 추가되었습니다.');

			// 작업을 수행한 후 리스트 목록으로 이동
			navigate('/festivalList');

		} catch (error) {
			console.error(error);
			alert('축제 추가에 실패했습니다.');
		}
	};

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	return (
		<div style={{
			width: '50vw',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			border: '1px solid black',	// 테두리 색
			background: 'lightgray',	// 배경 색
			padding: '15px',			// 내용과 테두리 간의 여백
		}}>
			<h1>축제관리(추가/수정)</h1>

			{/* ===== 축제 이름 ===== */}
			<div className="form-group">
				<label>축제명 : </label>
				<input
					type="text"
					name="name"
					value={festival.name}
					onChange={handleChange}
				/>
			</div>

			{/* ===== 축제 내용 ===== */}
			<div className="form-group">
				<label>내용 : </label>
				<textarea
					name="content"
					value={festival.content}
					onChange={handleChange}
					style={{ resize: 'none', width: '30vw' }}
				/>
			</div>

			{/* ===== 축제 날짜 ===== */}
			<div className="form-group">
				<label for="startDate">시작 날짜 : </label>
				<input
					type="date"
					id="startDate"
					name="startDate"
					max={festival.endDate ? festival.endDate : null}
					onChange={handleDateChange}
				/>

				<label for="endDate">끝나는 날짜 : </label>
				<input
					type="date"
					id="endDate"
					name="endDate"
					min={festival.startDate}
					onChange={handleChange}
					disabled={festival.startDate !== '' ? false : true}
				/>
			</div>

			{/* ===== 축제 위치 ===== */}
			<div className="form-group">
				<label>축제 위치 : </label>
				<div>
					<p>
						<input type='text' name='zonecode' placeholder='우편번호' value={addrFull.zCode} readOnly={true} />
						<Button onClick={handlePopup}>우편번호 찾기</Button>
					</p>
					<p>
						<input type='text' name='roadAddress' placeholder='도로명' value={addrFull.addrR} readOnly={true} />
						<input type='text' name='jibunAddress' placeholder='지번주소' value={addrFull.addrJ} readOnly={true} />
					</p>
					<p>
						<input type='text' name='' placeholder='상세주소' />
					</p>
				</div>
				<label>
					<input type="radio" value="roadAddress" checked={selectedOption === 'option1'}
						onChange={handleOptionChange}
					>
						도로명 사용
					</input>
				</label>

				<label>
					<input type="radio" value="jibunAddress" checked={selectedOption === 'option2'}
						onChange={handleOptionChange}
					>
						지번주소 사용
					</input>
				</label>

			</div>

			{/* ===== 축제 공식 홈페이지 ===== */}
			<div className="form-group">
				<label>공식 홈페이지 : </label>
				<input
					type="text"
					name="officialWebsite"
					value={festival.officialWebsite}
					onChange={handleChange}
					style={{ width: '20vw' }}
				/>
			</div>

			{/* ===== 축제 태그 ===== */}
			<div className="form-group">
				<label>태그 : </label>
				<input
					value="축제"
					type='checkbox'
					name="tag"
					onChange={handleTagChange}
					checked={festival.tags.includes('축제')} // 해당 태그가 배열에 있는 경우 체크 상태로 설정
				/>
				축제
				<input
					value="공연/행사"
					type='checkbox'
					name="tag"
					onChange={handleTagChange}
					checked={festival.tags.includes('공연/행사')}
				/>
				공연/행사
			</div>

			{/* ===== 축제 위치 지역 ===== */}
			<div className="form-group">
				<label>지역 : </label>
				<select
					name="Region"
					value={festival.tags}
					onChange={handleChange}
				>
					<option value="">선택하세요</option>
					<option value="서울">서울</option>
					<option value="서울">인천</option>
					<option value="강원">강원</option>
					<option value="대전">대전</option>
					<option value="부산">부산</option>
					<option value="대구">대구</option>
				</select>
			</div>

			<div style={{ margin: '10px' }}></div>

			<Button variant="contained" onClick={handleAdd} disabled={!btnEnable}>추가</Button>
		</div>
	);
}

export default Festivals;