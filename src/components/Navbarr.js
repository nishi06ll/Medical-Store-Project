import { NavLink,useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { removeUser } from "../store/authSlice";

function Navbar() {
    var user = useSelector(store=>store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function Logout() {
        if(user){
            axios.post('https://medicalstore.mashupstack.com/api/logout',{},{
                headers:{'Authorization':"Bearer "+user.token}
            }).then(() => {
                dispatch(removeUser());
            navigate('/login')
            }).catch(error => {
                console.log("Logout error")
            })  
        }
    }
    return <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="navbar-brand">
            <h4>My Medicine</h4>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarNav" aria-controls="navbarNav"aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div
        className="collapse navbar-collapse mr-auto" id="navbarNav"  style={{ float: "left" }}>
            <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                {user?
                <li className="nav-item">
                <NavLink className="nav-link" onClick={Logout}>Logout</NavLink>
                </li>:
                <li className="nav-item">
                <NavLink to={"/login"} className={'nav-link '}>Login</NavLink>
                </li>
            }
            </ul>
        </div>
    </nav>;
}

export default Navbar;