import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';

import './Festivals.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useFestivals } from './useFestivals';
import { useDaumPostcodePopup } from "react-daum-postcode";

const Festivals = () => {

	const navigate = useNavigate();
	const inputRef = useRef(null);

	const { festivalNum } = useParams();

	// 축제 정보
	const [festival, setFestival] = useState({
		name: '',
		content: '',
		location: '',
		startDate: '',
		endDate: '',
		officialWebsite: '',
		tag: '',
		region: ''
	});

	// 축제 이미지 파일
	const [festivalImg, setFestivalImg] = useState([]);

	const [btnEnable, setBtnEnable] = useState(false);

	const open = useDaumPostcodePopup();
	const {
		getFestival,
		getFileFeatival,

		setFileFestival,

		submitFestival,
		submitFileFestival,

		deleteFileFestival
	} = useFestivals();

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	useEffect(() => {
		if (festivalNum !== undefined) {
			getFestival(festivalNum).then(res => setFestival(res));
			getFileFeatival(festivalNum).then(res => setFestivalImg(res));
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
	const handleAdd = () => {
		submitFestival(festival).then(num => submitFileFestival(festivalImg, num));
	};

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

	const handleButtonClick = () => { inputRef.current.click(); };

	// 파일 추가 및 저장
	const handleFileChange = async (e) => {

		const selectedFiles = e.target.files;
		const imageFiles = [];

		for (let i = 0; i < selectedFiles.length; i++) {
			const file = selectedFiles[i];
			const fileType = file.type.toLowerCase();

			// 이미지 파일인지 확인 (이미지 파일 확장자: 'image/jpeg', 'image/png', 'image/gif', 등)
			if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif') {
				imageFiles.push(file);
			}
		}

		setBtnEnable(true);
		setFileFestival(imageFiles).then((res) => {
			setFestivalImg(...festivalImg, res);
			setBtnEnable(isFestivalComplete());
		})

	};

	// 선택한 파일 제거 함수
	const handleCancel = (indexTarget) => {

		const targetImg = festivalImg.find((images, index) => index === indexTarget)

		setBtnEnable(true);
		deleteFileFestival(targetImg).then(() => {
			setBtnEnable(isFestivalComplete());
		});

		setFestivalImg(festivalImg.filter((images, index) => index !== indexTarget));
	}

	const showData = () => {
		console.log(festival);
	}

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	if (festival === undefined) {
		return <div>Loading...</div>

	} else {
		return (
			<div className='festival-mu'>
				<h1>축제관리(추가/수정)</h1>

				{/* ===== 축제 이름 ===== */}
				<div className="form-group">
					<label>축제명</label>
					<input
						type="text"
						name="name"
						value={festival.name}
						onChange={handleChange}
					/>
				</div>

				{/* ===== 축제 내용 ===== */}
				<div className="form-group">
					<label>내용</label>
					<textarea
						name="content"
						value={festival.content}
						onChange={handleChange}
						style={{ resize: 'none', width: '30vw' }}
					/>
				</div>

				{/* ===== 축제 날짜 ===== */}
				<div className="form-group">
					<label for="startDate">시작 날짜</label>
					<input
						type="date"
						id="startDate"
						name="startDate"
						value={festival.startDate}
						max={festival.endDate ? festival.endDate : null}
						onChange={handleChange}
					/>

					<label for="endDate" style={{ marginLeft: '20px' }}>끝나는 날짜</label>
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
					<p>축제 위치</p>
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
					<label>공식 홈페이지</label>
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
					<label style={{ marginRight: '30px' }}>태그</label>
					<div style={{ display: 'flex' }}>
						<label>축제</label>
						<input
							value="축제"
							type='radio'
							name="tag"
							onChange={handleChange}
							checked={festival.tag === "축제"}
						/>
						<label>공연/행사</label>
						<input
							value="공연/행사"
							type='radio'
							name="tag"
							onChange={handleChange}
							checked={festival.tag === "공연/행사"}
						/>
					</div>

				</div>

				{/* ===== 축제 위치 지역 ===== */}
				<div className="form-group">
					<label style={{ marginBottom: '3px', marginRight: '10px' }}>지역</label>
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

				<div className="form-group">
					<Button onClick={handleButtonClick}>파일 추가</Button>
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
					{(festivalImg !== undefined && festivalImg.length !== 0) && (
						festivalImg.map((image, index) => (
							<div style={{ display: 'flex' }}>
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