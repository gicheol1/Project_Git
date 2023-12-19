import { SERVER_URL } from 'js/component/constants';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import './Festivals.css';

class Festivals extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			content: '',
			location: '',
			startDate: '',
			endDate: '',
			officialWebsite: '',
			tags: [],
			region: ''
		};

		this.isDisabled = true;
	}

	// ========== ========== ========== ========== ==========
	// ========== ========== ========== ========== ==========
	// ========== ========== ========== ========== ==========

	// 데이터 입력시
	handleChange = (e) => { this.setState({ [e.target.name]: e.target.value }); };

	// 시작 날짜 선택시
	handleDateChange = (e) => { this.setState({ [e.target.name]: e.target.value }); this.isDisabled = false; };

	// 태그 선택시
	handleTagChange = (selectedTags) => { this.setState({ tags: selectedTags }); };

	// 추가 버튼 클릭시
	handleAdd = () => {

		// 서버로 데이터 전송
		this.submitFestival();

		// 추가 작업을 수행한 후 폼 초기화
		this.setState({
			name: '',
			content: '',
			location: '',
			startDate: '',
			endDate: '',
			officialWebsite: '',
			tags: [],
			region: ''
		});
	};

	// ========== ========== ========== ========== ==========
	// ========== ========== ========== ========== ==========
	// ========== ========== ========== ========== ==========

	// 축제 추가
	submitFestival = async () => {
		try {
			const response = await fetch(SERVER_URL + 'submitFeatival', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(this.state),
			});

			if (!response.ok) { throw new Error(response.status); }

			this.props.onAdd(this.state);
			alert('새 축제가 추가되었습니다.');

		} catch (error) {
			console.error(error);
			alert('새 축제 추가에 실패했습니다.');
		}
	};

	// ========== ========== ========== ========== ==========
	// ========== ========== ========== ========== ==========
	// ========== ========== ========== ========== ==========

	render() {
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

				{/* 축제 이름 */}
				<div className="form-group">
					<label>축제명:</label>
					<input
						type="text"
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
					/>
				</div>

				{/* 축제 내용 */}
				<div className="form-group">
					<label>내용:</label>
					<textarea
						name="content"
						value={this.state.content}
						onChange={this.handleChange}
						style={{ resize: 'none', width: '30vw' }}
					/>
				</div>

				{/* 축제 날짜 */}
				<div className="form-group">
					<label for="startDate">시작 날짜:</label>
					<input
						type="date"
						id="startDate"
						name="startDate"
						max={this.state.endDate ? this.state.endDate : null}
						onChange={this.handleDateChange}
					/>

					<label for="endDate">끝나는 날짜:</label>
					<input
						type="date"
						id="endDate"
						name="endDate"
						min={this.state.startDate}
						onChange={this.handleChange}
						disabled={this.isDisabled}
					/>
				</div>

				{/* 축제 위치 */}
				<div className="form-group">
					<label>위치:</label>
					<input
						type="text"
						name="location"
						value={this.state.location}
						onChange={this.handleChange}
					/>
				</div>

				{/* 축제 공식 홈페이지 */}
				<div className="form-group">
					<label>공식 홈페이지:</label>
					<input
						type="text"
						name="officialWebsite"
						value={this.state.officialWebsite}
						onChange={this.handleChange}
						style={{ width: '20vw' }}
					/>
				</div>

				{/* 축제 태그 */}
				<div className="form-group">
					<label>태그:</label>
					<select
						value={this.state.tags}
						onChange={(e) => this.handleTagChange([e.target.value])}
					>
						<option value="">선택하세요</option>
						<option value="festival">축제</option>
						<option value="performance">공연/행사</option>
					</select>
				</div>

				{/* 축제 위치 지역 */}
				<div className="form-group">
					<label>지역 : </label>
					<select
						name="Region"
						value={this.state.tags}
						onChange={this.handleChange}
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

				<Button onClick={this.handleAdd}>추가</Button>
			</div>
		);
	}
}

export default Festivals;