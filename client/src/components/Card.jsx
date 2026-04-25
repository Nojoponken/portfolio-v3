import "./Card.css";
import { NavLink } from "react-router-dom";
import { AdvancedImage } from "@cloudinary/react";
import useCld from "../hooks/useCld";

function Card({ color, title, mainLink, tags, thumbnail }) {
  const { cld } = useCld();
  const myImage = cld.image(thumbnail);

  return (
    <article
      className={`shadowed card card-color-${color.charCodeAt(color.length - 2) % 6}`}
    >
      <AdvancedImage cldImg={myImage} className="card-thumbnail" />
      <NavLink to={mainLink} className="card-mainlink">
        <h2>{title}</h2>
      </NavLink>

      <span className="card-taglist">
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
