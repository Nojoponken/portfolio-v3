import { NavLink } from "react-router-dom";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiService from "../services/apiService.js";

function Projects() {
  const { data, isPending } = useQuery({
    queryKey: ["projects"],
    queryFn: apiService.getProjects,
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
      <section className="results-grid">
        {data.filter(searchFilterFunction).map((item, index) => (
          <Card
            key={index}
            title={item.title}
            mainLink={`/projects/${item._id}`}
            tags={item.tags}
          />
        ))}
      </section>
    </main>
  );
}

export default Projects;
