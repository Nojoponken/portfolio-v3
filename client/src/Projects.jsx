import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Projects() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/projects.json")
      .then((response) => response.json())
      .then((data) =>
        setData(
          data.filter((item) => {
            return item.name.toLowerCase().includes(query.toLowerCase());
          }),
        ),
      )
      .catch((error) => console.error("Error fetching data:", error));
  }, [query]);

  if (!data) {
    return (
      <main>
        <h3>Loading...</h3>
      </main>
    );
  }

  return (
    <main>
      <input type="text" onChange={(event) => setQuery(event.target.value)} />
      {data.map((item) => (
        <article key={item.id}>
          <h1>{item.name}</h1>
          <p>{item.description}</p>
          <NavLink to={`/projects/${item.id}`}>Details</NavLink>
        </article>
      ))}
    </main>
  );
}

export default Projects;
