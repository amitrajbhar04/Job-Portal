const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/AuthController");
const { verifyToken } = require("../middelware/AuthMiddelware");


router.post("/login", authController.login);
router.post("/registration", authController.registration);
router.get("/get-profile",verifyToken,authController.getProfile);

module.exports = router;