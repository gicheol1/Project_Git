
const Birth = ({ birth }) => {

    return (
        <div className="birth">
            <span>생년월일 : </span>
            <input type="date" value={birth} />
        </div>
    );
}

export default Birth;