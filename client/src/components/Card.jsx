import { NavLink } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import useCld from "../hooks/useCld";

function Card({ title, mainLink, tags, thumbnail }) {
  const { cld } = useCld();
  const myImage = cld.image(thumbnail);

  return (
    <article className="card">
      <AdvancedImage cldImg={myImage} className="thumbnail" />
      <NavLink to={mainLink} className="main-link">
        <h2>{title}</h2>
      </NavLink>

      <span className="taglist">
        {tags.map((tag, index) => (
          <button key={index} className="tag-button">
            {tag}
          </button>
        ))}
      </span>
    </article>
  );
}

export default Card;
