import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@mui/material";

import './BoardDetail.css';
import { useBoardDetail } from "./useBoardDetail";
import { useCheckLogin } from "js/useCheckLogin";

import { Comment } from 'js';
import { Label } from "@mui/icons-material";

const BoardDetail = ({ isLogin }) => {

	const navigate = useNavigate();

	// 게시판 종류와 글 번호
	const { target, boardNum } = useParams();

	// 게시판 내용, 댓글, 이미지
	const [board, setBoard] = useState({});
	const [commentList, setCommentList] = useState([{}]);
	const [fileList, setFileList] = useState([{}]);

	// 작성하고자 하는 새 답글
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
		deleteAllFile,

		isOwnerBoard
	} = useBoardDetail();

	const { checkIsAdmin, toLogin } = useCheckLogin();

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	useEffect(() => {

		// 게시판 소유 여부
		isOwnerBoard(target, boardNum).then(result => setIsOwner(result));

		// 게시판 정보
		getDetail(target, boardNum).then(result => setBoard(result));

		// 댓글
		getComment(target, boardNum).then(result => {
			if (result === undefined || result === null) {
				setCommentList(undefined);
			} else {
				setCommentList(result);
			}
		});

		// 이미지 파일
		getFile(target, boardNum).then(result => result !== undefined && result.length !== 0 ? setFileList(result) : '');

		checkIsAdmin().then((res) => { setIsOwner(res); })

	}, [boardNum]);

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	// 게시판 수정하기
	const onMoveUpdate = () => {
		if (isLogin) {
			navigate(`/boardUpdate/${target}/${boardNum}`);
		} else {
			toLogin();
		}

	}

	// 게시판 삭제
	const onDeleteBoard = async () => {

		if (!window.confirm('정말로 게시판을 삭제하시겠습니까? 다시 복구할 수 없습니다!')) { return; }

		let boardDeleted = false;
		let imageDeleted = false;

		deleteBoard(target, boardNum).then(res => boardDeleted = res);
		deleteAllFile(target, boardNum).then(res => imageDeleted = res);

		if (!boardDeleted) { alert('삭제에 실패했습니다.'); return; }
		else if (!imageDeleted) { alert('이미지 삭제에 실패했습니다.'); return; }

		else { alert('게시판을 삭제했습니다.'); navigate(`/boardList/${target}`); }
	}

	// ---------- ---------- ---------- ---------- ----------

	// 답글 대상 삭제 여부
	const getRecoCommIsDeleted = (recoNum) => {
		if (recoNum === undefined || recoNum === '') { return false; }
		const recoTarget = commentList.find(comments => comments.coNum === recoNum);
		return recoTarget.deleted;

	}

	// 답글대상 지정
	const setRecoTarget = (recoNum) => {
		const recoTarget = commentList.find((comments) => comments.coNum === recoNum);
		setNewComment({
			...recoTarget,
			coNum: '',
			recoNum: recoTarget.coNum
		});
	}

	// 답글 취소
	const cancleRecoTarget = () => {
		setNewComment({ ...newComment, recoNum: '', content: '' })
	}

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	if (fileList.length === 0) {
		return <div>Loadming...</div>
	} else {
		return (
			<div className="board-detail-container">

				{/* ===== 제목, 작성자, 일자 ===== */}
				<div className="board-head">
					<div className="board-info">

						<h3 className="board-title">{board.title}</h3>

						<span className="author-info"> 작성자: {board.memId} </span>
						<span className="date-info"> 작성 일자: {board.date} </span>
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
				<div className="board-comment">
					<div className="createComment">

						{/* 답글 대상 표시 */}
						{newComment.recoNum !== '' && (
							<div className="recomment">
								<label>
									답글 대상 :
									<input
										style={{ marginLeft: '10px' }}
										type="text"
										value={newComment.recoMemId}
										readOnly
									/>
								</label>
								<Button
									style={{ marginBottom: '20px' }}
									className="cancle-recomment"
									onClick={cancleRecoTarget}
								>
									취소
								</Button>
							</div>
						)}

						{/* 댓글 입력, 추가 */}
						<div className="board-newComment">
							<Button
								className="addComment"
								disabled={!isLogin}
								onClick={() => { submitComment(target, boardNum, newComment) }}
							>
								{newComment.recoNum !== '' ? `답글 추가` : `댓글 추가`}

							</Button>
							<textarea
								className="addCommentArea"
								disabled={!isLogin}
								placeholder={isLogin ? '' : '로그인이 필요합니다.'}
								value={newComment.content}
								onChange={(e) => { setNewComment({ ...newComment, content: e.target.value }) }}
							/>
						</div>
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
								boardMemId={board.memId}

								// 답글 대상 삭제 여부
								getRecoCommIsDeleted={getRecoCommIsDeleted}

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
}

export default BoardDetail;