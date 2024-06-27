import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function attemptLogin() {
    axios
      .post("https://medicalstore.mashupstack.com/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        setErrorMessage("");
        const user = {
          email: email,
          token: response.data.token,
        };
        dispatch(setUser(user));
        navigate("/List");
      })
      .catch((error) => {
        if (error.response.data.errors) {
          setErrorMessage(Object.values(error.response.data.errors).join(""));
        } else if (error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Failed to login user. Please contact admin");
        }
      });
  }

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h1 style={styles.heading}>Login</h1>
          {errorMessage && <div style={styles.error}>{errorMessage}</div>}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button style={styles.submitButton} onClick={attemptLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(135deg, #72edf2 10%, #5151e5 100%)", // Gradient background
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
    padding: "2rem",
    borderRadius: "15px", // Rounded corners
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif", // Modern font
  },
  heading: {
    color: "#333",
    fontWeight: "600",
    fontSize: "2rem",
    marginBottom: "1.5rem",
  },
  error: {
    color: "#e74c3c",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
  formGroup: {
    marginBottom: "1.25rem",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "1rem",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  },
  submitButton: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#3498db",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Login;
