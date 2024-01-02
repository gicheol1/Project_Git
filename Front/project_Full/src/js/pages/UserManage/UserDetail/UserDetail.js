import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MemId from "./inputs/MemId";
import PW from "./inputs/PW";
import Name from "./inputs/Name";
import PhonNum from "./inputs/PhonNum";
import Birth from "./inputs/Birth";
import Email from "./inputs/Email";
import Addr from "./inputs/Addr";

import { Button } from "@mui/material";

import { useUserDetail } from './useUserDetail';

import './UserDetail.css'
import profileImage from './profile-image.png'; // 이미지 파일 임포트

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

    // const onShow = () => { console.log(userDetail); }

    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
    // ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

    if (userDetail === undefined) {
        return <div>Loading...</div>
    } else {
        return (
            <div className="detailContainer">
                <div style={{ display: 'flex', marginLeft: '30px' }}>
                    <img src={profileImage} alt="Profile" className="profile-image" />
                    <div style={{ marginLeft: '30px', marginTop: '5px' }}>
                        <Button variant="contained"> 이미지 수정 </Button>
                    </div>
                </div>

                <br /><h3 style={{ textAlign: 'center' }}>회원정보 수정</h3><br />

                <MemId memId={userDetail.memId} /><hr />
                <PW newUser={userDetail} setNewUser={setUserDetail} /><hr />
                <Name name={userDetail.name} /><hr />
                <PhonNum phonNum={userDetail.phonNum} newUser={userDetail} setNewUser={setUserDetail} /><hr />
                <Birth birth={userDetail.birth} /><hr />
                <Email email={userDetail.email} newUser={userDetail} setNewUser={setUserDetail} /><hr />
                <Addr newUser={userDetail} setNewUser={setUserDetail}
                    addrRoad={userDetail.addrRoad}
                    addrJibun={userDetail.addrJibun}
                    addrCode={userDetail.addrCode}
                    addrOther={userDetail.addrOther}
                /><hr />
                <div>
                    <span>가입일 : </span>
                    <input type="text" value={userDetail.singupDate} disabled={true} />
                </div>
                <br />
                <div style={{ textAlign: 'center' }}>
                    <Button variant="contained" onClick={() => { onUpdate(); }} >수정</Button>
                    <Button variant="contained" color="error" style={{ marginLeft: '10px' }} onClick={() => { onDelete(userDetail.memId); }} >삭제</Button>
                </div>
                {/* <Button variant="contained" onClick={() => { onShow(); }} >데이터 확인</Button> */}
            </div>
        );
    }
}

export default UserDetail;