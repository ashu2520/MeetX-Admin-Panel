const db = require("../config/database.js");

const getUserDataById = (userId) => {
    const mockData = {
      "rohan": {
        name: "Rohan",
        userId: userId,
        profile_url: "https://example.com/profile.jpg",
        connector: "10",
        connectee: "20",
        followers: "30",
        following: "40",
        email: "example@email.com",
        mobile: "1234567890",
      },
    };
  
    return mockData[userId] || null;
  };
  
  const userProfile = (req, res) => {
    const userId = req.query.userId; 
  
    const userData = getUserDataById(userId); 
  
    if (userData) {
      res.json(userData);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  };
  
  module.exports = { userProfile };
  