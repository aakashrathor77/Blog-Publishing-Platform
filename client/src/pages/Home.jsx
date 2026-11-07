
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <nav className="navbar">
        <Link to="/" className="logo">
          Blog<span>Space.</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="#featured">Explore</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="login-btn">
            Log In
          </Link>
          <Link to="/register" className="signup-btn">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">WELCOME TO BLOGSPACE</span>

          <h1>
            Where Every Story
            <br />
            Finds Its <span>Voice.</span>
          </h1>

          <p>
            Discover inspiring stories, share your ideas, and connect
            with a community of passionate writers.
          </p>

          <div className="hero-buttons">
            <Link to="/blogs" className="primary-btn">
              Explore Blogs →
            </Link>

            <Link to="/login" className="secondary-btn">
              Start Writing
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <h3>01</h3>
              <p>Share Ideas</p>
            </div>

            <div>
              <h3>02</h3>
              <p>Read Stories</p>
            </div>

            <div>
              <h3>03</h3>
              <p>Build Community</p>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900"
            alt="Writing desk with notebook"
          />

          <div className="image-card">
            <span>✦</span>
            <div>
              <strong>Your Ideas Matter</strong>
              <p>Start sharing your stories</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section" id="featured">
        <div className="section-heading">
          <span>DISCOVER SOMETHING NEW</span>
          <h2>Stories Worth Reading.</h2>
          <p>
            Explore ideas, experiences, and perspectives from writers.
          </p>
        </div>

        <div className="featured-card">
          <div>
            <span className="card-tag">FEATURED CONTENT</span>
            <h3>Every Great Journey Begins With a Story.</h3>
            <p>
              Read, learn, and get inspired by stories shared by people
              around the world.
            </p>
            <Link to="/blogs">Explore All Blogs →</Link>
          </div>

          <div className="featured-icon">✍</div>
        </div>
      </section>

      <section className="categories-section" id="categories">
        <div className="section-heading">
          <span>EXPLORE YOUR INTERESTS</span>
          <h2>Explore Categories.</h2>
        </div>

        <div className="category-grid">
          <div className="category-card">
            <span>💻</span>
            <h3>Technology</h3>
            <p>Explore the latest ideas in tech.</p>
          </div>

          <div className="category-card">
            <span>📚</span>
            <h3>Education</h3>
            <p>Learn something new every day.</p>
          </div>

          <div className="category-card">
            <span>🌍</span>
            <h3>Lifestyle</h3>
            <p>Discover experiences and stories.</p>
          </div>

          <div className="category-card">
            <span>🚀</span>
            <h3>Business</h3>
            <p>Ideas that inspire growth.</p>
          </div>
        </div>
      </section>

      <footer className="footer" id="about">
        <h2>BlogSpace.</h2>
        <p>Share your stories. Inspire the world.</p>
        <span>© 2026 BlogSpace. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default Home;
