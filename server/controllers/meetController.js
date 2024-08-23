const db = require("../config/database.js");

const getMeetings = async (req, res) => {
  const { sortField = 'id', sortOrder = 'ASC', searchTerm = '', page = 1, rowsPerPage = 5 } = req.query;

  // Calculate offset for pagination
  const offset = (page - 1) * rowsPerPage;

  let whereClause = '';
  if (searchTerm) {
    whereClause = `WHERE initiator_user.username LIKE '%${searchTerm}%' 
                   OR meeting_user.username LIKE '%${searchTerm}%'`;
  }

  const meetingSchedule = `
    SELECT
      schedule_meets.id,
      schedule_meets.user_id,
      schedule_meets.scheduling_user_id,
      schedule_meets.skill_id,
      schedule_meets.interest_id,
      schedule_meets.date,
      schedule_meets.start_time,
      schedule_meets.end_time,
      schedule_meets.charge,
      schedule_meets.amount,
      schedule_meets.status,
      schedule_meets.created_at,
      schedule_meets.updated_at,
      schedule_meets.deleted_at,
      initiator_user.username AS initiator_name,
      meeting_user.username AS meeting_user_name
    FROM schedule_meets
    LEFT JOIN users AS initiator_user ON schedule_meets.scheduling_user_id = initiator_user.id
    LEFT JOIN users AS meeting_user ON schedule_meets.user_id = meeting_user.id
    ${whereClause}
    ORDER BY
      CASE
        WHEN '${sortField}' = 'initiator_name' THEN initiator_user.username
        WHEN '${sortField}' = 'meeting_user_name' THEN meeting_user.username
        ELSE schedule_meets.${sortField}
      END ${sortOrder}
    LIMIT ${rowsPerPage} OFFSET ${offset};
  `;

  const countQuery = `
    SELECT COUNT(*) as totalMeetings
    FROM schedule_meets
    LEFT JOIN users AS initiator_user ON schedule_meets.scheduling_user_id = initiator_user.id
    LEFT JOIN users AS meeting_user ON schedule_meets.user_id = meeting_user.id
    ${whereClause};
  `;

  try {
    // Query to get paginated meetings
    const [results] = await db.query(meetingSchedule);
    console.log("Fetched meetings data:", results); // Debugging

    // Query to get total count of meetings
    const [countResult] = await db.query(countQuery);
    const totalMeetings = countResult[0].totalMeetings;
    console.log("Total meetings count:", totalMeetings); // Debugging

    res.json({
      meetings: results,
      totalMeetings,
      totalPages: Math.ceil(totalMeetings / rowsPerPage),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getMeetings,
};