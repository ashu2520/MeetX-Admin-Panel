const express = require("express");
const router = express.Router();
const { dashboard } = require("../controllers/dashboard"); 
const { usersList } = require("../controllers/usersList"); 
const { userConnections } = require("../controllers/userConnections"); 
const { reportedPosts } = require("../controllers/reportedPosts"); 
const { getMeetings } = require("../controllers/meetController");
const { getWalletHistory } = require("../controllers/walletHistory");
const { getUserProfile } = require("../controllers/userDetail");
const { validateToken } = require("../middlewares/validateToken");
const { getAdmins, createAdmin, loginAdmin, currentAdmin, resetPassword } = require("../controllers/auth");

router.get("/api/admins/all", getAdmins);
router.post("/api/admins/register", createAdmin);
router.post("/api/admins/login", loginAdmin);
router.get("/api/admins/current", validateToken, currentAdmin);
router.put("/api/admins/reset-password", validateToken, resetPassword);

router.use("/api/", validateToken);
router.get("/api/dashboard", dashboard);
router.get("/api/usersList", usersList);
router.get("/api/usersConnection", userConnections);
router.get("/api/reportedPosts", reportedPosts);

// Route for fetching meetings
router.get("/api/meetings", getMeetings);

//routes for fetching walletHistory
router.get("/api/walletHistory", getWalletHistory);

//fetch user detail
router.get('/api/profile/:userId', getUserProfile);

module.exports = router;
