import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/authSlice";

function Navbar() {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function Logout() {
    if (user) {
      axios
        .post(
          "https://medicalstore.mashupstack.com/api/logout",
          {},
          {
            headers: { Authorization: "Bearer " + user.token },
          }
        )
        .then(() => {
          dispatch(removeUser());
          navigate("/login");
        })
        .catch((error) => {
          console.log("Logout error");
        });
    }
  }

  return (
    <nav style={styles.navbar} className="navbar navbar-expand-sm">
      <div style={styles.navbarBrand} className="navbar-brand">
        <h4>My Medicine</h4>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarNav"
        style={styles.navbarCollapse}
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink to={"/"} className="nav-link" style={styles.navLink}>
              Sign Up
            </NavLink>
          </li>
          {user ? (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={styles.navLink}
                onClick={Logout}
              >
                Logout
              </NavLink>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink
                to={"/login"}
                className="nav-link"
                style={styles.navLink}
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: "linear-gradient(135deg, #72edf2 10%, #5151e5 100%)",
    fontFamily: "'Poppins', sans-serif",
    padding: "0.5rem 1rem",
  },
  navbarBrand: {
    color: "#fff",
    fontWeight: "600",
    fontSize: "1.5rem",
  },
  navbarCollapse: {
    justifyContent: "flex-end",
  },
  navLink: {
    color: "#fff",
    fontWeight: "600",
    margin: "0 0.5rem",
    fontSize: "1rem",
    transition: "color 0.3s",
  },
};

export default Navbar;
