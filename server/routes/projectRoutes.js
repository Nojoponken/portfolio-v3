import express from "express";
const router = express.Router();
import projectsController from "../controllers/projectsController.js";

router
  .route("/")
  .get(projectsController.getAllProjects)
  .post(projectsController.createNewProject)
  .patch(projectsController.updateProject)
  .delete(projectsController.deleteProject);

router.route("/:projectId").get(projectsController.getSingleProject);

export default router;
