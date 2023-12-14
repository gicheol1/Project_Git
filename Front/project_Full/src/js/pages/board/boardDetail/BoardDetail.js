import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@mui/material";

import './BoardDetail.css';
import { useBoardDetail } from "./useBoardDetail";
import { useCheckLogin } from "js/useCheckLogin";

import { Comment } from 'js';

const BoardDetail = ({ isLogin }) => {

	const navigate = useNavigate();

	// 소유자 여부
	const [owner, setOwner] = useState(false);

	// 게시판 종류와 글 번호
	const { target, boardNum } = useParams();

	// 게시판 내용, 댓글, 이미지
	const [board, setBoard] = useState({});
	const [commentList, setCommentList] = useState([{}]);
	const [fileList, setFileList] = useState([{}]);

	// 작성한 댓글
	const [comment, setComment] = useState({
		recoNum: '',
		boardNum: boardNum,
		content: ''
	});

	const {
		getDetail,
		getComment,
		getFile,

		deleteBoard,

		isOwnerBoard
	} = useBoardDetail();

	const { toLogin } = useCheckLogin();

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	useEffect(() => {

		// 로그인 상태인지 확인
		if (isLogin !== true && board.private === 'Y') {
			toLogin();
			return;
		}

		isOwnerBoard(target, boardNum).then((res) => {
			if (res !== undefined) { setOwner(res) }
		});

		getDetail(target, boardNum).then(result => setBoard(result));

		getComment(target, boardNum).then(result => { console.log(result); setCommentList(result); });
		getFile(target, boardNum).then(result => result !== undefined && result.length !== 0 ? setFileList(result) : '');

	}, [boardNum]);

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	// 수정하기
	const onMoveUpdate = () => {
		if (isLogin) {
			navigate(`/boardUpdate/${target}/${boardNum}`);
		} else {
			navigate(`/login`);
		}

	}

	// 삭제하기
	const onDelete = () => {
		if (isLogin) {
			navigate(`/boardUpdate/${target}/${boardNum}`);
		} else {
			navigate(`/login`);
		}

	}

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	return (
		<div className="board-detail-container">

			{/* 제목, 작성자, 일자 */}
			<div className="board-head">
				<div className="board-info">
					<h3>{board.title}</h3>
					<span className="author-info">
						작성자: {board.memId}
					</span>
					<span className="date-info">
						작성 일자: {board.date}
					</span>
				</div>

				{(isLogin && owner) === true ?
					<div className="board-actions">

						<Button
							className="btn"
							variant="contained"
							onClick={onMoveUpdate}
						>
							수정하기
						</Button>
						<Button
							className="btn"
							variant="contained"
							color="error"
							onClick={() => { deleteBoard(target, boardNum) }}
						>
							삭제하기
						</Button>
					</div>
					:
					<></>
				}

			</div>

			<hr />

			{/* 글 이미지, 내용 */}
			<div className="boardContent">
				{fileList !== undefined && (
					fileList.length !== 0 ?
						fileList.map((images, index) =>
							<img
								key={`image ${index}`}
								alt={`image ${images.orgName}`}
								src={`data:image/png;base64,${images.imgFile}`}
							/>
						)
						:
						<></>
				)}
				<p>{board.content}</p>
			</div>

			<hr />

			{/* 댓글 */}
			<div className="boardComment">
				<div>
					<span style={{ display: "flex", flex: "2" }}>
						<Button disabled={!isLogin}>댓글 달기</Button>
						<textarea
							disabled={!isLogin}
							placeholder={isLogin ?
								''
								:
								'로그인이 필요합니다.'}
							style={{ resize: "none", width: "85%" }}
							value={comment.content}
							onChange={(e) => { setComment({ ...comment, content: e.target.value }) }}
						/>
					</span>
				</div>

				<hr />
				{(commentList.length !== undefined && commentList.length !== 0) ?

					// 댓글 표시
					commentList.map(comment => (
						<Comment
							target={target}
							boardNum={boardNum}
							isLogin={isLogin}
							comment={comment}
						/>
					))
					:
					// 없는 경우
					<p>댓글이 없습니다.</p>
				}
			</div>
		</div >
	);
}

export default BoardDetail;