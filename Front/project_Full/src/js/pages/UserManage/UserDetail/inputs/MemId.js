
const MemId = ({ memId }) => {

    return (
        <>
            <span>아이디 : </span>
            <input
                type="text"
                value={memId}
                disabled={true}
            />
        </>
    );
}

export default MemId;