
const MemId = ({ memId }) => {

    return (
        <div>
            <span>아이디 : </span>
            <input
                type="text"
                value={memId}
                readOnly={true}
            />
        </div>
    );
}

export default MemId;