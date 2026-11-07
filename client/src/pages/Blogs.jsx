
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./Blogs.css";

function Blogs() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await API.get("/blogs");
        setBlogs(response.data.blogs || []);
      } catch (err) {
        setError("Unable to load blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="blogs-page">
      <nav className="blogs-navbar">
        <Link to="/" className="logo">
          Blog<span>Space.</span>
        </Link>

        <div className="blogs-nav-links">
          <Link to="/">Home</Link>
          <Link to="/blogs">Explore Blogs</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <section className="blogs-hero">
        <span>THE BLOGSPACE COMMUNITY</span>
        <h1>Discover Stories & Ideas.</h1>
        <p>
          Explore inspiring articles and fresh perspectives from our community.
        </p>
        <Link to="/create-blog" className="create-blog-btn">
          + Write a Blog
        </Link>
      </section>

      <section className="blogs-content">
        <div className="blogs-heading">
          <div>
            <span>OUR COLLECTION</span>
            <h2>Latest Stories</h2>
          </div>
          <p>{blogs.length} Articles</p>
        </div>

        {loading && <p className="blogs-status">Loading blogs...</p>}
        {error && <p className="blogs-status">{error}</p>}

        {!loading && !error && blogs.length === 0 && (
          <div className="empty-blogs">
            <h3>No blogs published yet.</h3>
            <p>Be the first to share your story with the community.</p>
            <Link to="/create-blog">Create Your First Blog</Link>
          </div>
        )}

        <div className="blogs-grid">
          {blogs.map((blog) => (
            <Link
              to={`/blogs/${blog._id}`}
              className="blog-card-link"
              key={blog._id}
            >
              <article className="blog-card">
                {blog.coverImage ? (
                  <img src={blog.coverImage} alt={blog.title} />
                ) : (
                  <div className="blog-placeholder">✍</div>
                )}

                <div className="blog-card-body">
                  <span className="blog-category">{blog.category}</span>
                  <h3>{blog.title}</h3>
                  <p>
                    {blog.excerpt || blog.content.slice(0, 130) + "..."}
                  </p>

                  <div className="blog-card-footer">
                    <span>By {blog.author?.name || "Unknown Author"}</span>
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <span className="read-more">Read Article →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Blogs;
