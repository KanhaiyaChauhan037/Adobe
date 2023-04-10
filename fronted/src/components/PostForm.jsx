import React, { useState } from "react";
import axios from "axios";

const PostForm = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    content: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/posts/posts",
        formData
      );
      setFormData({ user_id: "", content: "" });
      setSuccessMessage(res.data.message);
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.error);
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="user_id">User ID</label>
        <input
          type="text"
          className="form-control"
          id="user_id"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          className="form-control"
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Create Post
      </button>
      {errorMessage && (
        <div className="alert alert-danger mt-3">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="alert alert-success mt-3">{successMessage}</div>
      )}
    </form>
  );
};

export default PostForm;
