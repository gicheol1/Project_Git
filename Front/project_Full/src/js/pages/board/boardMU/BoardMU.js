
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './BoardMU.css';

import { Button } from '@mui/material';
import { useBoard } from './useBoardMU';
import { useCheckLogin } from 'js/useCheckLogin';

const BoardMU = ({ isLogin }) => {

    const navigate = useNavigate();
    const inputRef = useRef(null);

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
    const [imgList, setImgList] = useState([]);

    // 게시판 종류(공통)와 글 번호(수정 할 때)
    const { target, boardNum } = useParams();

    const {
        getDetail,
        getFile,

        encodeFile,

        submitDetail,
        submitFile,

        deleteBoard,
        deleteFile,
        deleteAllFile
    } = useBoard();

    const { toLogin } = useCheckLogin();

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    useEffect(() => {

        // 로그인 상태가 아닌경우
        if (!isLogin) { toLogin(); return; }

        // 게시판 번호가 존재하는 경우(수정)
        if (boardNum !== undefined && boardNum !== '') {
            setBtnDisable(true);
            getDetail(target, boardNum).then((res) => { setBoard(res) });
            getFile(target, boardNum).then((res) => { setImgList(res); setBtnDisable(false); });
            setBtnDisable(false)
        }

    }, [])

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 게시판 저장
    const onCreateBoard = async () => {

        const saveBoard = async () => {
            submitDetail(target, board, boardNum).then((res) => {

                if (res !== undefined) {

                    // 실패한 경우(false)
                    if (!res) { toLogin(); return; }

                    // console.log(imgList);

                    // 성공시 
                    if (res > 0) { submitFile(target, imgList, res); }
                }

            });
        }

        // 버튼 비활성화
        setBtnDisable(true);

        saveBoard();

        // 버튼 활성화
        setBtnDisable(false);
    }

    // 게시판 삭제
    const onDeleteBoard = async () => {

        if (!window.confirm('정말로 게시판을 삭제하시겠습니까? 다시 복구할 수 없습니다!')) { return; }

        let boardDeleted = false;
        let imageDeleted = false;

        // 버튼 비활성화
        setBtnDisable(true);

        deleteBoard(target, boardNum).then(res => boardDeleted = res);
        deleteAllFile(target, boardNum).then(res => imageDeleted = res);

        if (!boardDeleted) { alert('삭제에 실패했습니다.'); return; }
        else if (!imageDeleted) { alert('이미지 삭제에 실패했습니다.'); return; }

        else { alert('게시판을 삭제했습니다.'); navigate(`/boardList/${target}`); }

        // 버튼 활성화
        setBtnDisable(false);
    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 파일 추가 버튼 클릭시
    const handleButtonClick = () => { inputRef.current.click(); };

    // 파일 추가 및 저장
    const handleFileChange = async (e) => {

        const selectedFiles = e.target.files;
        const imageFiles = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const fileType = file.type.toLowerCase();

            // 이미지 파일인지 확인 (이미지 파일 확장자: 'image/jpeg', 'image/png', 'image/gif', 등)
            if (
                fileType === 'image/jpg' ||
                fileType === 'image/jpeg' ||
                fileType === 'image/png' ||
                fileType === 'image/gif'
            ) { imageFiles.push(file); }
        }

        // 비동기 처리를 위한 내부 함수
        const encodeImageFiles = async () => {
            for (const imgFile of imageFiles) {
                const res = await encodeFile(target, imgFile);
                setImgList(prevList => [...prevList, res]);
            }
        };

        setBtnDisable(true);
        encodeImageFiles();
        setBtnDisable(false);
    };

    // 선택한 파일 제거 함수
    const handleCancel = async (indexTarget) => {

        const deleteOneFile = async () => {
            deleteFile(target, boardNum, imgList.find((images, index) => index !== indexTarget)).then(() => {
                setImgList(imgList.filter((images, index) => index !== indexTarget));
            });
        }

        setBtnDisable(true);
        deleteOneFile();
        setBtnDisable(false);

    }

    // 비공개 여부 변경 함수
    const handlePrivateChange = () => {
        setBoard({
            ...board,
            privated: board.privated === 'Y' ? 'N' : 'Y', // 'Y'와 'N'을 토글
        });
    };

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

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

                        {/* 게시판 저장(수정) / 취소(삭제) 버튼 */}
                        {boardNum === undefined || boardNum === '' ?
                            <>
                                <Button
                                    className="btn"
                                    variant="contained"
                                    disabled={btnDisable}
                                    onClick={onCreateBoard}
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
                                    onClick={onCreateBoard}
                                >
                                    수정
                                </Button>
                                <Button
                                    className="btn"
                                    variant="contained"
                                    color="error"
                                    disabled={btnDisable}
                                    onClick={onDeleteBoard}
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
                            {imgList !== undefined && (
                                imgList.map((image, index) => (
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