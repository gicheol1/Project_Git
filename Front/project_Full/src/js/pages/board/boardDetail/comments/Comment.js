import { Button } from "@mui/material";
import { useBoardDetail } from "../useBoardDetail";
import { useEffect, useState } from "react";
import './Comment.css';

const Comment = ({

	// 로그인, 종류, 게시판 번호
	isLogin,
	target,
	boardNum,

	// 게시판 작성자 여부
	isOwner,

	// 작성한 댓글
	comment,
	boardMemId,

	// 답글 대상 삭제 여부
	getRecoCommIsDeleted,

	// 답글 대상 지정
	setRecoTarget
}) => {

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

	// 자신이 작성한 댓글인지 확인
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
			<>
				<div className={comment.recoNum !== '' ? 'updateComm' : 'updateRecoComm'}
					style={comment.recoNum && ({
						backgroundColor: 'lightgray',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '10px'
					})}
				>
					<Button className="btn" variant="contained" onClick={onSubmitUpdatedComment}>수정</Button>
					<Button className="btn" variant="contained" color="error" onClick={onChangeMod}>취소</Button>
					<textarea
						value={updatedComment.content}
						onChange={(e) => { setUpdatedComment({ ...updatedComment, content: e.target.value }) }}
					/>
				</div>
				<hr />
			</>
		);

	} else {
		return (
			<>
				<div className={comment.recoNum ? 'commentRecoList' : 'commentList'} >
					{comment.deleted ?
						// 삭제된 댓글인 경우
						<p> ===== 삭제된 댓글입니다. ===== </p>
						:
						// 삭제되지 않은 경우
						<>
							{/* 댓글 표시 */}
							<div className="comments">
								{comment.recoNum !== null && (
									!getRecoCommIsDeleted(comment.recoNum) ?

										// 답글 대상 아이디 표시
										<p className="recoMember">
											답글대상 : {comment.recoMemId}
										</p>
										:
										// 답글 대상의 글이 삭제된 경우
										<p className="recoMember"> --- 삭제된 댓글의 답변 입니다. --- </p>
								)}
								<span className="creater">
									{comment.memId}
									{(boardMemId !== undefined && boardMemId === comment.memId) && (
										<span className="ownerComm">작성자</span>
									)}
								</span>
								<span className="create-date">{comment.date}</span>

								<p className="content">{comment.content}</p>
							</div>

							{/* 답글 버튼(로그인 필요) */}
							{isLogin === true ?
								<Button
									className="btn"
									variant="contained"
									onClick={() => { setRecoTarget(comment.coNum) }}
								>
									답글
								</Button>
								:
								<></>
							}

							{/* 수정 버튼(댓글 작성자 본인만 가능) */}
							{isOwnerComm ?
								<Button
									className="btn"
									variant="contained"
									onClick={onChangeMod}
								>
									수정
								</Button>
								: <></>
							}

							{/* 삭제 버튼(작성자, 게시판 소유자인 경우) */}
							{(isOwner || isOwnerComm) === true ?
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
				</div >
				<hr /></>
		);
	}
}

export default Comment;