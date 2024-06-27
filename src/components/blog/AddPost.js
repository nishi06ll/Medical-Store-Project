import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";

const styles = {
  container: {
    background: "linear-gradient(135deg, #72edf2 10%, #5151e5 100%)",
    height: "91vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem 0",
    fontFamily: "'Poppins', sans-serif",
    color: "#333",
  },
  contentContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
    margin: "0 auto",
    boxSizing: "border-box",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#3498db",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  backButton: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "red",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginRight: "1rem",
  },
};

function AddPost() {
  const user = useSelector((store) => store.auth.user);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const navigate = useNavigate();

  function addPost() {
    axios
      .post(
        "https://medicalstore.mashupstack.com/api/medicine",
        { name: name, company: company, expiry_date: expiryDate },
        { headers: { Authorization: "Bearer " + user.token } }
      )
      .then((response) => {
        navigate("/list");
      });
  }

  const handleBackClick = () => {
    navigate("/list");
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div className="container mt-4" style={styles.contentContainer}>
          <div className="row justify-content-center">
            <div className="col-12">
              <h1 className="text-center mb-4">Add Medicine</h1>
              <div className="form-group" style={styles.formGroup}>
                <label style={styles.label}>Medicine Name:</label>
                <input
                  type="text"
                  className="form-control"
                  style={styles.input}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="form-group" style={styles.formGroup}>
                <label style={styles.label}>Company:</label>
                <input
                  type="text"
                  className="form-control"
                  style={styles.input}
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                />
              </div>
              <div className="form-group" style={styles.formGroup}>
                <label style={styles.label}>Expiry Date:</label>
                <input
                  type="text"
                  className="form-control"
                  style={styles.input}
                  value={expiryDate}
                  onChange={(event) => setExpiryDate(event.target.value)}
                />
              </div>
              <div className="form-group text-center">
                <button
                  className="btn"
                  style={styles.backButton}
                  onClick={handleBackClick}
                >
                  Back
                </button>
                <button
                  className="btn btn-primary"
                  style={styles.button}
                  onClick={addPost}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(AddPost);
