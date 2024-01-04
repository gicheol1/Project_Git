import React, { useEffect, useState } from 'react';

import {
  Button,
  Pagination, Paper,
  Table, TableBody, TableCell,
  TableFooter, TableHead, TableRow
} from "@mui/material";

import { useBlackList } from './useBlackList';
import { useNavigate } from 'react-router-dom';

const BlackList = () => {

  const navigate = useNavigate();

  // 블랙 리스트 목록과 전체 갯수
  const [blackList, setBlackList] = useState();
  const [blackListCnt, setBlackListCnt] = useState();

  // 페이지 번호
  const [page, setPage] = useState(1);

  const { getBlackListPage, getBlackListCnt, deleteBlackList } = useBlackList();

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  useEffect(() => {
    getBlackListCnt().then((cnt) => setBlackListCnt(cnt));
    getBlackListPage(0).then((list) => setBlackList(list));
    setPage(1);
  }, []);

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  // 차단 해제
  const onDelete = async (blackNum) => {
    if (!window.confirm('차단 해제 삭제하시겠습니까?')) { return; }

    deleteBlackList(blackNum).then((res) => {

      if (res) {
        alert('차단 해제되었습니다.');
        setBlackList(blackList.filter((black) => black.blackNum !== blackNum));
      } else {
        alert('차단 해제에 실패했습니다.');
      }

    });

  }

  // 차단 정보 수정 페이지로
  const toChangeInfo = (memId) => { navigate(`/servicedown/${memId}`); }

  // 페이지 이동 이벤트
  const handlePageChange = (event, page) => {
    setPage(page);
    getBlackListPage(page - 1).then((list) => setBlackList(list));
  }

  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
  // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

  return (
    <div>
      <Table component={Paper} sx={{ minWidth: 750 }} aria-label="simple table">

        {/* 테이블 헤더 */}
        <TableHead>
          <TableRow className="tableHead">
            <TableCell className='table-cell' align="center" width={20}>번호</TableCell>
            <TableCell className='table-cell' align="center" width={30}>아이디</TableCell>
            <TableCell className='table-cell' align="center" width={30}>차단일자</TableCell>
            <TableCell className='table-cell' align="center" width={100}>차단 종료 일자</TableCell>
            <TableCell className='table-cell' align="center" width={150}></TableCell>
          </TableRow>
        </TableHead>

        {/* 테이블 바디 */}
        <TableBody>
          {blackList !== undefined && (
            blackList.length !== 0 ?
              blackList.map(black => (
                <TableRow>
                  <TableCell className='table-cell' align="center" width={30}>{black.blackId}</TableCell>
                  <TableCell className='table-cell' align="center" width={30}>{black.memId}</TableCell>
                  <TableCell className='table-cell' align="center" width={30}>{black.banDate}</TableCell>
                  <TableCell className='table-cell' align="center" width={30}>{black.banEndDate === null ? `무기한` : black.banEndDate}</TableCell>
                  <TableCell className='table-cell' align="center" width={150}>
                    <Button variant="contained" onClick={() => { toChangeInfo(black.blackNum); }} >수정</Button>
                    <Button variant="contained" color="error" style={{ marginLeft: '10px' }} onClick={() => { onDelete(black.blackId); }} >삭제</Button>
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
              count={blackListCnt % 10 !== 0 ? Math.ceil(blackListCnt / 10) : blackListCnt / 10}
              page={page}
              onChange={handlePageChange}
            />
          </TableCell>
        </TableFooter>

      </Table>
    </div>
  );
};

export default BlackList;