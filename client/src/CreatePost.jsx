import { useState } from "react";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  /* Code written by AI */
  const preventEnterSubmit = (event) => {
    // Check if the key pressed was Enter
    // AND check that the user isn't currently in a textarea
    if (event.key === "Enter" && event.target.tagName === "INPUT") {
      event.preventDefault();
    }
  };
  /* End of code written by AI */

  const tryAddTag = (event) => {
    if (event.key == "Enter") {
      if (tagInput.trim()) {
        setTags([...tags, tagInput]);
        setTagInput("");
      }
    }
  };

  const createNewPost = (event) => {
    event.preventDefault();
    console.log("Submitting");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: text,
        tags: tags,
        startDate: startDate,
        endDate: endDate,
      }),
    };
    fetch("https://localhost:3500/projects", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promis.reject(error);
        } else {
          const msg = (data && data.message) || response.status;
          console.log("Post created! ", msg);
        }
      })
      .catch((error) => {
        console.error("Error when fetching: ", error);
      });
  };

  return (
    <>
      <form onKeyDown={preventEnterSubmit} onSubmit={createNewPost}>
        <label>
          Title:{" "}
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label>
          Text body:{" "}
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </label>

        <label>
          Add tags:{" "}
          <input
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={tryAddTag}
          />
        </label>

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

        <input type="submit" value="Create Post" />
      </form>
      <h3>{title}</h3>
      <pre>{text}</pre>
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
    </>
  );
}

export default CreatePost;
