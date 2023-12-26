import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useUserDetail } from './useUserDetail';
import MemId from "./inputs/MemId";
import PW from "./inputs/PW";
import Name from "./inputs/Name";
import PhonNum from "./inputs/PhonNum";
import Birth from "./inputs/Birth";
import Email from "./inputs/Email";
import Addr from "./inputs/Addr";

const UserDetail = () => {

    const navigate = useNavigate();

    // 확인하고자 하는 회원 아이디
    const { memId } = useParams();

    // 회원 정보
    const [userDetail, setUserDetail] = useState();

    const { getUserDetail, updateUser, deleteUser } = useUserDetail();

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    useEffect(() => {
        getUserDetail(memId).then(result => {
            console.log(result);

            if (!result) { alert('데이터가 없습니다.'); navigate(`/user`); }

            setUserDetail(result)
        });
    }, [memId]);

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    // 회원 정보 변경 하기
    const onUpdate = async () => {

        if (!window.confirm('수정하시겠습니까?')) { return; }

        updateUser(userDetail).then((res) => {

            if (res) {
                alert('수정 완료되었습니다.');
                navigate(`/user`);
            } else {
                alert('수정에 실패했습니다.');
            }

        });

    }

    // 삭제하기
    const onDelete = async (memId) => {

        if (!window.confirm('정말로 삭제하시겠습니까? 다시 복구할수 없습니다!')) { return; }

        deleteUser(memId).then((res) => {

            if (res) {
                alert('삭제가 완료되었습니다.');
                navigate(`/user`);
            } else {
                alert('삭제에 실패했습니다.');
            }

        });

    }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    if (userDetail === undefined) {
        return <div>Loading...</div>
    } else {
        return (
            <div>
                <MemId memId={userDetail.memId} />
                <PW newUser={userDetail} setNewUser={setUserDetail} />
                <Name name={userDetail.name} />
                <PhonNum phonNum={userDetail.phonNum} newUser={userDetail} setNewUser={setUserDetail} />
                <Birth birth={userDetail.birth} />
                <Email email={userDetail.email} newUser={userDetail} setNewUser={setUserDetail} />
                <Addr newUser={userDetail} setNewUser={setUserDetail}
                    addrRoad={userDetail.addrRoad}
                    addrJibun={userDetail.addrJibun}
                    addrCode={userDetail.addrCode}
                    addrOther={userDetail.addrOther}
                />
                <div>
                    <label htmlFor="singupDate">가입일 : </label>
                    <input type="text" value={userDetail.singupDate} />
                </div>
                <div>
                    <button className='btn-gray' onClick={() => { onUpdate(); }} >수정</button>
                    <button className='btn-red' onClick={() => { onDelete(userDetail.memId); }} >삭제</button>
                </div>
            </div>
        );
    }
}

export default UserDetail;