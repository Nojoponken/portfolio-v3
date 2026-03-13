import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const getProjects = async () => {
  const response = await fetch("http://localhost:3500/projects");
  return await response.json();
};

function Projects() {
  const { data, isPending } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

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

  if (isPending) {
    return (
      <main>
        <input
          placeholder="Search..."
          type="text"
          onChange={(event) => setSearch(event.target.value)}
        />
        <h3>Loading...</h3>
      </main>
    );
  }

  return (
    <main>
      <input
        placeholder="Search..."
        type="text"
        onChange={(event) => setSearch(event.target.value)}
      />
      <section class="results-grid">
        {data.filter(searchFilterFunction).map((item, index) => (
          <article key={index} class="card">
            <NavLink to={`/projects/${item._id}`} class="main-link">
              <h2>{item.title}</h2>
            </NavLink>

            {item.tags.map((tag, index) => (
              <button key={index}>{tag}</button>
            ))}
          </article>
        ))}
      </section>
    </main>
  );
}

export default Projects;
