const db = require("../config/database.js");

async function reportedPosts(req, res) {
    try {
        // Validate and parse query parameters
        let { page = 1, limit = 10, sortField = "rp.user_id", sortOrder = "asc", search = "" } = req.query;

        // Convert page and limit to integers, and validate them
        page = parseInt(page);
        limit = parseInt(limit);

        if (isNaN(page) || page < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid page number. It must be a positive integer."
            });
        }
        if (isNaN(limit) || limit < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid limit value. It must be a positive integer."
            });
        }

        // Sanitize sortField and sortOrder to avoid SQL injection
        const validSortFields = ["rp.user_id", "ap.user_id", "rp.all_post_id", "ap.post_type", "rp.remark"];
        if (!validSortFields.includes(sortField)) {
            return res.status(400).json({
                success: false,
                message: "Invalid sort field."
            });
        }

        // sortOrder = sortOrder.toLowerCase();
        // if (sortOrder !== "asc" && sortOrder !== "desc") {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid sort order. It must be either 'asc' or 'desc'."
        //     });
        // }

        const offset = (page - 1) * limit;

        const searchCondition = search
            ? `WHERE rp.user_id LIKE ? 
            OR ap.user_id LIKE ? 
            OR rp.all_post_id LIKE ? 
            OR ap.post_type LIKE ? 
            OR rp.remark LIKE ?`
            : '';

        const query = `
            SELECT 
                rp.user_id AS reporting_user_id, 
                ap.user_id AS post_owner_user_id, 
                rp.all_post_id, 
                ap.post_type, 
                rp.remark 
            FROM 
                report_posts AS rp 
            JOIN 
                all_posts AS ap 
            ON 
                rp.all_post_id = ap.id
            ${searchCondition}
            ORDER BY ${sortField} ${sortOrder}
            LIMIT ? OFFSET ?;
        `;

        const countQuery = `
            SELECT COUNT(*) as total 
            FROM report_posts AS rp 
            JOIN all_posts AS ap ON rp.all_post_id = ap.id
            ${searchCondition};
        `;

        const searchParams = search ? [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`] : [];
        const [results] = await db.query(query, [...searchParams, limit, offset]);
        const [[{ total }]] = await db.query(countQuery, searchParams);

        res.status(200).json({
            reported_posts_list: results,
            total,
            page,
            limit
        });
    } catch (error) {
        console.error("Error fetching reported posts:", error.message);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching reported posts data.",
            error: error.message
        });
    }
}

module.exports = { reportedPosts };
