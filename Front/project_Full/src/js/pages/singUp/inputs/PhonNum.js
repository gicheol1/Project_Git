
const PNum = ({ newUser, setNewUser }) => {

    const onChangePW = (e) => {
        setNewUser({ ...newUser, phonNum: e.target.value });
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div className="pNum">
            <p>
                <span>전화번호 : </span>
                <input
                    type="text"
                    onChange={onChangePW}
                />
            </p>
        </div>
    );
}

export default PNum;