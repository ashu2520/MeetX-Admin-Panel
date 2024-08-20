const db = require("../config/database.js");

const getWalletHistory = async (req, res) => {
  // SQL query to select only the required columns from the wallet_histories table
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
  `;

  try {
    const [results] = await db.query(walletHistoryQuery);
    res.json(results);
  } catch (error) {
    console.error("Error fetching wallet history:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getWalletHistory,
};
