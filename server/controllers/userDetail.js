const db = require('../config/database'); 

const getUserProfile = async (req, res) => {
     const encodedUserId = req.params.userId;

    // Decode the userId using Base64
    const userId = Buffer.from(encodedUserId, 'base64').toString('utf8');

    try {
        const userProfileQuery = `SELECT * FROM users WHERE id = ?`;
        const [userRows] = await db.execute(userProfileQuery, [userId]);

        if (userRows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const followersCountQuery = 
            `SELECT COUNT(*) AS followers
             FROM followers
             WHERE followee_id = ? AND status = 'accepted'`;
        const [followersRows] = await db.execute(followersCountQuery, [userId]);

        const followingCountQuery = 
            `SELECT COUNT(*) AS following
             FROM followers
             WHERE follower_id = ? AND status = 'accepted'`;
        const [followingRows] = await db.execute(followingCountQuery, [userId]);

        const connectionsCountQuery = 
            `SELECT COUNT(*) AS connector
             FROM connections
             WHERE connectee_id = ? AND status = 'accepted'`;
        const [connectionsRows] = await db.execute(connectionsCountQuery, [userId]);

        const connecteesCountQuery = 
            `SELECT COUNT(*) AS connectee
             FROM connections
             WHERE connector_id = ? AND status = 'accepted'`;
        const [connecteesRows] = await db.execute(connecteesCountQuery, [userId]);

        res.status(200).json({
            user: userRows[0],
            followers: followersRows[0].followers,
            following: followingRows[0].following,
            connector: connectionsRows[0].connector,
            connectee: connecteesRows[0].connectee
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getConnectionStatus = async (req, res) => {
     const encodedUserId = req.params.userId;

    // Decode the userId using Base64
    const userId = Buffer.from(encodedUserId, 'base64').toString('utf8');

    try {
        const sentRequestsQuery = 
            `SELECT
                SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) AS accepted,
                SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected,
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending
             FROM connections
             WHERE connector_id = ?`;
        const [sentRequestsRows] = await db.execute(sentRequestsQuery, [userId]);

        const receivedRequestsQuery = 
            `SELECT
                SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) AS accepted,
                SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected,
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending
             FROM connections
             WHERE connectee_id = ?`;
        const [receivedRequestsRows] = await db.execute(receivedRequestsQuery, [userId]);

        res.status(200).json({
            sentRequests: sentRequestsRows[0],
            receivedRequests: receivedRequestsRows[0],
        });
    } catch (error) {
        console.error("Error fetching connection statuses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getFollowersStatus = async (req, res) => {
     const encodedUserId = req.params.userId;

    // Decode the userId using Base64
    const userId = Buffer.from(encodedUserId, 'base64').toString('utf8');

    try {
        const sentRequestsQuery = 
            `SELECT
                COALESCE(SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END), 0) AS accepted,
                COALESCE(SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END), 0) AS rejected,
                COALESCE(SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END), 0) AS pending
             FROM followers
             WHERE follower_id = ?`;
        const [sentRequestsRows] = await db.execute(sentRequestsQuery, [userId]);

        const receivedRequestsQuery = 
            `SELECT
                COALESCE(SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END), 0) AS accepted,
                COALESCE(SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END), 0) AS rejected,
                COALESCE(SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END), 0) AS pending
             FROM followers
             WHERE followee_id = ?`;
        const [receivedRequestsRows] = await db.execute(receivedRequestsQuery, [userId]);

        res.status(200).json({
            sentRequests: sentRequestsRows[0],
            receivedRequests: receivedRequestsRows[0],
        });
    } catch (error) {
        console.error("Error fetching followers status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getMeetingsForUser = async (req, res) => {
     const encodedUserId = req.params.userId;

    // Decode the userId using Base64
    const userId = Buffer.from(encodedUserId, 'base64').toString('utf8');
  
    const meetingSchedule = 
      `SELECT
        schedule_meets.id,
        schedule_meets.user_id,
        schedule_meets.scheduling_user_id,
        schedule_meets.date,
        schedule_meets.charge AS 'charges per hour',
        schedule_meets.status,
        initiator_user.username AS 'Meeting Initiator',
        meeting_user.username AS 'Meeting With'
      FROM schedule_meets
      LEFT JOIN users AS initiator_user ON schedule_meets.scheduling_user_id = initiator_user.id
      LEFT JOIN users AS meeting_user ON schedule_meets.user_id = meeting_user.id
      WHERE schedule_meets.user_id = ? OR schedule_meets.scheduling_user_id = ?`;
  
    try {
      const [results] = await db.query(meetingSchedule, [userId, userId]);
      res.json(results);
    } catch (error) {
      console.error("Error fetching meetings:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPaymentHistory = async (req, res) => {
     const encodedUserId = req.params.userId;

    // Decode the userId using Base64
    const userId = Buffer.from(encodedUserId, 'base64').toString('utf8');
  
    const paymentHistoryQuery = 
      `SELECT
        wallet_histories.user_id,
        users.username,
        wallet_histories.schedule_id,
        wallet_histories.type,
        wallet_histories.ac_no AS accountNo,
        wallet_histories.ifsc,
        wallet_histories.upi,
        wallet_histories.verify_status AS status,
        wallet_histories.amount
      FROM wallet_histories
      LEFT JOIN users ON wallet_histories.user_id = users.id
      WHERE wallet_histories.user_id = ? AND wallet_histories.deleted_at IS NULL`;
  
    try {
      const [results] = await db.query(paymentHistoryQuery, [userId]);
      res.json(results);
    } catch (error) {
      console.error("Error fetching payment history:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
  
module.exports = {
    getUserProfile,
    getConnectionStatus,
    getFollowersStatus,
    getMeetingsForUser,
    getPaymentHistory
};
