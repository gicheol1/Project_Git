// Festivals.js
// import React from 'react';

// const Festivals = () => {
//     return (
//         <div>
//             축제관리
//         </div>
//     );
// };

// export default Festivals;



import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Festivals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      festivalName: '',
      period: '',
      price: '',
      location: '',
      contactNumber: '',
      officialWebsite: '',
      tags: [],
      content: '',
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleTagChange = (selectedTags) => {
    this.setState({ tags: selectedTags });
  };

  handleAdd = () => {
    // 추가 버튼을 눌렀을 때의 로직을 작성.
    console.log('추가 버튼이 클릭되었습니다.');
    console.log('상태:', this.state);

    // 서버로 데이터 전송
    this.handleSubmit();

    // 추가 작업을 수행한 후 폼 초기화
    this.setState({
      festivalName: '',
      period: '',
      price: '',
      location: '',
      contactNumber: '',
      officialWebsite: '',
      tags: [],
      content: '',
    });
  };



  handleSubmit = async () => {
    try {
      const response = await fetch('/api/addData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state),
      });

      if (response.ok) {
        console.log('Data added successfully!');
        this.props.onAdd(this.state); // 추가 작업을 수행하는 콜백 함수 호출
      } else {
        console.error('Failed to add data to the server.');
      }
    } catch (error) {
      console.error('Error occurred while adding data:', error);
    }
  };

  //regurce


  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid black', // 테두리 색
        background: 'gray',       // 배경 색
        padding: '15px',          // 내용과 테두리 간의 여백
      }}>
        <div className="form-group">
          <h1>축제관리(추가/수정)</h1>
          <label>축제명:</label>
          <input
            type="text"
            name="festivalName"
            value={this.state.festivalName}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>기간:</label>
          <input
            type="text"
            name="period"
            value={this.state.period}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>가격:</label>
          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>위치:</label>
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>문의번호:</label>
          <input
            type="text"
            name="contactNumber"
            value={this.state.contactNumber}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>공식 홈페이지:</label>
          <input
            type="text"
            name="officialWebsite"
            value={this.state.officialWebsite}
            onChange={this.handleChange}
          />
        </div>

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

        <div className="form-group">
          <label>내용:</label>
          <textarea
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </div>

        <div style={{ margin: '10px' }}></div>

        <Button onClick={this.handleAdd}>추가</Button>
      </div>
    );
  }
}

export default Festivals;