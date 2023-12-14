import { Button } from "@mui/material";
import { useBoardDetail } from "./useBoardDetail";
import { useState } from "react";

const Comment = ({ target, boardNum, isLogin, comment }) => {

	// 댓글 수정 모드
	const [changeComment, setChangeComment] = useState(false);

	// 수정된 댓글
	const [updatedComment, setUpdatedComment] = useState(false);

	const { deleteComment, isOwnerBoard, isOwnerComment } = useBoardDetail();

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	const onUpdateComment = () => {
		setUpdatedComment(comment);
		setChangeComment(!changeComment);
	}

	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====
	// ===== ===== ===== ===== ===== ===== ===== ===== =====

	if (changeComment) {
		return (
			<div>
				<div>
					<span style={{ display: "flex", flex: "2" }}>
						<Button >수정하기</Button>
						<textarea
							style={{ resize: "none", width: "85%" }}
							value={updatedComment.content}
							onChange={(e) => { setUpdatedComment({ ...updatedComment, content: e.target.value }) }}
						/>
					</span>
				</div>
			</div>
		);
	} else {

		return (
			<div
				className="commentList"
				key={comment.coNum}

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
					<>
						<div className="comments">
							{comment.recoNum !== null && (
								!comment.disable ?
									<p>답글대상 : {comment.recoMemId}</p>
									:
									<p>삭제된 댓글의 답변 입니다.</p>
							)}
							<span>작성자 : {comment.memId}<span> </span>날짜 : {comment.date}</span>
							<p>{comment.content}</p>

						</div>


						<div className="btnComment">

							{/* 수정 버튼 */}
							{isLogin && isOwnerComment() ?
								<>
									<Button
										className="btn"
										variant="contained"
										onClick={onUpdateComment}
									>
										수정
									</Button>

									{/* 삭제 버튼(작성자, 게시판 소유자인 경우) */}
									{isOwnerBoard() || isOwnerComment(target, boardNum, comment.coNum) ?
										<Button
											className="btn"
											variant="contained"
											color="error"
											onClick={() => { deleteComment(target, boardNum) }}
										>
											삭제
										</Button>
										:
										<></>
									}
								</>
								:
								<></>
							}
						</div>
					</>
				}
				<hr />
			</div>
		);
	}
}

export default Comment;