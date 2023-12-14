import { SERVER_URL } from "js";

export function useSingUp() {

    // ----- 회원 가입 -----
    const singUp = (newUser) => {
        fetch(SERVER_URL + '/singUp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)

        }).then((response) => {
            if (response.ok) {
                alert('회원 가입이 완료되었습니다.');

            } else {
                throw new Error(response.status);
            }
        }).catch((e) => {
            alert(e);

        })
    }

    return { singUp }
}