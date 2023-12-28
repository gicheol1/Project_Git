import { useState } from "react";

import { useNavigate } from "react-router-dom";

import MemId from "./inputs/MemId";
import PW from "./inputs/PW";
import Name from "./inputs/Name";
import PhonNum from "./inputs/PhonNum";
import Birth from "./inputs/Birth";
import Email from "./inputs/Email";
import Addr from "./inputs/Addr";

import { Button } from "@mui/material";
import { useSingUp } from "./useSingUp";

import './SingUp.css';

const SingUp = () => {

    const [newUser, setNewUser] = useState('');

    const { singUp } = useSingUp({
        memId: '',
        pw: '',
        name: '',
        phonNum: '',
        birth: '',
        email: '',
        addrRoad: '',
        addrJibun: '',
        addrCode: ''
    });

    const navigate = useNavigate();

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    const onClickSginUp = () => {
        singUp(newUser).then((res) => {
            if (res) {
                alert('회원 가입이 완료되었습니다.')
                navigate('/', { replace: true })
            } else {
                alert('회원 가입이 실패되었습니다. 다시시도하세요.');
            }
        });
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div style={{ marginTop: '50px', alignContent: 'center' }}>
            <MemId newUser={newUser} setNewUser={setNewUser} /><hr />
            <PW newUser={newUser} setNewUser={setNewUser} /><hr />
            <Name newUser={newUser} setNewUser={setNewUser} /><hr />
            <PhonNum newUser={newUser} setNewUser={setNewUser} /><hr />
            <Birth newUser={newUser} setNewUser={setNewUser} /><hr />
            <Email newUser={newUser} setNewUser={setNewUser} /><hr />
            <Addr newUser={newUser} setNewUser={setNewUser} />

            <Button
                variant="contained"
                onClick={onClickSginUp}
            >
                회원가입
            </Button>
        </div>
    );
}

export default SingUp;