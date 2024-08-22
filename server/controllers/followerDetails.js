const db = require("../config/database.js");

async function userFollowers(req, res) {
    try {
        // Query to get raw data
        const all_users_followers_data = `
            SELECT 
                user_id,
                request_type,
                SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) AS accepted_requests,
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending_requests,
                SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected_requests
            FROM 
                (
                    SELECT 
                        followee_id AS user_id,
                        'received' AS request_type,
                        status
                    FROM 
                        followers
                    
                    UNION ALL
                    
                    SELECT 
                        follower_id AS user_id,
                        'sent' AS request_type,
                        status
                    FROM 
                        followers
                ) AS combined_requests
            GROUP BY 
                user_id, request_type;
        `;

        const [results] = await db.query(all_users_followers_data);

        // Transform data to combine sent and received requests for each user
        const transformedData = results.reduce((acc, curr) => {
            const { user_id, request_type, accepted_requests, pending_requests, rejected_requests } = curr;

            if (!acc[user_id]) {
                acc[user_id] = {
                    userId: user_id,
                    send_Accepted: 0,
                    send_Pending: 0,
                    send_Rejected: 0,
                    received_Accepted: 0,
                    received_Pending: 0,
                    received_Rejected: 0,
                };
            }

            if (request_type === 'sent') {
                acc[user_id].send_Accepted = accepted_requests;
                acc[user_id].send_Pending = pending_requests;
                acc[user_id].send_Rejected = rejected_requests;
            } else if (request_type === 'received') {
                acc[user_id].received_Accepted = accepted_requests;
                acc[user_id].received_Pending = pending_requests;
                acc[user_id].received_Rejected = rejected_requests;
            }

            return acc;
        }, {});

        // Convert the object to an array
        const finalData = Object.values(transformedData);

        res.status(200).json({
            followers_data: finalData
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching user followers data.',
            error: error.message
        });
    }
}

module.exports = { userFollowers };
