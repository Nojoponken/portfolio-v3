import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProject } from "../hooks/useProjects.js";

import ErrorBox from "../components/ErrorBox";

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

  const { data, error, isPending } = useProject(projectId);

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
    return <></>;
  }

  return (
    <>
      {isPending ? (
        <h3>Loading...</h3>
      ) : error ? (
        <ErrorBox error={error} />
      ) : (
        <article>
          <h2>{data.title}</h2>
          <pre>{data.description}</pre>
          {data.tags.map((tag, index) => (
            <button key={index}>{tag}</button>
          ))}
          <p>{dateString}</p>{" "}
        </article>
      )}
    </>
  );
}

export default ProjectDetails;
