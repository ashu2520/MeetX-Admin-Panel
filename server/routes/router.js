const express = require("express");
const router = express.Router();
const { dashboard } = require("../controllers/dashboard"); 
const { usersList } = require("../controllers/usersList"); 
const { userConnections } = require("../controllers/userConnections"); 
const { reportedPosts } = require("../controllers/reportedPosts"); 
const { getMeetings } = require("../controllers/meetController");
const { getWalletHistory } = require("../controllers/walletHistory");
const { getUserProfile, getConnectionStatus, getFollowersStatus, getMeetingsForUser, getPaymentHistory } = require("../controllers/userDetail");
const { userFollowers } = require("../controllers/followerDetails");

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
//fetch connextion data
// router.get('/api/connectionStatus/:userId', getConnectionStatus);

// //fetch followers data
// router.get('/api/followerStatus/:userId',getFollowersStatus)
// router.get('/api/meetinglist/:userId', getMeetingsForUser);
// router.get('/api/payment/:userId', getPaymentHistory);

router.get('/api/followerlist',userFollowers)

module.exports = router;
