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

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div>
            <MemId setNewUser={setNewUser} />
            <PW setNewUser={setNewUser} />
            <Name setNewUser={setNewUser} />
            <PhonNum setNewUser={setNewUser} />
            <Birth setNewUser={setNewUser} />
            <Email setNewUser={setNewUser} />
            <Addr setNewUser={setNewUser} />
            <br />
            <Button onClick={onClickSginUp}>회원가입</Button>
        </div>
    );
}

export default SingUp;