import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFestivalDetail } from "./useFestivalDetail";
import { Button } from "@mui/material";

const FestivalDetail = () => {

    const navigate = useNavigate();

    // 축제 번호
    const { festivalNum } = useParams();

    // 축제 상세 정보
    const [detail, setDetail] = useState();

    const { getFestivalDetail, deleteFestival } = useFestivalDetail();

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    useEffect(() => {
        getFestivalDetail(festivalNum).then(res => {

            if (res === false) {
                alert('데이터가 없습니다.');
                navigate('/festivalList');
            }

            setDetail(res);
        });
    }, [festivalNum]);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦



    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    if (detail === undefined) {
        return <div>Loading...</div>
    } else {
        return (
            <div>

                <div style={{ display: 'flex' }}>
                    <div style={{ flex: '1' }}>
                        <p>축제명 : {detail.name}</p>
                        <p>등록일 : {detail.singDate}</p>
                    </div>

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
                        onClick={() => deleteFestival()}
                    >
                        삭제하기
                    </Button>
                </div>
                <hr />
                <p>{detail.content}</p>
                <hr />
                <div>
                    <p>시작 날짜 : {detail.startDate}</p>
                    <p>종료 날짜 : {detail.endDate}</p>
                    {detail.officialWebsite !== null && detail.officialWebsite !== '' && (<p>공식 사이트 : {detail.officialWebsite}</p>)}
                </div>
                <hr />
                <div>
                    <p>태그 : {detail.tag}</p>
                    <p>지역 : {detail.region}</p>
                </div>
            </div>
        );
    }
}

export default FestivalDetail;