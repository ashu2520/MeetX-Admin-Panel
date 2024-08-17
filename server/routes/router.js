const express = require("express");
const router = express.Router();
const { dashboard } = require("../controllers/dashboard"); 
const { usersList } = require("../controllers/usersList"); 
const { userConnections } = require("../controllers/userConnections"); 
const { reportedPosts } = require("../controllers/reportedPosts"); 
const { userProfile } = require("../controllers/userProfile");

router.get("/api/dashboard", dashboard);

router.get("/api/usersList", usersList);

router.get("/api/usersConnection", userConnections);

router.get("/api/reportedPosts", reportedPosts);

router.get("/api/userProfile", userProfile)
module.exports = router;
