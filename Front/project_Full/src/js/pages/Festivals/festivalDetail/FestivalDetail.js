import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFestivalDetail } from "./useFestivalDetail";

const FestivalDetail = () => {

    // 축제 번호
    const { fNum } = useParams();

    // 축제 상세 정보
    const [detail, setDetail] = useState();

    const { getFestivalDetail } = useFestivalDetail();

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    useEffect(() => {
        getFestivalDetail(fNum).then(res => setDetail(res));
    }, [fNum]);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    return (
        <div>
            {detail !== undefined ?
                <>
                    <p>축제명 : {detail.name}</p>
                    <p>설명 : {detail.content}</p>
                    <p>시작 날짜 : {detail.startDate}</p>
                    <p>종료 날짜 : {detail.endDate}</p>
                    <p>등록일 : {detail.singDate}</p>
                    <p>공식 사이트 : {detail.officialWebsite}</p>
                    <p>태그 : {detail.tag}</p>
                    <p>지역 : {detail.region}</p>
                </>
                :
                <></>
            }
        </div>
    );
}

export default FestivalDetail;