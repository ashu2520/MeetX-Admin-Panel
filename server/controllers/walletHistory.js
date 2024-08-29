const db = require("../config/database.js");

const getWalletHistory = async (req, res) => {
  let { search = "", sortField = "user_id", sortOrder = "asc", page = 1, limit = 10 } = req.query;

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

  // Validate sortField and sortOrder
  const validSortFields = ['user_id', 'schedule_id', 'type', 'accountNo', 'ifsc', 'upi', 'status', 'amount'];
  const validSortOrders = ['asc', 'desc'];

  if (!validSortFields.includes(sortField)) {
    return res.status(400).json({
      success: false,
      message: `Invalid sortField. It should be one of the following: ${validSortFields.join(', ')}.`,
    });
  }

  if (!validSortOrders.includes(sortOrder.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: `Invalid sortOrder. It should be either 'asc' or 'desc'.`,
    });
  }

  // Calculate offset for pagination
  const offset = (page - 1) * limit;

  // SQL query to select the required columns from the wallet_histories table with search, sort, and pagination
  const walletHistoryQuery = `
    SELECT
      wallet_histories.user_id,
      wallet_histories.schedule_id,
      wallet_histories.type,
      wallet_histories.ac_no AS accountNo,
      wallet_histories.ifsc,
      wallet_histories.upi,
      wallet_histories.verify_status AS status,
      wallet_histories.amount
    FROM wallet_histories
    WHERE wallet_histories.deleted_at IS NULL
      AND (wallet_histories.user_id LIKE ? 
        OR wallet_histories.schedule_id LIKE ?
        OR wallet_histories.type LIKE ?
        OR wallet_histories.ac_no LIKE ?
        OR wallet_histories.ifsc LIKE ?
        OR wallet_histories.upi LIKE ?
        OR wallet_histories.verify_status LIKE ?
        OR wallet_histories.amount LIKE ?)
    ORDER BY ${sortField} ${sortOrder}
    LIMIT ? OFFSET ?
  `;

  
  try {
    const [results] = await db.query(walletHistoryQuery, [
      `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`,
      `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`,
      limit, offset
    ]);

    // Get total count of records for pagination
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM wallet_histories
      WHERE wallet_histories.deleted_at IS NULL
        AND (wallet_histories.user_id LIKE ? 
          OR wallet_histories.schedule_id LIKE ?
          OR wallet_histories.type LIKE ?
          OR wallet_histories.ac_no LIKE ?
          OR wallet_histories.ifsc LIKE ?
          OR wallet_histories.upi LIKE ?
          OR wallet_histories.verify_status LIKE ?
          OR wallet_histories.amount LIKE ?)
    `;
    const [countResult] = await db.query(countQuery, [
      `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`,
      `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`
    ]);

    res.json({ data: results, total: countResult[0].total });
  } catch (error) {
    console.error("Error fetching wallet history:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getWalletHistory,
};
