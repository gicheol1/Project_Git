import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	Button, Pagination, Paper,
	Table, TableBody, TableCell, TableContainer,
	TableFooter, TableHead, TableRow
} from "@mui/material";

import './BoardList.css';

import { useBoardList } from "./useBoardList";

const BoardList = ({ isLogin }) => {

	const navigate = useNavigate();

	// 불러올 게시판 데이터 종류 (자유, 공지 ,QA 등..)
	const { target } = useParams();

	// 계시판 리스트
	const [boardList, setBoardList] = useState();

	// 계시판 페이지
	const [page, setPage] = useState(1);

	// 계시판 총 갯수(페이지 수를 결정함)
	const [boardCnt, setBoardCnt] = useState(1);

	const { getBoardList, getBoardCnt, isOwnerBoard } = useBoardList();

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	useEffect(() => {
		getBoardCnt(target).then((cnt) => setBoardCnt(cnt));
		getBoardList(target, 0).then((lists) => setBoardList(lists));
		setPage(1);

	}, [target]);

	// ▦▦▦▦▦ ▦▦▦▦▦ ▦▦▦▦▦ ▦▦▦▦▦ ▦▦▦▦▦
	// ▦▦▦▦▦ ▦▦▦▦▦ ▦▦▦▦▦ ▦▦▦▦▦ ▦▦▦▦▦
	// ▦▦▦▦▦ ▦▦▦▦▦ ▦▦▦▦▦ ▦▦▦▦▦ ▦▦▦▦▦

	const setTitle = () => {

		switch (target) {
			case "free":
				return "자유 게시판"

			case "notic":
				return "공지 사항"

			case "promotion":
				return "홍보 게시판"

			case "event":
				return "이벤트 게시판"

			case "qa":
				return "질문(Q&A) 게시판"

			default:
				return "404 Not Found"
		}
	}

	// 페이지 이동 이벤트
	const handlePageChange = (event, page) => {
		setPage(page);
		getBoardList(target, page - 1).then((lists) => setBoardList(lists));
	}

	// 게시판 상세 정보로 이동
	const onBoardDetail = (boardNum) => {
		navigate(`/boardDetail/${target}/${parseInt(boardNum)}`);
	}

	// 게시판 만들기
	const onMakeBoard = () => {
		navigate(`/boardMake/${target}`);
	}

	// const onShow = () => { console.log(sessionStorage.getItem('jwt')); }

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	return (
		<div>

			{target !== undefined ?
				<h2>{setTitle()}</h2>
				:
				<></>
			}
			{isLogin && (
				<Button
					className="btn"
					variant="contained"
					onClick={onMakeBoard}

				>
					글쓰기
				</Button>
			)}
			{/* <Button onClick={onShow}>데이터 확인</Button> */}

			<TableContainer component={Paper} className="tableContainer">
				<Table sx={{ minWidth: 650 }} aria-label="simple table">

					{/* 테이블 헤더 */}
					<TableHead>
						<TableRow className="tableHead">
							<TableCell align="center" width={10}>번호</TableCell>
							<TableCell align="center" width={150}>제목</TableCell>
							<TableCell align="center" width={30}>작성자</TableCell>
							<TableCell align="center" width={30}>작성 날짜</TableCell>
							<TableCell align="center" width={10}>리뷰</TableCell>
						</TableRow>
					</TableHead>

					{/* 테이블 바디 */}
					<TableBody>
						{boardList !== undefined ?

							// 게시글이 없는 경우
							boardList.length === 0 ?
								<TableRow>
									<TableCell colSpan={5} align="center">게시글 없음</TableCell>
								</TableRow>

								:

								// 게시글이 있는 경우
								boardList.map((board) => (

									// 비공개가 아닌 경우
									board.privated !== undefined && (
										board.privated === 'N' ?
											<TableRow
												key={board.boardNum}
												hover={true}
												onClick={() => onBoardDetail(board.boardNum)}
											>
												<TableCell align="center">{board.boardNum}</TableCell>
												<TableCell align="center">{board.title}</TableCell>
												<TableCell align="center">{board.memId}</TableCell>
												<TableCell align="center">{board.date}</TableCell>
												<TableCell align="center">{board.review}</TableCell>
											</TableRow>
											:

											// 비공개이나 게시글이 작성자 본인인 경우
											isOwnerBoard(target, board.boardNum)) && isLogin ?
										<TableRow
											key={board.boardNum}
											hover={true}
										>
											<TableCell colSpan={5} align="center">비공개</TableCell>
										</TableRow>
										:
										<TableRow
											key={board.boardNum}
											hover={true}
											onClick={() => onBoardDetail(board.boardNum)}
										>
											<TableCell align="center">{board.boardNum}</TableCell>
											<TableCell align="center">{board.title}</TableCell>
											<TableCell align="center">{board.memId}</TableCell>
											<TableCell align="center">{board.date}</TableCell>
											<TableCell align="center">{board.review}</TableCell>
										</TableRow>
								))
							:
							<></>
						}
					</TableBody>

					{/* 테이블 푸터 */}
					<TableFooter>
						<TableCell colSpan={5}>
							<Pagination
								className="page-container"
								count={boardCnt % 10 !== 0 ? Math.ceil(boardCnt / 10) : boardCnt / 10}
								page={page}
								onChange={handlePageChange}
							/>
						</TableCell>
					</TableFooter>
				</Table>
			</TableContainer>
		</div>
	);

};

export default BoardList;