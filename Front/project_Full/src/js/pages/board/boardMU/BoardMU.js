
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './BoardMU.css';

import { Button } from '@mui/material';
import { useBoard } from './useBoardMU';
import { useCheckLogin } from 'js/useCheckLogin';

const BoardMU = ({ isLogin }) => {

    const navigate = useNavigate();
    const inputRef = useRef(null);

    // 게시판 종류(공통)와 글 번호(수정 할 때)
    const { target, boardNum } = useParams();

    const {
        getDetail,
        getFile,

        setFile,

        submitDetail,
        submitFile,

        deleteBoard,
        deleteFile
    } = useBoard();

    const { toLogin } = useCheckLogin();

    // 게시판 내용
    const [board, setBoard] = useState({
        boardNum: '',
        memId: '',
        title: '',
        content: '',
        date: '',
        privated: 'N'
    });

    // 버튼 비활성화 여부
    const [btnDisable, setBtnDisable] = useState(false);

    // 저장된 이미지
    const [imageList, setImageList] = useState([]);

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    useEffect(() => {

        // 로그인 상태가 아닌경우
        if (isLogin !== true) {
            toLogin();
            return;
        }

        // 게시판 번호가 존재하는 경우(수정)
        if (boardNum === undefined || boardNum === '') { setBtnDisable(false); return; }

        setBtnDisable(true);
        getDetail(target, boardNum).then((res) => { setBoard(res) });
        getFile(target, boardNum).then((res) => { setImageList(res); setBtnDisable(false); });

    }, [])

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    // 게시판 저장
    const onClickSetBoard = async () => {
        submitDetail(
            target, board, boardNum

        ).then((res) => {
            if (res !== undefined && res > 0) {
                submitFile(target, imageList, res);
            }

            alert('저장되었습니다.');
        });
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    const handleButtonClick = () => { inputRef.current.click(); };

    // 파일 추가 및 저장
    const handleFileChange = async (e) => {

        const selectedFiles = e.target.files;
        const imageFiles = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const fileType = file.type.toLowerCase();

            // 이미지 파일인지 확인 (이미지 파일 확장자: 'image/jpeg', 'image/png', 'image/gif', 등)
            if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif') {
                imageFiles.push(file);
            }
        }

        setBtnDisable(true);
        setFile(target, imageFiles, boardNum).then((res) => {
            setImageList(...imageList, res);
            setBtnDisable(false);
        })

    };

    // 선택한 파일 제거 함수
    const handleCancel = (indexTarget) => {

        const targetImg = imageList.find((images, index) => index === indexTarget)

        setBtnDisable(true);
        deleteFile(target, targetImg).then(() => {
            setBtnDisable(false);
        });

        setImageList(imageList.filter((images, index) => index !== indexTarget));
    }

    // 비공개 여부 변경 함수
    const handlePrivateChange = () => {
        setBoard({
            ...board,
            privated: board.privated === 'Y' ? 'N' : 'Y', // 'Y'와 'N'을 토글
        });
    };

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div className="board-detail-container">

            {board !== undefined && (
                <>
                    <div className="board-head">
                        <div className="board-div">
                            <span className="board-title">
                                제목: <input
                                    type='text'
                                    width={20}
                                    placeholder='제목을 입력하세요'
                                    value={board.title}
                                    onChange={(e) => { setBoard({ ...board, title: e.target.value }) }}
                                />
                            </span>
                        </div>

                        {/* 게시판 저장 버튼 */}
                        {boardNum === undefined || boardNum === '' ?
                            <>
                                <Button
                                    className="btn"
                                    variant="contained"
                                    disabled={btnDisable}
                                    onClick={onClickSetBoard}
                                >
                                    저장
                                </Button>
                                <Button
                                    className="btn"
                                    variant="contained"
                                    color="error"
                                    disabled={btnDisable}
                                    onClick={() => { if (window.confirm('정말로 취소하시겠 습니까?')) { navigate(`/boardList/${target}`); } }}
                                >
                                    취소
                                </Button>
                            </>
                            :
                            <>
                                <Button
                                    className="btn"
                                    variant="contained"
                                    disabled={btnDisable}
                                    onClick={onClickSetBoard}
                                >
                                    수정
                                </Button>
                                <Button
                                    className="btn"
                                    variant="contained"
                                    color="error"
                                    disabled={btnDisable}
                                    onClick={() => { deleteBoard(target, boardNum) }}
                                >
                                    삭제
                                </Button>
                            </>
                        }
                    </div>

                    <hr />

                    {/* 글 내용 */}
                    <div className="board-content">
                        <textarea
                            style={{ width: '100%', height: '200px', resize: 'none' }}
                            placeholder='내용을 입력하세요'
                            value={board.content}
                            onChange={(e) => { setBoard({ ...board, content: e.target.value }) }}
                        />
                    </div>

                    <hr />

                    {/* 첨부 파일 */}
                    <div className="board-file-container">
                        <div className="board-div">
                            <Button onClick={handleButtonClick}>파일 추가</Button>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                style={{ display: 'none' }}

                                // 해당 태그를 참조하는 변수 설정
                                ref={inputRef}
                            />

                            {/* 첨부한 파일들을 표시 */}
                            {imageList !== undefined && (
                                imageList.map((image, index) => (
                                    <div>
                                        <img
                                            key={`image ${index}`}
                                            alt={`image ${image.orgName}`}
                                            src={`data:image/png;base64,${image.imgFile}`}
                                            style={{ width: '150px', height: '150px' }}
                                        />
                                        <Button
                                            key={index}
                                            onClick={() => handleCancel(index)}
                                        >
                                            취소
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* 비공개 여부 */}
                        {target === 'qa' ?
                            <label>
                                비공개
                                <input
                                    type='checkbox'
                                    checked={board.privated === 'Y'}
                                    onChange={handlePrivateChange}
                                />
                            </label>
                            : <></>
                        }
                    </div>
                </>
            )}
        </div>
    );
}

export default BoardMU;