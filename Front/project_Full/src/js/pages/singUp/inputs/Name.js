
const Name = ({ newUser, setNewUser }) => {

    const onChangeName = (e) => {
        setNewUser({ ...newUser, name: e.target.value });
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div className="pNum">
            <p>
                <span>이름 : </span>
                <input
                    type="text"
                    onChange={onChangeName}
                />
            </p>
        </div>
    );
}

export default Name;