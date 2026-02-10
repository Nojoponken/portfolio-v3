import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProjectDetails() {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/projects.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!data) {
    return (
      <main>
        <h3>Loading...</h3>
      </main>
    );
  }

  return (
    <article>
      <h2>{data[id].name}</h2>
      <p>{data[id].description}</p>
      {data[id].technologies.map((item) => (
        <button>{item}</button>
      ))}
    </article>
  );
}

export default ProjectDetails;
