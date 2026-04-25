import "./Blog.css";
import wip from "../assets/wip.svg";

function Blog() {
  return (
    <section className="blog-section shadowed">
      <img src={wip} className="blog-image" />
      <h2 className="blog-title">Under construction</h2>
    </section>
  );
}

export default Blog;
