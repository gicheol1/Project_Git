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

    const { singUp } = useSingUp();

    const navigate = useNavigate();

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    const onClickSginUp = () => {
        singUp(newUser).then((res) => {
            if (res.success) {
                navigate('/', { replace: true })
            } else {
                alert(res.error);
            }
        });
    }

    const onShow = () => {
        console.log(newUser);
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div>
            <MemId newUser={newUser} setNewUser={setNewUser} />
            <PW newUser={newUser} setNewUser={setNewUser} />
            <Name newUser={newUser} setNewUser={setNewUser} />
            <PhonNum newUser={newUser} setNewUser={setNewUser} />
            <Birth newUser={newUser} setNewUser={setNewUser} />
            <Email newUser={newUser} setNewUser={setNewUser} />
            <Addr newUser={newUser} setNewUser={setNewUser} />
            <br />
            <Button onClick={onClickSginUp}>회원가입</Button>
            <Button onClick={onShow}>데이터 확인</Button>
        </div>
    );
}

export default SingUp;