import { Button } from "@mui/material";
import { useBoardDetail } from "../useBoardDetail";
import { useEffect, useState } from "react";
import './Comment.css';

const Comment = ({ target, boardNum, isOwner, comment, recoDisable, setRecoTarget }) => {

	// 댓글 수정 모드
	const [changeMod, setChangeMod] = useState(false);

	// 수정된 댓글
	const [updatedComment, setUpdatedComment] = useState(false);

	// 댓글 작성자 여부
	const [isOwnerComm, setIsOwnerComm] = useState(false);

	const { submitComment, deleteComment, isOwnerComment } = useBoardDetail();

	// ========== ========== ========== ========== ========== ========== ==========
	// ========== ========== ========== ========== ========== ========== ==========
	// ========== ========== ========== ========== ========== ========== ==========

	useEffect(() => {
		isOwnerComment(target, boardNum, comment.coNum).then(res => setIsOwnerComm(res));

	}, [])

	// ========== ========== ========== ========== ========== ========== ==========
	// ========== ========== ========== ========== ========== ========== ==========
	// ========== ========== ========== ========== ========== ========== ==========

	// 댓글 수정 모드 (비)활성화
	const onChangeMod = () => {
		setUpdatedComment(comment);
		setChangeMod(!changeMod);
	}

	// 수정된 댓글 저장
	const onSubmitUpdatedComment = () => {
		submitComment(target, boardNum, updatedComment);
	}

	// 댓글 삭제
	const onDeleteComment = () => {
		deleteComment(target, boardNum, comment.coNum);
	}

	// ========== ========== ========== ========== ========== ========== ==========
	// ========== ========== ========== ========== ========== ========== ==========
	// ========== ========== ========== ========== ========== ========== ==========

	if (changeMod) {
		return (
			<div
				style={comment.recoNum && ({
					backgroundColor: 'lightgray',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '10px'
				})}
			>
				<span style={{ display: "flex", flex: "2" }}>
					<Button variant="contained" onClick={onSubmitUpdatedComment}>수정</Button>
					<Button variant="contained" color="error" onClick={onChangeMod}>취소</Button>
					<textarea
						style={{ resize: "none", width: "85%" }}
						value={updatedComment.content}
						onChange={(e) => { setUpdatedComment({ ...updatedComment, content: e.target.value }) }}
					/>
				</span>
			</div>
		);

	} else {
		return (
			<div
				className="commentList"

				// 답글인 경우의 스타일 지정
				style={comment.recoNum && ({
					backgroundColor: 'lightgray',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '10px'
				})}
			>
				{comment.isDeleted ?
					// 삭제된 댓글인 경우
					<p> ===== 삭제된 댓글입니다. ===== </p>
					:
					// 삭제되지 않은 경우
					<>
						<div className="comments">
							{comment.recoNum !== null && (
								(recoDisable !== undefined && !recoDisable) ?

									<p>답글대상 : {comment.recoMemId}</p>
									:
									// 답글 대상의 글이 삭제된 경우
									<p>삭제된 댓글의 답변 입니다.</p>
							)}
							<span>작성자 : {comment.memId}<span> </span>날짜 : {comment.date}</span>
							<p>{comment.content}</p>
						</div>

						{isOwnerComm ?
							<>
								{/* 수정 버튼 */}
								<Button
									className="btn"
									variant="contained"
									onClick={onChangeMod}
								>
									수정
								</Button>

								{/* 답글 버튼 */}
								<Button
									className="btn"
									variant="contained"
									onClick={() => { setRecoTarget(comment.coNum) }}
								>
									답글
								</Button>


							</>
							: <></>
						}

						{/* 삭제 버튼(작성자, 게시판 소유자인 경우) */}
						{isOwner || isOwnerComm ?
							<Button
								className="btn"
								variant="contained"
								color="error"
								onClick={onDeleteComment}
							>
								삭제
							</Button>
							: <></>
						}
					</>
				}
				<hr />
			</div>
		);
	}
}

export default Comment;