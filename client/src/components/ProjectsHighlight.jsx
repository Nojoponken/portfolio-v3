import "./ProjectsHighlight.css";

import Card from "../components/Card";
import ErrorBox from "../components/ErrorBox";
import { NavLink } from "react-router-dom";

import { useAllProjects } from "../hooks/useProjects.js";

function ProjectsHighlight() {
  const { error, data, isPending } = useAllProjects();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <ErrorBox error={error} />;
  }

  try {
    return (
      <div className="highlight">
        <span className="highlight-projects">
          {data.length && (
            <>
              {data.slice(0, 3).map((item, index) => (
                <Card
                  key={index}
                  color={item._id}
                  title={item.title}
                  mainLink={`/projects/${item._id}`}
                  tags={item.tags}
                  thumbnail={item.thumbnail}
                />
              ))}
            </>
          )}
        </span>
        <NavLink to="/projects" className="see-all tag-button">
          See all projects &#x1F862;
        </NavLink>
      </div>
    );
  } catch (e) {
    return <ErrorBox error={e} />;
  }
}

export default ProjectsHighlight;
