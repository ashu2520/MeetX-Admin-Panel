const db = require('../config/database'); 
const getUserProfile = async (req, res) => {
    const { userId } = req.params;

    try {
        // Query to get the user profile
        const userProfileQuery = `SELECT * FROM users WHERE id = ?`;
        const [userRows] = await db.execute(userProfileQuery, [userId]);

        if (userRows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Query to get the followers count
        const followersCountQuery = `
            SELECT COUNT(*) AS followers
            FROM followers
            WHERE followee_id = ? AND status = 'accepted';
        `;
        const [followersRows] = await db.execute(followersCountQuery, [userId]);

        // Query to get the following count
        const followingCountQuery = `
            SELECT COUNT(*) AS following
            FROM followers
            WHERE follower_id = ? AND status = 'accepted';
        `;
        const [followingRows] = await db.execute(followingCountQuery, [userId]);

        // Query to get the connections count (formerly connectors)
        const connectionsCountQuery = `
            SELECT COUNT(*) AS connector
            FROM connections
            WHERE connectee_id = ? AND status = 'accepted';
        `;
        const [connectionsRows] = await db.execute(connectionsCountQuery, [userId]);

        // Query to get the connectees count
        const connecteesCountQuery = `
            SELECT COUNT(*) AS connectee
            FROM connections
            WHERE connector_id = ? AND status = 'accepted';
        `;
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

module.exports = {
    getUserProfile,
};
