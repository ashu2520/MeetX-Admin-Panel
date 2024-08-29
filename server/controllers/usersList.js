const db = require('../config/database');

const usersList = async (req, res) => {
    try {
        // Destructure and parse query parameters
        let { page = 1, limit = 10, search = "", sortBy = "id", sortOrder = "ASC" } = req.query;

        // Validate and sanitize page and limit
        page = parseInt(page);
        limit = parseInt(limit);

        if (isNaN(page) || page <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid page number. It should be a positive integer.',
            });
        }

        if (isNaN(limit) || limit <= 0 || limit > 100) {
            return res.status(400).json({
                success: false,
                message: 'Invalid limit. It should be a positive integer between 1 and 100.',
            });
        }

        // Validate sortBy and sortOrder
        const validSortByFields = ['id', 'username', 'email', 'mobile_number', 'created_at'];
        const validSortOrder = ['ASC', 'DESC'];

        if (!validSortByFields.includes(sortBy)) {
            return res.status(400).json({
                success: false,
                message: `Invalid sortBy field. It should be one of the following: ${validSortByFields.join(', ')}.`,
            });
        }

        if (!validSortOrder.includes(sortOrder.toUpperCase())) {
            return res.status(400).json({
                success: false,
                message: `Invalid sortOrder. It should be either 'ASC' or 'DESC'.`,
            });
        }

        // Calculate offset for pagination
        const offset = (page - 1) * limit;

        // Search clause
        const searchClause = search ? `WHERE username LIKE ? OR email LIKE ? OR mobile_number LIKE ?` : "";
        // Query to fetch user data
        const usersBasicInfoQuery = `
            SELECT 
                id, 
                username, 
                email, 
                mobile_number, 
                CASE 
                    WHEN verified = 1 THEN 'verified' 
                    ELSE 'unverified' 
                END AS verified_status,
                DATE(created_at) AS created_at
            FROM 
                users
            ${searchClause}
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ? OFFSET ?;
        `;

        const queryParams = search ? [`%${search}%`, `%${search}%`, `%${search}%`, limit, offset] : [limit, offset];
        const [table_data] = await db.query(usersBasicInfoQuery, queryParams);

        // Formatting the date
        const formattedData = table_data.map(user => ({
            ...user,
            created_at: user.created_at.toISOString().split('T')[0]
        }));

        // Query to get the total number of records for pagination
        const totalDataQuery = `SELECT count(*) as total_data FROM users ${searchClause}`;
        const totalDataParams = search ? [`%${search}%`, `%${search}%`, `%${search}%`] : [];
        const [totalDataResult] = await db.query(totalDataQuery, totalDataParams);
        const totalData = totalDataResult[0].total_data;

        const totalPages = Math.ceil(totalData / limit);

        res.status(200).json({
            users_table_data: formattedData,
            pagination: {
                total_pages: totalPages,
                current_page: page,
                limit: limit,
                total_users: totalData
            }
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching user data.',
            error: error.message
        });
    }
};

module.exports = { usersList };
