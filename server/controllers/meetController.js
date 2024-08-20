const db = require("../config/database.js");

const getMeetings = async (req, res) => {
  // Define the SQL query to retrieve all meeting details along with user names
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
LEFT JOIN users AS meeting_user ON schedule_meets.user_id = meeting_user.id;


  `;

  try {
    const [results] = await db.query(meetingSchedule);
    res.json(results);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getMeetings,
};


module.exports = {
  getMeetings,
};
