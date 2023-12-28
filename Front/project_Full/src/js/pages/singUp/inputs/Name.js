
const Name = ({ newUser, setNewUser }) => {

    const onChangeName = (e) => {
        setNewUser({ ...newUser, name: e.target.value });
    }

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (
        <div style={{ display: 'flex' }}>
            <span className="inputLabel">이름 : </span>
            <input
                type="text"
                placeholder="이름"
                onChange={onChangeName}
            />
        </div>
    );
}

export default Name;