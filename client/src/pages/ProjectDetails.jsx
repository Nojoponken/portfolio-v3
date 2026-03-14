import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import apiService from "../services/apiService.js";

function ProjectDetails() {
  const { projectId } = useParams();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { data } = useQuery({
    queryKey: [`project-${projectId}`],
    queryFn: () => apiService.getSingleProject(projectId),
  });

  const [dateString, setDateString] = useState("");

  useEffect(() => {
    if (data) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);

      setDateString(
        `${months[start.getMonth()]} ${start.getFullYear()} to ${months[end.getMonth()]} ${end.getFullYear()}`,
      );
    }
  }, [data]);

  if (!data) {
    return (
      <main>
        <h3>Loading...</h3>
      </main>
    );
  }

  return (
    <main>
      <article>
        <h2>{data.title}</h2>
        <pre>{data.description}</pre>
        {data.tags.map((tag, index) => (
          <button key={index}>{tag}</button>
        ))}

        <p>{dateString}</p>
      </article>
    </main>
  );
}

export default ProjectDetails;
