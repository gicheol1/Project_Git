import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@mui/material";

import './BoardDetail.css';
import { useBoardDetail } from "./useBoardDetail";
import { useCheckLogin } from "js/useCheckLogin";

import { Comment } from 'js';

const BoardDetail = ({ isLogin }) => {

	const navigate = useNavigate();

	// 게시판 종류와 글 번호
	const { target, boardNum } = useParams();

	// 게시판 내용, 댓글, 이미지
	const [board, setBoard] = useState({});
	const [commentList, setCommentList] = useState([{}]);
	const [fileList, setFileList] = useState([{}]);

	// 작성하고자 하는 새 댓글
	const [newComment, setNewComment] = useState({
		recoNum: '',
		recoMemId: '',
	});

	// 게시판 소유자 여부
	const [isOwner, setIsOwner] = useState(false);

	const {
		getDetail,
		getComment,
		getFile,

		submitComment,

		deleteBoard,

		isOwnerBoard
	} = useBoardDetail();

	const { checkIsAdmin, toLogin } = useCheckLogin();

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	useEffect(() => {

		// 게시판 소유 여부
		isOwnerBoard(target, boardNum).then(result => setIsOwner(result));

		// 게시판 정보
		getDetail(target, boardNum).then(result => setBoard(result));

		// 댓글
		getComment(target, boardNum).then(result => setCommentList(result));

		// 이미지 파일
		getFile(target, boardNum).then(result => result !== undefined && result.length !== 0 ? setFileList(result) : '');

		checkIsAdmin().then((res) => { setIsOwner(res); })

	}, [boardNum]);

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	// 게시판 수정하기
	const onMoveUpdate = () => {
		if (isLogin) {
			toLogin();
			navigate(`/boardUpdate/${target}/${boardNum}`);
		} else {
			navigate(`/login`);
		}

	}

	// 게시판 삭제하기
	const onDeleteBoard = () => {
		if (isLogin) {
			deleteBoard(target, boardNum)
		} else {
			navigate(`/login`);
		}

	}

	// ---------- ---------- ---------- ---------- ----------

	// 답글 대상 삭제 여부
	const getRecoCommIsDeleted = (recoNum) => {
		if (recoNum === undefined || recoNum === '') { return false; }

		const recoTarget = commentList.find((comments) => comments.coNum === recoNum);
		return recoTarget.disabled;

	}

	// 답글대상 지정
	const setRecoTarget = (recoNum) => {
		setNewComment(() => {
			const recoTarget = commentList.find((comments) => comments.coNum === recoNum);
			const updatedComment = { ...newComment, recoNum: recoTarget.coNum };
			return updatedComment;
		});
	}

	// 답글 취소
	const cancleRecoTarget = () => {
		setNewComment({ ...newComment, recoNum: '' })
	}

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	return (
		<div className="board-detail-container">

			{/* ===== 제목, 작성자, 일자 ===== */}
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

				{isLogin && isOwner === true ?
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
							onClick={onDeleteBoard}
						>
							삭제하기
						</Button>
					</div>
					:
					<></>
				}

			</div>

			<hr />

			{/* ===== 글 이미지, 내용 ===== */}
			<div className="boardContent">
				{fileList !== null && fileList.length !== 0 ?
					fileList.map((images, index) => (
						images.orgName != undefined ?
							<img
								key={`image ${index}`}
								alt={`image ${images.orgName}`}
								src={`data:image/png;base64,${images.imgFile}`}
							/>
							: <></>
					))
					:
					<></>
				}
				<p>{board.content}</p>
			</div>

			<hr />

			{/* ===== 댓글 ===== */}
			<div className="boardComment">
				<div style={{ display: "flex", flex: "1" }}>

					{/* 답글 대상 표시 */}
					{newComment.recoMemId !== '' && (
						<div>
							<input
								type="text"
								value={newComment.recoMemId}
								readOnly
							/>
							<Button onClick={cancleRecoTarget}> 취소</Button>
						</div>
					)}

					{/* 댓글 입력, 추가 */}
					<Button
						style={{ width: "50px" }}
						disabled={!isLogin}
						onClick={() => { submitComment(target, boardNum, newComment) }}
					>
						댓글 달기
					</Button>
					<textarea
						disabled={!isLogin}
						placeholder={isLogin ? '' : '로그인이 필요합니다.'}
						style={{ resize: "none", width: "80%", height: "100%" }}
						value={newComment.content}
						onChange={(e) => { setNewComment({ ...newComment, content: e.target.value }) }}
					/>
				</div>

				<hr />

				{/* 댓글 표시 */}
				{(commentList !== undefined && commentList.length !== 0) ?
					commentList.map((comment, index) => (
						<Comment
							key={`Comments-${index}`}

							// 로그인, 종류, 게시판 번호
							isLogin={isLogin}
							target={target}
							boardNum={boardNum}

							// 게시판 작성자 여부
							isOwner={isOwner}

							// 작성한 댓글
							comment={comment}

							// 답글 대상 삭제 여부
							recoIsDisabled={getRecoCommIsDeleted}

							// 답글 대상 지정
							setRecoTarget={setRecoTarget}
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