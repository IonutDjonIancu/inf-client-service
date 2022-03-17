

const Navbar = ({ isLoggedIn }) => {

    isLoggedIn = true;

    if(isLoggedIn) {
        return(
            <div className="container m-0 p-0">
                <div className="row">
                    <p className="col-11">Profile stocks table</p>
                    <button className="col-1 btn btn-outline-secondary btn-sm">Logout</button>
                </div>
            </div>
        );
    } 
    


};


export default Navbar;