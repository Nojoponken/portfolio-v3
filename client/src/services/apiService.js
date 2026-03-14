const backend = "http://localhost:3500";

async function getProjects() {
  const response = await fetch(`${backend}/projects`);
  return await response.json();
}

async function getSingleProject(projectId) {
  const response = await fetch(`${backend}/projects/${projectId}`);
  return await response.json();
}

async function createNewProject(title, description, tags, startDate, endDate) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      description,
      tags,
      startDate,
      endDate,
    }),
  };

  const response = await fetch(`${backend}/projects`, requestOptions);
  return await response.json();
}

async function registerUser(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  };

  const response = await fetch("http://localhost:3500/users", requestOptions);
  return await response.json();
}

export default {
  getProjects,
  getSingleProject,
  createNewProject,
  registerUser,
};
