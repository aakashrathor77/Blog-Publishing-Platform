
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./BlogDetails.css";

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "General",
    coverImage: ""
  });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isOwner =
    blog?.author?._id &&
    user &&
    (blog.author._id === user._id || blog.author._id === user.id);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/blogs/${id}`
      );

      const data = response.data.blog || response.data;
      setBlog(data);

      setFormData({
        title: data.title || "",
        content: data.content || "",
        excerpt: data.excerpt || "",
        category: data.category || "General",
        coverImage: data.coverImage || ""
      });
    } catch (err) {
      console.error(err);
      setError("Unable to load this blog.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBlog(response.data.blog || {
        ...blog,
        ...formData
      });

      setEditing(false);
      alert("Blog updated successfully!");
      await fetchBlog();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to update blog.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/blogs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Blog deleted successfully!");
      navigate("/blogs");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to delete blog.");
    }
  };

  if (loading) {
    return <p className="detail-status">Loading article...</p>;
  }

  if (error || !blog) {
    return (
      <div className="detail-status">
        <h2>{error || "Blog not found"}</h2>
        <Link to="/blogs">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <nav className="detail-navbar">
        <Link to="/" className="logo">
          Blog<span>Space.</span>
        </Link>

        <Link to="/blogs" className="back-link">
          ← Back to Blogs
        </Link>
      </nav>

      <article className="article-container">
        {editing ? (
          <form className="edit-blog-form" onSubmit={handleUpdate}>
            <h2>Edit Your Blog</h2>

            <label>Blog Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label>Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
            />

            <label>Short Description</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              maxLength={300}
            />

            <label>Cover Image URL</label>
            <input
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
            />

            <label>Blog Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="12"
              required
            />

            <div className="edit-actions">
              <button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                className="cancel-edit"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <span className="article-category">{blog.category}</span>

            <h1>{blog.title}</h1>

            <div className="article-meta">
              <span>By {blog.author?.name || "Unknown Author"}</span>
              <span>
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
            </div>

            {blog.coverImage && (
              <img
                className="article-cover"
                src={blog.coverImage}
                alt={blog.title}
              />
            )}

            {blog.excerpt && (
              <p className="article-excerpt">{blog.excerpt}</p>
            )}

            <div className="article-content">
              {blog.content}
            </div>

            {isOwner && (
              <div className="owner-actions">
                <button onClick={() => setEditing(true)}>
                  Edit Blog
                </button>

                <button className="delete-blog-btn" onClick={handleDelete}>
                  Delete Blog
                </button>
              </div>
            )}

            <Link to="/blogs" className="article-back-button">
              ← Explore More Blogs
            </Link>
          </>
        )}
      </article>
    </div>
  );
}

export default BlogDetails;
