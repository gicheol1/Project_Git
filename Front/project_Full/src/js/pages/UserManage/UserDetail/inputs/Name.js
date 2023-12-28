
const Name = ({ name }) => {

    return (
        <>
            <span>이름 : </span>
            <input
                type="text"
                value={name}
                readOnly={true}
            />
        </>
    );
}

export default Name;