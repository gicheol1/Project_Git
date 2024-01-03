import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFestivalDetail } from "./useFestivalDetail";
import { Button } from "@mui/material";

import './FestivalDetail.css';

const FestivalDetail = () => {

    const navigate = useNavigate();

    // 축제 번호
    const { festivalNum } = useParams();

    // 축제 상세 정보
    const [detail, setDetail] = useState();
    const [imgList, setImgList] = useState([]);

    const {
        getFestivalDetail,
        getFileFestival,

        deleteFestival,
        deleteFileFestival

    } = useFestivalDetail();

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    useEffect(() => {
        getFestivalDetail(festivalNum).then(res => {

            if (res === false) {
                alert('데이터가 없습니다.');
                navigate('/festivalList');
                return;
            }

            setDetail(res);

        });

        getFileFestival(festivalNum).then(res => {
            setImgList([...imgList, res]);
        })

    }, [festivalNum]);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦



    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    if (detail === undefined) {
        return <div>Loading...</div>
    } else {
        return (
            <div style={{ width: '50vw' }}>

                {/* 축제명, 등록일 / 수정,삭제 버튼 */}
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1' }}>
                        <p>축제명 : {detail.name}</p>
                        <p>등록일 : {detail.singDate}</p>
                    </div>

                    <div>
                        <Button
                            className="btn"
                            variant="contained"
                            onClick={() => navigate(`/festivals/${detail.festivalNum}`)}
                        >
                            수정하기
                        </Button>
                        <Button
                            className="btn"
                            variant="contained"
                            color="error"
                            onClick={async () => {
                                deleteFileFestival(festivalNum).then(() => {
                                    deleteFestival(festivalNum).then(() => {
                                        alert('삭제되었습니다.');
                                        navigate(`/festivalList`);
                                    });
                                });
                            }}
                        >
                            삭제하기
                        </Button>
                    </div>
                </div>

                <hr />

                {/* 이미지와 내용 */}
                {imgList !== undefined && imgList.length !== 0 ?
                    imgList.map((images, index) => (
                        images !== undefined ?
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
                <p>{detail.content}</p>

                <hr />

                {/* 축제 시작, 종료 날짜 */}
                <div>
                    <p>시작 날짜 : {detail.startDate}</p>
                    <p>종료 날짜 : {detail.endDate}</p>
                    {detail.officialWebsite !== null && detail.officialWebsite !== '' && (<p>공식 사이트 : {detail.officialWebsite}</p>)}
                </div>

                <hr />

                {/* 축제 태그, 지역 */}
                <div>
                    <p>태그 : {detail.tag}</p>
                    <p>지역 : {detail.region}</p>
                </div>
            </div>
        );
    }
}

export default FestivalDetail;