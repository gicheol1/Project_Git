
import React, { useState, useEffect } from 'react';
import { useUserList } from './useUserList';

import {
  Button,
  Pagination, Paper,
  Table, TableBody, TableCell,
  TableFooter, TableHead, TableRow
} from "@mui/material";

import './UserList.css';
import { useNavigate } from 'react-router-dom';

const UserList = () => {

  const navigate = useNavigate();

  // 회원 리스트와 회원수
  const [userList, setUserList] = useState();
  const [userCnt, setUserCnt] = useState();

  const [page, setPage] = useState(1);

  const { getUserListPage, getUserListCnt, deleteUser } = useUserList();

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  useEffect(() => {
    getUserListCnt().then((cnt) => setUserCnt(cnt));
    getUserListPage(0).then((list) => setUserList(list));
    setPage(1);
  }, []);

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  // 삭제하기
  const onDelete = async (memId) => {

    if (!window.confirm('정말로 삭제하시겠습니까? 다시 복구할수 없습니다!')) { return; }

    deleteUser(memId).then((res) => {

      if (res) {
        alert('삭제가 완료되었습니다.');
        setUserList(userList.filter((user) => user.memId !== memId));
      } else {
        alert('삭제에 실패했습니다.');
      }

    });

  }

  // 회원정보 수정 페이지로
  const toChangeInfo = (memId) => { navigate(`/userDetail/${memId}`); }

  // 페이지 이동 이벤트
  const handlePageChange = (event, page) => {
    setPage(page);
    getUserListPage(page - 1).then((list) => setUserList(list));
  }

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  return (
    <div className="table-container">
      <Table component={Paper} sx={{ minWidth: 650 }} aria-label="simple table">

        {/* 테이블 헤더 */}
        <TableHead>
          <TableRow className="tableHead">
            <TableCell className='table-cell' align="center" width={30}>아이디</TableCell>
            <TableCell className='table-cell' align="center" width={30}>이름</TableCell>
            <TableCell className='table-cell' align="center" width={30}>전화번호</TableCell>
            <TableCell className='table-cell' align="center" width={30}>가입일자</TableCell>
            <TableCell className='table-cell' align="center" width={120}></TableCell>
          </TableRow>
        </TableHead>

        {/* 테이블 바디 */}
        <TableBody>
          {userList !== undefined && (
            userList.length !== 0 ?
              userList.map(user => (
                <TableRow>
                  <TableCell className='table-cell' align="center" width={30}>{user.memId}</TableCell>
                  <TableCell className='table-cell' align="center" width={30}>{user.name}</TableCell>
                  <TableCell className='table-cell' align="center" width={30}>{user.phonNum}</TableCell>
                  <TableCell className='table-cell' align="center" width={30}>{user.singupDate}</TableCell>
                  <TableCell className='table-cell' align="center" width={120}>
                    <Button variant="contained" onClick={() => { toChangeInfo(user.memId); }} >수정</Button>
                    <Button variant="contained" color="error" style={{ marginLeft: '10px' }} onClick={() => { onDelete(user.memId); }} >삭제</Button>
                  </TableCell>
                </TableRow>
              ))
              :
              <TableRow>
                <TableCell className='table-cell' colSpan={5} align="center">No Data</TableCell>
              </TableRow>
          )
          }
        </TableBody>

        {/* 테이블 푸터 */}
        <TableFooter>
          <TableCell colSpan={5}>
            <Pagination
              count={userCnt % 10 !== 0 ? Math.ceil(userCnt / 10) : userCnt / 10}
              page={page}
              onChange={handlePageChange}
            />
          </TableCell>
        </TableFooter>

      </Table>
    </div>
  );
};

export default UserList;