
const Birth = ({ birth }) => {

    return (
        <div className="birth">
            <span>생년월일 : </span>
            <input type="text" value={birth} readOnly={true} />
        </div>
    );
}

export default Birth;