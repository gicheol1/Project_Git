import {
    Button, Pagination, Paper,
    Table, TableBody, TableCell, TableContainer,
    TableFooter, TableHead, TableRow
} from "@mui/material";

import { useEffect, useState } from "react";
import { useFestivalList } from "./useFestivalList";
import { useNavigate } from "react-router-dom";
import { useCheckLogin } from "js/useCheckLogin";

const FestivalList = () => {

    const navigate = useNavigate();

    // 축제 목록과 전체 갯수
    const [festivals, setFestivals] = useState();
    const [festivalCnt, setFestivalCnt] = useState();

    // 페이지 번호
    const [page, setPage] = useState(1);

    const { getFestivalList, getFestivalCnt } = useFestivalList();
    const { checkIsAdmin } = useCheckLogin();

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    useEffect(() => {

        if (!checkIsAdmin()) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        getFestivalList(page - 1).then(res => setFestivals(res));
        getFestivalCnt().then(res => setFestivalCnt(res));
    }, [])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 새 축제 생성 페이지로
    const onNewFestival = (e) => { navigate('/festivals'); }

    // 페이지 이동 이벤트
    const handlePageChange = (event, page) => {
        setPage(page);
        getFestivalList(page - 1).then(res => setFestivals(res));
    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return (
        <div>
            <Button onClick={onNewFestival}>축제 등록</Button>

            <Table component={Paper} sx={{ minWidth: 950 }} aria-label="simple table">

                {/* 테이블 헤더 */}
                <TableHead>
                    <TableRow style={{ backgroundColor: "lightgray" }}>
                        <TableCell align="center" width={10}>번호</TableCell>
                        <TableCell align="center" width={100}>이름</TableCell>
                        <TableCell align="center" width={50}>위치</TableCell>
                        <TableCell align="center" width={30}>시작 날자</TableCell>
                        <TableCell align="center" width={30}>종료 날자</TableCell>
                        <TableCell align="center" width={30}>등록 날자</TableCell>
                        <TableCell align="center" width={10}>지역</TableCell>
                    </TableRow>
                </TableHead>

                {/* 테이블 바디 */}
                <TableBody>
                    {festivals !== undefined && festivals.length !== 0 ?

                        festivals.map((festival) => (

                            <TableRow
                                key={festival.festivalNum}
                                hover={true}
                                onClick={() => navigate(`/festivalDetail/${festival.festivalNum}`)}
                            >
                                <TableCell align="center">{festival.festivalNum}</TableCell>
                                <TableCell align="center">{festival.name}</TableCell>
                                <TableCell align="center">{festival.location}</TableCell>
                                <TableCell align="center">{festival.startDate}</TableCell>
                                <TableCell align="center">{festival.endDate}</TableCell>
                                <TableCell align="center">{festival.singDate}</TableCell>
                                <TableCell align="center">{festival.region}</TableCell>
                            </TableRow>
                        ))
                        :
                        <TableRow>
                            <TableCell colSpan={7} align="center">등록된 축제 없음</TableCell>
                        </TableRow>
                    }
                </TableBody>

                {/* 테이블 바디 */}
                <TableFooter>
                    <TableCell colSpan={7} align="center">
                        <Pagination
                            className="page-container"
                            count={festivalCnt % 10 !== 0 ? Math.ceil(festivalCnt / 10) : festivalCnt / 10}
                            page={page}
                            onChange={handlePageChange}
                        />
                    </TableCell>
                </TableFooter>
            </Table>
        </div>
    );
}

export default FestivalList;