import { SERVER_URL } from 'js/component/constants';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

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
		tags: '',
		region: ''
	});

	const [btnEnable, setBtnEnable] = useState(false);

	const open = useDaumPostcodePopup();
	const { getFestival } = useFestivals();

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	useEffect(() => {
		if (festivalNum !== undefined) {
			getFestival(festivalNum).then(res => setFestival(res));
		}
	}, [festivalNum])

	useEffect(() => {
		setBtnEnable(isFestivalComplete());
	}, [festival])

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	// 데이터 입력시
	const handleChange = (e) => { setFestival({ ...festival, [e.target.name]: e.target.value }); };

	// 주소 입력 버튼 클릭시
	const handlePopup = () => { open({ onComplete: handleComplete }); }

	// 주소를 선택했을때(도로명으로(없으면 지번으로) 지정)
	const handleComplete = (data) => {
		if (data.roadAddress !== undefined || data.roadAddress !== '') {
			setFestival({ ...festival, location: data.roadAddress });
		} else {
			setFestival({ ...festival, location: data.jibunAddress });
		}
	}

	// 추가 버튼 클릭시
	const handleAdd = () => { return submitFestival(); };

	// 모든 데이터가 있는지 확인
	const isFestivalComplete = () => {
		for (const key in festival) {
			if (key === 'officialWebsite') { continue; }
			if (festival[key] === '') {
				return true; // 하나라도 비어있는 필드가 있다면 버튼 비활성화
			}
		}
		return false; // 모든 필드가 채워져 있다면 버튼 활성화
	};

	const showData = () => {
		console.log(festival);
	}

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

			alert('새 축제가 추가/수정 되었습니다.');

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

	if (festival === undefined) {
		return <div>Loading...</div>

	} else {
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
						value={festival.startDate}
						max={festival.endDate ? festival.endDate : null}
						onChange={handleChange}
					/>

					<label for="endDate">끝나는 날짜 : </label>
					<input
						type="date"
						id="endDate"
						name="endDate"
						value={festival.endDate}
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
							<Button onClick={handlePopup}>주소 찾기</Button>
							<input type='text' name='roadAddress' placeholder='도로명' value={festival.location} readOnly={true} />
							<input type='text' name='' placeholder='상세주소' />
						</p>
					</div>
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
					<label>태그</label>
					<label>
						축제
						<input
							value="축제"
							type='radio'
							name="tag"
							onChange={handleChange}
							checked={festival.tag === "축제"}
						/>
					</label>
					<label>
						공연/행사
						<input
							value="공연/행사"
							type='radio'
							name="tag"
							onChange={handleChange}
							checked={festival.tag === "공연/행사"}
						/>
					</label>
				</div>

				{/* ===== 축제 위치 지역 ===== */}
				<div className="form-group">
					<label>지역 : </label>
					<select
						name="region"
						value={festival.region}
						onChange={handleChange}
					>
						<option value="">선택하세요</option>
						<option value="서울">서울</option>
						<option value="인천">인천</option>
						<option value="강원">강원</option>
						<option value="대전">대전</option>
						<option value="부산">부산</option>
						<option value="대구">대구</option>
					</select>
				</div>

				<Button
					variant="contained"
					onClick={handleAdd}
					disabled={btnEnable}
				>
					{festivalNum === undefined ? `추가` : `수정`}
				</Button>
				<Button variant="contained" onClick={showData} >데이터 확인</Button>
			</div >
		);

	}
}

export default Festivals;