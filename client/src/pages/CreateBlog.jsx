
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./CreateBlog.css";

function CreateBlog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "Technology",
    coverImage: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      await API.post("/blogs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/blogs");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to publish blog."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-blog-page">
      <nav className="create-blog-nav">
        <Link to="/" className="logo">
          Blog<span>Space.</span>
        </Link>
        <Link to="/blogs" className="back-link">
          ← Back to Blogs
        </Link>
      </nav>

      <div className="create-blog-container">
        <div className="create-blog-heading">
          <span>SHARE YOUR KNOWLEDGE</span>
          <h1>Create a New Story</h1>
          <p>Turn your ideas into something worth reading.</p>
        </div>

        <form className="create-blog-form" onSubmit={handleSubmit}>
          <label>Blog Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter an interesting title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Technology</option>
            <option>Web Development</option>
            <option>Programming</option>
            <option>Education</option>
            <option>Lifestyle</option>
            <option>Business</option>
            <option>General</option>
          </select>

          <label>Short Description</label>
          <textarea
            name="excerpt"
            placeholder="Write a short summary of your blog..."
            value={formData.excerpt}
            onChange={handleChange}
            maxLength={300}
            rows={3}
          />

          <label>Cover Image URL (Optional)</label>
          <input
            type="url"
            name="coverImage"
            placeholder="https://example.com/image.jpg"
            value={formData.coverImage}
            onChange={handleChange}
          />

          <label>Blog Content</label>
          <textarea
            className="blog-content-input"
            name="content"
            placeholder="Start writing your story here..."
            value={formData.content}
            onChange={handleChange}
            rows={12}
            required
          />

          {message && <p className="create-blog-message">{message}</p>}

          <div className="create-blog-actions">
            <Link to="/blogs" className="cancel-btn">
              Cancel
            </Link>

            <button type="submit" disabled={loading}>
              {loading ? "Publishing..." : "Publish Blog →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;
