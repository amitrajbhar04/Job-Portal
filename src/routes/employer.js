const express = require("express");
const jobController = require("../controllers/employer/JobController");
const { verifyToken } = require("../middelware/AuthMiddelware");
const authorizeRole = require("../middelware/RoleMiddleware");
const router = express.Router();

router.post("/job-create", verifyToken, authorizeRole(2), jobController.createJob);
router.get("/get-all-jobs",verifyToken,authorizeRole(2),jobController.getAllJobs);
router.get("/job-applied-candidate-list",verifyToken,authorizeRole(2),jobController.jobAppliedCandidateList);

module.exports = router;