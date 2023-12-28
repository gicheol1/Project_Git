import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import './Agreement.css'

const agree_text1 =
    " - 제 1조(목적)\n" +
    "이 약관은 홈페이지에서 제공하는 서비스를 제공 받을 수 있는지 기본적인 신원을 조회하기 위함 입니다.\n\n" +
    " - 제 n조" +
    "\n...";
const agree_text2 =
    " - 제 1조(목적)\n" +
    "이 약관은 사용자의 정보를 바탕으로 G*****의 생명 연장을 위한 여러 **같은 광고들을 출력하기 위한 허가 입니다.\n\n" +

    " - 제 n조\n" +
    "Heros of ****, Age of ****, 왕의 *등 이러한 광고를 제공받을 것을 것입니다.\n" +
    "왜냐고요? **세요.";

const Agreement = () => {

    const navigate = useNavigate();

    const [isAgreed, setIsAgreed] = useState({
        agree1: false,
        agree2: false,
    });

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    const onClickHandle = () => {
        if (!isAgreed.agree1) {
            alert('필수 이용 내역을 동의해야 합니다.');
            return;
        }

        navigate('/singUp', { replace: true });
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div>
            <div className="agree-container">

                <div className="agree-title">
                    <p>이용 약관</p>
                    <textarea
                        value={agree_text1}
                        readOnly={true}
                    />
                </div>
                <div className="agree-checkBoxs">
                    <span>
                        위 사항을 읽었으며 동의합니다.
                    </span>
                    <input
                        type="checkbox"
                        name='agree1'
                        checked={isAgreed.agree1}
                        onChange={(e) =>
                            setIsAgreed({ ...isAgreed, [e.target.name]: !isAgreed.agree1 })
                        }
                    />
                </div>

                <br />

                <div className="agree-title">
                    <p>게인정보 이용 동의 안내(선택)</p>
                    <textarea
                        value={agree_text2}
                        readOnly={true}
                    />
                </div>
                <div className="agree-checkBoxs">
                    <span>
                        위 사항을 읽었으며 맹세의 피로 서명합니다.
                    </span>
                    <input
                        type="checkbox"
                        name='agree2'
                        checked={isAgreed.agree2}
                        onChange={(e) =>
                            setIsAgreed({ ...isAgreed, [e.target.name]: !isAgreed.agree2 })
                        }
                    />
                </div>
            </div>

            <br />

            <Button
                onClick={onClickHandle}
                variant="contained"
            >
                동의하고 계속
            </Button>
        </div>
    );
}

export default Agreement;