const db = require("../config/database.js");

// Utility function to check if a value is a positive integer
const isInteger = (value) => {
  return Number.isInteger(Number(value)) && Number(value) > 0;
};

const getMeetings = async (req, res) => {
  let { sortField = 'id', sortOrder = 'asc', searchTerm = '', page = 1, rowsPerPage = 5 } = req.query;

  // Validate page and rowsPerPage to ensure they are positive integers
  if (!isInteger(page)) {
    return res.status(400).json({ error: 'Invalid page number. It must be a positive integer.' });
  }

  if (!isInteger(rowsPerPage)) {
    return res.status(400).json({ error: 'Invalid rows per page value. It must be a positive integer.' });
  }

  // Validate sortOrder to ensure it's either 'asc' or 'desc'
  if (!['asc', 'desc'].includes(sortOrder.toLowerCase())) {
    return res.status(400).json({ error: "Invalid sort order. It must be either 'asc' or 'desc'." });
  }

  const offset = (page - 1) * rowsPerPage;

  let whereClause = '';
  // Agar user ne koi search term di hai, to hum SQL WHERE clause ko set kar rahe hain,
  // taaki initiator ya meeting user ke username mein search kiya ja sake.
  if (searchTerm) {
    whereClause = `WHERE initiator_user.username LIKE '%${searchTerm}%' 
                   OR meeting_user.username LIKE '%${searchTerm}%'`;
  }

  // Adjusting the sorting logic
  // Listen by Default its sorted by user id !>>
  let sortBy = 'schedule_meets.id';  // Default sort diya hai !..

  // here that column 
  // Meeting Initiator
  // Name is done here 
  if (sortField === 'initiator_name') {
    sortBy = 'initiator_user.username';
  } 
  // here that column 
  // Meeting with
  // User is done here 
  else if (sortField === 'meeting_user_name') {
    sortBy = 'meeting_user.username';
  } 
  // else we will sort  by the field !>>
  else {
    sortBy = `schedule_meets.${sortField}`;
  }

  // 1 left join Schedule table ko user table se join kr rha hai !...
  // basically it brings the username of user jisne meeting initiate kr hai!..
  // 2 left join is also joining the tables users and schdeuled !..
  // bascially it takes username of user wth whom meeting is scheduled!..
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
    ORDER BY ${sortBy} ${sortOrder}
    LIMIT ${rowsPerPage} OFFSET ${offset};
  `;

  // Basically total meetings are get counted here!..
  const countQuery = `
    SELECT COUNT(*) as totalMeetings
    FROM schedule_meets
    LEFT JOIN users AS initiator_user ON schedule_meets.scheduling_user_id = initiator_user.id
    LEFT JOIN users AS meeting_user ON schedule_meets.user_id = meeting_user.id
    ${whereClause};
  `;

  try {
    const [results] = await db.query(meetingSchedule);
    const [countResult] = await db.query(countQuery);
    const totalMeetings = countResult[0].totalMeetings;

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
