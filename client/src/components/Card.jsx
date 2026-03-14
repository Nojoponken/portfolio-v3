import { NavLink } from "react-router-dom";
import thumbnail from "../assets/portrait.webp";
function Card({ title, mainLink, tags }) {
  return (
    <article className="card">
      <img src={thumbnail} className="thumbnail" />
      <NavLink to={mainLink} className="main-link">
        <h2>{title}</h2>
      </NavLink>
      <p>
        Lorem ipsum dolor, et lorem ipsum dolor? Dorime. Ameno dolor ipsum,
        disco.
      </p>
      <span className="taglist">
        {tags.map((tag, index) => (
          <button key={index}>{tag}</button>
        ))}
      </span>
    </article>
  );
}

export default Card;
