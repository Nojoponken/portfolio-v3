import { useState } from "react";
import { preventEnterSubmit } from "../utils/formUtils.js";
import apiService from "../services/apiService.js";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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

  const createNewPost = async (event) => {
    event.preventDefault();
    console.log("Submitting...");

    const response = await apiService.createNewProject(
      title,
      description,
      tags,
      startDate,
      endDate,
    );
    console.log(response);
  };

  return (
    <main>
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
      <h3>{title}</h3>
      <pre>{description}</pre>
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
      <p>
        {startDate} to {endDate}
      </p>
    </main>
  );
}

export default CreatePost;
