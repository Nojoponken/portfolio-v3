import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProject } from "../hooks/useProjects.js";
import { AdvancedImage } from "@cloudinary/react";
import useCld from "../hooks/useCld";

import gitIcon from "../assets/Git-Icon-Black.svg";

import ErrorBox from "../components/ErrorBox";

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

function ProjectDetails() {
  const { projectId } = useParams();

  const { data, error, isPending } = useProject({ projectId });

  const [dateString, setDateString] = useState("");
  const { cld } = useCld();
  useEffect(() => {
    if (data) {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      const startMonth = months[startDate.getMonth()];
      const endMonth = months[endDate.getMonth()];
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();

      setDateString(`${startMonth} ${startYear} to ${endMonth} ${endYear}`);
    }
  }, [data]);

  if (!data) {
    return <>{JSON.stringify(error)}</>;
  }

  const myImage = cld.image(data.thumbnail);

  return (
    <>
      {isPending ? (
        <h3>Loading...</h3>
      ) : error ? (
        <ErrorBox error={error} />
      ) : (
        <article className="detail">
          <AdvancedImage cldImg={myImage} className="thumbnail-detail" />
          <h2>{data.title}</h2>
          <section>
            {data.description
              .split("\n")
              .filter((p) => p) // Filter empty strings
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </section>
          <div className="repo">
            <a href={data.repo}>
              <img src={gitIcon} className="icon" /> Git Repository
            </a>
          </div>

          <span className="detail-footer">
            <span>
              {data.tags.map((tag, index) => (
                <button key={index} className="tag-button">
                  {tag}
                </button>
              ))}
            </span>
            <b>{dateString}</b>
          </span>
        </article>
      )}
    </>
  );
}

export default ProjectDetails;
