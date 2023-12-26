import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlackDetail } from "./useBlackDetail";

const BlackDetail = () => {

    const navigate = useNavigate();

    // 확인하고자 하는 회원 아이디
    const { blackNum } = useParams();

    // 회원 정보
    const [blackDetail, setBlackDetail] = useState({
        memId: '',
        banDate: '',
        reason: '',

    });

    const { getBlackDetail, updateBlack, deleteBlack } = useBlackDetail();

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    useEffect(() => {
        getBlackDetail(blackNum).then(result => {
            console.log(result);

            if (!result) { alert('데이터가 없습니다.'); navigate(`/blacklist`); }

            setBlackDetail(result)
        });
    }, [blackNum]);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 회원 정보 변경 하기
    const onUpdate = async () => {

        if (!window.confirm('수정하시겠습니까?')) { return; }

        updateBlack(blackDetail).then((res) => {

            if (res) {
                alert('수정 완료되었습니다.');
                navigate(`/blackList`);
            } else {
                alert('수정에 실패했습니다.');
            }

        });

    }

    // 삭제하기
    const onDelete = async (memId) => {

        if (!window.confirm('정말로 삭제하시겠습니까? 다시 복구할수 없습니다!')) { return; }

        deleteBlack(memId).then((res) => {

            if (res) {
                alert('삭제가 완료되었습니다.');
                navigate(`/user`);
            } else {
                alert('삭제에 실패했습니다.');
            }

        });

    }

    const onChangeHandle = (text) => {

    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    if (blackDetail === undefined) {
        return <div>Loading...</div>
    } else {
        return (
            <div>

                <div>
                    <span>아이디 : </span>
                    <input type="text" value={blackDetail.memId} readOnly={true} />
                </div>

                <div>
                    <span>차단 일자 : </span>
                    <input type="text" value={blackDetail.banDate} readOnly={true} />
                </div>

                <div>
                    <span>사유 : </span>
                    <textarea value={blackDetail.reason} onChange={(e) => { onChangeHandle(e.target.value) }} />
                </div>

                <div>
                    <button className='btn-gray' onClick={() => { onUpdate(); }} >수정</button>
                    <button className='btn-red' onClick={() => { onDelete(blackDetail.blackNum); }} >삭제</button>
                </div>
            </div>
        );
    }
}

export default BlackDetail;