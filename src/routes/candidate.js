const express = require("express");
const router = express.Router();
const candidateProfileController = require("../controllers/candidate/CandidateProfileController");
const { verifyToken } = require("../middelware/AuthMiddelware");
const authorizeRole = require("../middelware/RoleMiddleware");

router.post("/applied-job", verifyToken, authorizeRole(1), candidateProfileController.appliedJob);
router.get("/get-jobs",verifyToken,authorizeRole(1),candidateProfileController.getJobs);
router.get("/get-all-applied-jobs",verifyToken,authorizeRole(1),candidateProfileController.getAllAppliedJobs);
module.exports = router;