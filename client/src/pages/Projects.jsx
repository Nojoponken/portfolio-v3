import "./Projects.css";
import Card from "../components/Card";
import ErrorBox from "../components/ErrorBox";
import { useState } from "react";
import { useAllProjects } from "../hooks/useProjects.js";

function Projects() {
  const { data, error, isPending } = useAllProjects();

  const [search, setSearch] = useState("");

  const searchFilterFunction = (project) => {
    const TITLEMATCH = project.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const DESCMATCH = project.description
      .toLowerCase()
      .includes(search.toLowerCase());
    const TAGMATCH = project.tags.find((tag) =>
      tag.toLowerCase().includes(search.toLowerCase()),
    );

    return TITLEMATCH || DESCMATCH || TAGMATCH;
  };

  return (
    <>
      <input
        placeholder="Search..."
        type="text"
        onChange={(event) => setSearch(event.target.value)}
      />
      {isPending ? (
        <h3>Loading...</h3>
      ) : error ? (
        <ErrorBox error={error} />
      ) : (
        <section className="results-grid">
          {data.filter(searchFilterFunction).map((item, index) => (
            <Card
              key={index}
              color={item._id}
              title={item.title}
              mainLink={`/projects/${item._id}`}
              tags={item.tags}
              thumbnail={item.thumbnail}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Projects;
