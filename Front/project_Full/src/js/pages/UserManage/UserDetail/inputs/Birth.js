
const Birth = ({ birth }) => {

    return (
        <>
            <span>생년월일 : </span>
            <input type="text" value={birth} readOnly={true} />
        </>
    );
}

export default Birth;