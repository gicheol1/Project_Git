import {
    Button, Pagination, Paper,
    Table, TableBody, TableCell, TableContainer,
    TableFooter, TableHead, TableRow
} from "@mui/material";

import { useEffect, useState } from "react";
import { useFestivalList } from "./useFestivalList";
import { useNavigate } from "react-router-dom";

const FestivalList = () => {

    const navigate = useNavigate();

    const [festivals, setFestivals] = useState();
    const [festivalCnt, setFestivalCnt] = useState();
    const [page, setPage] = useState(1);

    const { getFestivalList, getFestivalCnt } = useFestivalList();

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    useEffect(() => {
        getFestivalList(page - 1).then(res => setFestivals(res));
        getFestivalCnt().then(res => setFestivalCnt(res));
    }, [])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    const handlePageChange = (event, page) => {
        setPage(page);
        getFestivalList(page - 1).then(res => setFestivals(res));
    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return (
        <div>
            <TableContainer component={Paper} className="list-container">
                <Table sx={{ minWidth: 750 }} aria-label="simple table">

                    {/* 테이블 헤더 */}
                    <TableHead>
                        <TableRow style={{ backgroundColor: "lightgray" }}>
                            <TableCell align="center" width={10}>번호</TableCell>
                            <TableCell align="center" width={30}>이름</TableCell>
                            <TableCell align="center" width={150}>위치</TableCell>
                            <TableCell align="center" width={30}>시작 날자</TableCell>
                            <TableCell align="center" width={30}>종료 날자</TableCell>
                            <TableCell align="center" width={30}>등록 날자</TableCell>
                            <TableCell align="center" width={30}>지역</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* 테이블 바디 */}
                    <TableBody>
                        {festivals !== undefined && festivals.length !== 0 ?

                            festivals.map((festival) => (

                                <TableRow
                                    key={festival.fNum}
                                    hover={true}
                                    onClick={() => navigate(`/festivalDetail/${festival.fNum}`)}
                                >
                                    <TableCell align="center">{festival.fNum}</TableCell>
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
            </TableContainer>
        </div>
    );
}

export default FestivalList;