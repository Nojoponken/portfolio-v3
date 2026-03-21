import { useState } from "react";
import { preventEnterSubmit } from "../utils/formUtils";
import { useCreateProject } from "../hooks/useProjects";
import ErrorBox from "../components/ErrorBox";
import cloudinaryUpload from "../services/cloudinaryUpload";

function CreateProject() {
  const { error, data, mutate, isSuccess } = useCreateProject();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [repo, setRepo] = useState("");
  const [thumbnail, setThumbnail] = useState("temporary");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  const createNewPost = async (event) => {
    event.preventDefault();
    console.log("Submitting...");

    if (!thumbnail) {
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
      const { public_id } = await cloudinaryUpload(thumbnail);

      mutate({
        title,
        description,
        repo,
        thumbnail: public_id,
        tags,
        startDate,
        endDate,
      });
    } catch (error) {
      console.error("Upload failed: ", error);
    }
  };

  return (
    <>
      {error && <ErrorBox error={error} />}
      {isSuccess ? (
        <p>Post created! {JSON.stringify(data)}</p>
      ) : (
        <form onKeyDown={preventEnterSubmit} onSubmit={createNewPost}>
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
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              required
            />
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
          <input type="submit" value="Create Post" />
        </form>
      )}
    </>
  );
}

export default CreateProject;
