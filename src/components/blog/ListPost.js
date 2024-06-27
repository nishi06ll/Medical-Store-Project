import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import DeleteListitem from "./DeleteListitem";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";
import "./Listposts.css";
const styles = {
  container: {
    background: "linear-gradient(135deg, #72edf2 10%, #5151e5 100%)",
    minHeight: "100vh",
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
    maxWidth: "1000px",
    textAlign: "center",
    margin: "0 auto",
    boxSizing: "border-box",
  },
  searchBox: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "1px solid #ddd",
  },
  searchButton: {
    marginLeft: "10px",
    borderRadius: "10px",
    border: "none",
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    backgroundColor: "#3498db",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  addButton: {
    backgroundColor: "#69cde6",
    color: "#fff",
    fontSize: "1rem",
    padding: "0.75rem 4rem",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  addLink: {
    color: "#fff",
    textDecoration: "none",
  },
};

function Listposts() {
  const user = useSelector((store) => store.auth.user);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchPost, setSearchPost] = useState("");

  const fetchPosts = useCallback(() => {
    if (user) {
      axios
        .get("https://medicalstore.mashupstack.com/api/medicine", {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          setPosts(response.data);
          setFilteredPosts(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch posts:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearchChange = (event) => {
    setSearchPost(event.target.value);
  };

  const handleSearchClick = (event) => {
    event.preventDefault();
    if (searchPost.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filteredItems = posts.filter(
        (item) =>
          item.name &&
          item.name.toLowerCase().includes(searchPost.toLowerCase())
      );
      setFilteredPosts(filteredItems);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div className="container mt-4" style={styles.contentContainer}>
          <div className="row justify-content-center">
            <div className="col-md-12 p-4">
              <form className="form-inline justify-content-center mb-4">
                <div className="form-group mx-sm-3 mb-2">
                  <input
                    type="text"
                    className="form-control"
                    style={styles.searchBox}
                    value={searchPost}
                    onChange={handleSearchChange}
                    placeholder="💉 Search..."
                  />
                  <button
                    className="btn"
                    style={styles.searchButton}
                    onClick={handleSearchClick}
                  >
                    Search
                  </button>
                </div>
              </form>
              <h1 className="text-center my-4">💊 Medicine List</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 p-3">
              <div className="text-center mb-4">
                <button className="btn" style={styles.addButton}>
                  <Link to="/add" style={styles.addLink}>
                    Add Medicine
                  </Link>
                </button>
              </div>
              {filteredPosts.length === 0 ? (
                <h3 className="text-center">No matching posts found.</h3>
              ) : (
                filteredPosts.map((post) => (
                  <DeleteListitem
                    key={post.id}
                    post={post}
                    refresh={fetchPosts}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(Listposts);
