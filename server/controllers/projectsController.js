import Project from "../models/Project.js";
import asyncHandler from "express-async-handler";

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

// @desc Get a specific project
// @route GET /projects/:projectId
// @access Public
const getSingleProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findOne().where({ _id: projectId }).lean();
  if (!project) {
    return res.status(404).json({ message: "No project found" });
  }

  res.json(project);
});

// @desc Create new project
// @route POST /projects
// @access Private
const createNewProject = asyncHandler(async (req, res) => {
  const { title, description, repo, thumbnail, tags, startDate, endDate } =
    req.body;

  console.log(req.body);
  if (
    !title ||
    !description ||
    !repo ||
    !thumbnail ||
    !tags ||
    !startDate ||
    !endDate
  ) {
    return res
      .status(400)
      .json({ message: "Malformed request, required fields are missing!" });
  }

  const projectObject = {
    title,
    description,
    repo,
    thumbnail,
    tags,
    startDate,
    endDate,
  };
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
  const { id, title, description, repo, thumbnail, tags, startDate, endDate } =
    req.body;
  if (!id) {
    return res
      .status(400)
      .json({ message: "Malformed request, did not contain project id!" });
  }

  const project = await Project.findById(id).exec();

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (title) project.title = title;
  if (description) project.description = description;
  if (repo) project.repo = repo;
  if (thumbnail) project.thumbnail = thumbnail;
  if (tags) project.tags = tags;
  if (startDate) project.startDate = startDate;
  if (endDate) project.endDate = endDate;

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

export default {
  getAllProjects,
  getSingleProject,
  createNewProject,
  updateProject,
  deleteProject,
};
