const db = require("../config/database.js");

async function userConnections(req, res) {
    try {
        const { page = 1, limit = 10, search = '', sort = 'asc' } = req.query;
        const offset = (page - 1) * limit;

        // Convert page and limit to integers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        // Ensure sort is either 'asc' or 'desc'
        const sortOrder = sort === 'desc' ? 'DESC' : 'ASC';

        // Debug: Log page, limit, offset, search, and sort
        // console.log(`Sort: ${sortOrder}`);

        // Updated paginated, searchable, and sortable query
        const paginated_query = `
            SELECT 
                user_id,
                SUM(CASE WHEN request_type = 'sent' AND status = 'accepted' THEN 1 ELSE 0 END) AS send_Accepted,
                SUM(CASE WHEN request_type = 'sent' AND status = 'pending' THEN 1 ELSE 0 END) AS send_Pending,
                SUM(CASE WHEN request_type = 'sent' AND status = 'rejected' THEN 1 ELSE 0 END) AS send_Rejected,
                SUM(CASE WHEN request_type = 'received' AND status = 'accepted' THEN 1 ELSE 0 END) AS received_Accepted,
                SUM(CASE WHEN request_type = 'received' AND status = 'pending' THEN 1 ELSE 0 END) AS received_Pending,
                SUM(CASE WHEN request_type = 'received' AND status = 'rejected' THEN 1 ELSE 0 END) AS received_Rejected
            FROM 
          
                (
                    SELECT 
                        connector_id AS user_id,
                        'sent' AS request_type,
                        status
                    FROM 
                        connections
                    UNION ALL
                    
                    SELECT 
                        connectee_id AS user_id,
                        'received' AS request_type,
                        status
                    FROM 
                        connections
                ) AS combined_requests
            WHERE user_id LIKE ?
            GROUP BY 
                user_id
            ORDER BY 
               user_id ${sortOrder}
            LIMIT ? OFFSET ?;
        `;
        // console.log(`total query:  ${paginated_query}`)
        // Total count query
        const count_query = `
            SELECT COUNT(DISTINCT user_id) AS total FROM (
                SELECT connector_id AS user_id FROM connections
                UNION ALL
                SELECT connectee_id AS user_id FROM connections
            ) AS combined_requests
            WHERE user_id LIKE ?;
        `;

        // Fetch paginated results
        const [results] = await db.query(paginated_query, [`%${search}%`, limitNumber, offset]);
        // console.log('Paginated Query Results:', results);

        // Fetch total count
        const [[{ total }]] = await db.query(count_query, [`%${search}%`]);
        // console.log('Total Count:', total);

        // No need to transform data for sorting; it's already sorted
        // Transform data
        const transformedData = results.map(({ user_id, send_Accepted, send_Pending, send_Rejected, received_Accepted, received_Pending, received_Rejected }) => ({
            userId: user_id,
            send_Accepted,
            send_Pending,
            send_Rejected,
            received_Accepted,
            received_Pending,
            received_Rejected
        }));

        // console.log('Transformed Data:', JSON.stringify(transformedData, null, 2));
        // console.log(transformedData);

        res.status(200).json({
            connections_data: transformedData,
            currentPage: pageNumber,
            totalPages: Math.ceil(total / limitNumber),
            totalRecords: total,
        });
    } catch (error) {
        console.error('Error fetching user connections data:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching user connections data.',
            error: error.message
        });
    }
}

module.exports = { userConnections };
