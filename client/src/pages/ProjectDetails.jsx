import "./ProjectDetails.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { RotatingLines } from "react-loader-spinner";
import { useAuth } from "../context/AuthContext";
import { useProject } from "../hooks/useProjects";
import { AdvancedImage } from "@cloudinary/react";
import useCld from "../hooks/useCld";

import ErrorBox from "../components/ErrorBox";
import DateDisplay from "../components/DateDisplay";

function ProjectDetails() {
  const [img, setImg] = useState();
  const { auth } = useAuth();
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { data, error, isPending } = useProject({ projectId });

  const { cld } = useCld();

  useEffect(() => {
    if (data) {
      setImg(cld.image(data.thumbnail));
    }
  }, [data]);

  return (
    <article className="details-article">
      {isPending ? (
        <RotatingLines color="#0008" />
      ) : error ? (
        <ErrorBox error={error} />
      ) : (
        <>
          <AdvancedImage cldImg={img} className="details-image" />
          <h2 className="details-title">{data.title}</h2>
          <section className="details-section">
            {data.description
              .split("\n")
              .filter((p) => p) // Filter empty strings
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </section>

          <div className="details-repo">
            <a href={data.repo}>
              <img className="details-icon" /> Git Repository
            </a>
          </div>

          <span className="details-footer">
            <span className="details-tags">
              {data.tags.map((tag, index) => (
                <button key={index} className="tag-button">
                  {tag}
                </button>
              ))}
            </span>
            <DateDisplay
              startDateStr={data.startDate}
              endDateStr={data.endDate}
            />
          </span>

          {auth.username && (
            <button onClick={() => navigate(`/admin/edit/${projectId}`)}>
              Edit project
            </button>
          )}
        </>
      )}
    </article>
  );
}

export default ProjectDetails;
