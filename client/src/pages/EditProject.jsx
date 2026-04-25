import "./EditProject.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { preventEnterSubmit } from "../utils/formUtils";
import { useEditProject, useProject } from "../hooks/useProjects";

import ErrorBox from "../components/ErrorBox";
import cloudinaryUpload from "../services/cloudinaryUpload";

function EditProject() {
  const { projectId } = useParams();
  const { error, data, mutate, isSuccess } = useEditProject();
  // const { error, data, getIsPending } = useProject({ projectId });
  const proj = useProject({ projectId });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [repo, setRepo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [updateThumbnail, setUpdateThumbnail] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (proj.data) {
      setTitle(proj.data.title);
      setDescription(proj.data.description);
      setRepo(proj.data.repo);
      setTags(proj.data.tags);
      setStartDate(proj.data.startDate.slice(0, 10));
      setEndDate(proj.data.endDate.slice(0, 10));
    }
  }, [proj.data]);

  if (proj.isPending) {
    return <p>Loading project...</p>;
  }

  const tryAddTag = (event) => {
    if (event.key === "Enter") {
      if (tagInput.trim()) {
        setTags([...tags, tagInput]);
        setTagInput("");
      }
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];

    setThumbnail(file);
  };

  const editPost = async (event) => {
    event.preventDefault();
    console.log("Submitting...");

    if (updateThumbnail && !thumbnail) {
      console.error("Missing thumbnail image");
      return;
    }

    if (!title || !description || !repo || !tags.length) {
      console.error("Empty fields");
      return;
    }

    if (!startDate || !endDate) {
      console.error("Missing start and/or end date");
      return;
    }

    try {
      let body = {
        id: projectId,
        title,
        description,
        repo,
        tags,
        startDate,
        endDate,
      };

      if (updateThumbnail) {
        const { public_id } = await cloudinaryUpload(thumbnail);
        body = { ...body, thumbnail: public_id };
      }

      mutate(body);
    } catch (error) {
      console.error("Upload failed: ", error);
    }
  };

  return (
    <>
      {error && <ErrorBox error={error} />}
      {isSuccess ? (
        <p>Post updated! {JSON.stringify(data)}</p>
      ) : (
        <form onKeyDown={preventEnterSubmit} onSubmit={editPost}>
          <input
            placeholder="Title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <textarea
            placeholder="Project description..."
            cols="80"
            rows="8"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />

          <label>
            Thumbnail:{" "}
            <input type="file" accept="image/*" onChange={handleUpload} />
            <input
              type="checkbox"
              checked={updateThumbnail}
              onChange={(e) => setUpdateThumbnail(e.target.checked)}
            />
            {updateThumbnail ? <p>yes will update</p> : <p>no won't update</p>}
          </label>

          <input
            placeholder="Source repository link..."
            value={repo}
            onChange={(event) => setRepo(event.target.value)}
            required
          />

          <input
            placeholder="Enter the name of a tag then press the <Return> key"
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={tryAddTag}
          />
          <span>
            {tags.map((tag, i) => (
              <button
                key={i}
                onClick={() => setTags(tags.filter((_, j) => i != j))}
              >
                {tag}
              </button>
            ))}
          </span>
          <span>
            <label>
              Start date:{" "}
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </label>

            <label>
              End date:{" "}
              <input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </label>
          </span>
          <input type="submit" value="Update Post" />
        </form>
      )}
    </>
  );
}

export default EditProject;
