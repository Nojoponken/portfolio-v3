import express from "express";
const router = express.Router();
import projectsController from "../controllers/projectsController.js";
import verifyJWT from "../middleware/verifyJWT.js";

router
  .route("/")
  .get(projectsController.getAllProjects)
  .post(verifyJWT, projectsController.createNewProject)
  .patch(verifyJWT, projectsController.updateProject)
  .delete(verifyJWT, projectsController.deleteProject);

router.route("/:projectId").get(projectsController.getSingleProject);

export default router;
