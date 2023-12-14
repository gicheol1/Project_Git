import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Likeclick.css';

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // 페이지당 표시할 게시물 수

  const sortBy = (key) => {
    const sortedPosts = [...posts].sort((a, b) => a[key] - b[key]);
    setPosts(sortedPosts);
  };

  useEffect(() => {
    axios.get(`http://localhost:8090/api/qna?page=${currentPage}&limit=${postsPerPage}`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching board list:', error);
      });
  }, [currentPage, postsPerPage]);

  // 현재 페이지에 표시할 게시물의 범위를 계산합니다
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 전체 페이지 수를 계산합니다
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="board-container">
      <p>게시글 정보/좋아요 계시글 정보</p>
      <table>
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <span key={number} onClick={() => paginate(number)}>
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Board;