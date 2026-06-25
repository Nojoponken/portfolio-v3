import express from "express";
const router = express.Router();
import path from "path";
const __dirname = import.meta.dirname;

router.get(/^\/(index(.html)?)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

export default router;
