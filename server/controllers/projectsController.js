const Project = require("../models/Project");
const asyncHandler = require("express-async-handler");

// @desc Get all projects
// @route GET /projects
// @access Public
const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().lean();
  if (!projects.length) {
    return res.status(404).json({ message: "No projects found" });
  }

  res.json(projects);
});

// @desc Create new project
// @route POST /projects
// @access Private
const createNewProject = asyncHandler(async (req, res) => {
  const { title, description, tags, startDate, endDate } = req.body;

  if (!title || !description || !tags || !startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Malformed request, required fields are missing!" });
  }

  const projectObject = { title, description, tags, startDate, endDate };
  const project = await Project.create(projectObject);

  if (project) {
    res.status(201).json({ message: `New project ${title} created` });
  } else {
    res.status(400).json({ message: "Invalid project data recieved" });
  }
});

// @desc Update project
// @route PATCH /projects
// @access Private
const updateProject = asyncHandler(async (req, res) => {
  const { id, title, description, tags, startDate, endDate } = req.body;
  if (!id || !title || !description || !tags || !startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Malformed request, required fields are missing!" });
  }

  const project = await Project.findById(id).exec();

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  project.title = title;
  project.description = description;
  project.tags = tags;
  project.startDate = startDate;
  project.endDate = endDate;

  await project.save();
  res.json({ message: `Project ${title} updated` });
});

// @desc Delete project
// @route DELETE /projects
// @access Private
const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ message: "Malformed request, required fields are missing!" });
  }

  const project = await Project.findById(id).exec();

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const result = await project.deleteOne();
  res.json({ message: `Project ${result.title} with id ${result.id} deleted` });
});

module.exports = {
  getAllProjects,
  createNewProject,
  updateProject,
  deleteProject,
};
