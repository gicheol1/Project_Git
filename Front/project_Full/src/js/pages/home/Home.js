const Home = ({ isLogin }) => {

    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====
    // ===== ===== ===== ===== ===== ===== ===== ===== =====

    return (

        <div>
            {isLogin === true ?
                `This is Home (Login)`
                :
                `This is Home (Not Login)`
            }
        </div>
    );
}

export default Home;