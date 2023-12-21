
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./useLogin";

const Login = ({ setIsLogin }) => {

    const navigate = useNavigate();

    const { login } = useLogin();

    // 입력한 아이디, 비밀번호
    const [account, setAccount] = useState({
        memId: '',
        pw: ''
    });

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    // 로그인 버튼 클릭시
    const onClickHandle = () => {

        login(account).then(res => {
            if (res) {
                setIsLogin(true);
                navigate('/', { replace: true });
            } else {
                alert('아이니다 빌번호를 다시 입력하세요');
                setIsLogin(false);
            }
        })


    };

    // ----- ----- ----- ----- ----- ----- ----- ----- -----

    const goSingUp = () => {
        navigate('/agreement', { replace: true })
    }

    const goFindAccount = () => {
        navigate('/findAccount', { replace: true })
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <Stack
            direction='column'
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <div>
                <Stack
                    direction='column'
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="아이디"
                        name="memId"
                        onChange={(e) => {
                            setAccount({ ...account, [e.target.name]: e.target.value })
                        }}
                    />
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="비밀번호"
                        name="pw"
                        onChange={(e) => {
                            setAccount({ ...account, [e.target.name]: e.target.value })
                        }}
                    />
                    <Button
                        variant="contained"
                        onClick={onClickHandle}
                    >
                        로그인
                    </Button>
                </Stack>
            </div>

            <Typography variant="h6" component="h5">
                <Button onClick={goSingUp}>회원 가입</Button>
                <Button onClick={goFindAccount}>아이디/비밀번호 찾기</Button>
            </Typography>
        </Stack>

    );
}

export default Login;