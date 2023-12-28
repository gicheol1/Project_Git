


// http://localhost:8090/api/boardQAs에서 데이터를 가져와서 <TableCell>에 해당하는 열에 출력하는 코드

import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import './QnaStatus.css';
import axios from 'axios';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const PostQnaStatus = () => {

  // 페이지당 항목 수와 현재 페이지를 관리하는 상태
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // 게시판의 Q&A 목록을 관리하는 상태
  const [boardQAs, setBoardQAs] = useState([]);

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  // 페이지가 로드될 때 API에서 데이터를 가져오는 효과
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/boardQAs');
        console.log('API 응답:', response.data);
        setBoardQAs(response.data._embedded.boardQAs); // boardQAs 배열로 업데이트
      } catch (error) {
        console.error('데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  // 답변 토글 함수
  const toggleAnswer = (postId) => {
    const updatedBoardQAs = boardQAs.map(boardQA =>
      boardQA.memId === postId ? { ...boardQA, answer: !boardQA.answer } : boardQA
    );
    setBoardQAs(updatedBoardQAs);
  };

  // 비공개 토글 함수
  const togglePrivacy = (postId) => {
    const updatedBoardQAs = boardQAs.map(boardQA =>
      boardQA.memId === postId ? { ...boardQA, private: !boardQA.private } : boardQA
    );
    setBoardQAs(updatedBoardQAs);
  };

  // 현재 페이지의 항목 범위 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = boardQAs.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지 번호 렌더링 함수
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(boardQAs.length / itemsPerPage); i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          variant={currentPage === i ? 'primary' : 'secondary'}
        >
          {i}
        </Button>
      );
    }
    return pageNumbers;
  };

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  return (
    <div className="board-container">
      <p className='qna-head'><HelpOutlineIcon fontSize='large' /> 내 Q&A 게시글</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='brd-style'>번호</th>
            <th className='brd-style'>제목</th>
            <th>작성자</th>
            <th>작성 날짜</th>
            <th>리뷰</th>
            <th className='brd-style'>답변여부</th>
            <th className='brd-style'>비공개여부</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((boardQA, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{boardQA.title}</td>
              <td>{boardQA.memId}</td>
              <td>{boardQA.date}</td>
              <td>{boardQA.review}</td>
              <td>
                <Button
                  variant={boardQA.answer ? 'success' : 'danger'}
                  onClick={() => toggleAnswer(boardQA.memId)}
                >
                  {boardQA.answer ? '답변완료' : '미답변'}
                </Button>
              </td>
              <td>
                <Button
                  variant={boardQA.privated === 'Y' ? 'warning' : 'info'}
                  onClick={() => togglePrivacy(boardQA.memId)}
                >
                  {boardQA.privated === 'Y' ? '비공개' : '공개'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="pagination-container">
        {renderPageNumbers()}
      </div>
    </div>
  );
};

export default PostQnaStatus;
