
const Name = ({ name }) => {

    return (
        <div className="pNum">
            <p>
                <span>이름 : </span>
                <input
                    type="text"
                    value={name}
                    readOnly={true}
                />
            </p>
        </div>
    );
}

export default Name;