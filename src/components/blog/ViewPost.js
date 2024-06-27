import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  cardHeader: {
    fontSize: "1.5rem",
    marginBottom: "0.75rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "red",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "1rem",
  },
};

function ViewPost() {
  const user = useSelector((store) => store.auth.user);
  const { postId } = useParams();
  const [post, setPost] = useState({ name: "", company: "", expiry_date: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setPost(response.data);
      });
  }, [postId, user.token]);

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
              <div className="card" style={styles.card}>
                <div className="card-header" style={styles.cardHeader}>
                  <h3>{post.name}</h3>
                </div>
                <div className="card-body">
                  <p>
                    <strong>Company:</strong> {post.company}
                  </p>
                  <p>
                    <strong>Expiry Date:</strong> {post.expiry_date}
                  </p>
                  <div style={styles.buttonContainer}>
                    <button style={styles.button} onClick={handleBackClick}>
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ViewPost);
