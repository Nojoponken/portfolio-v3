import { useState } from "react";
import { preventEnterSubmit } from "../utils/formUtils";
import { useCreateProject } from "../hooks/useProjects";
import ErrorBox from "../components/ErrorBox";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { error, data, mutate, isSuccess } = useCreateProject();

  const tryAddTag = (event) => {
    if (event.key === "Enter") {
      if (tagInput.trim()) {
        setTags([...tags, tagInput]);
        setTagInput("");
      }
    }
  };

  const createNewPost = async (event) => {
    event.preventDefault();
    console.log("Submitting...");
    mutate({ title, description, tags, startDate, endDate });
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
          />

          <textarea
            placeholder="Project description..."
            cols="80"
            rows="8"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <input
            placeholder="Enter the name of a tag then press the <Return> key"
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={tryAddTag}
          />
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
