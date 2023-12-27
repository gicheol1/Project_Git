import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import './QnaStatus.css';
import axios from 'axios';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const PostQnaStatus = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);

  // 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/qna'); // '/api/qna' 엔드포인트로 변경        
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleAnswer = (postId) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, answer: !post.answer } : post
    );
    setPosts(updatedPosts);
  };

  const togglePrivacy = (postId) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, private: !post.private } : post
    );
    setPosts(updatedPosts);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / itemsPerPage); i++) {
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

  return (
    <div className="board-container">
      <p className='qna-head'><HelpOutlineIcon fontSize='large' /> 내 Q&A 게시글</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='brd-style'>글번호</th>
            <th className='brd-style'>제목</th>
            <th className='brd-style'>답변여부</th>
            <th className='brd-style'>비공개여부</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>
                <Button
                  variant={post.answer ? 'success' : 'danger'}
                  onClick={() => toggleAnswer(post.id)}
                >
                  {post.answer ? '답변완료' : '미답변'}
                </Button>
              </td>
              <td>
                <Button
                  variant={post.private ? 'warning' : 'info'}
                  onClick={() => togglePrivacy(post.id)}
                >
                  {post.private ? '비공개' : '공개'}
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