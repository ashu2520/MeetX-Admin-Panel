const jwt = require("jsonwebtoken")

const validateToken = async (req, res, next) => {
    let token;
  
    let authHeader = req.headers.Authorization || req.headers.authorization;
  
    try{
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("Admin is not authorized!");
        }
        req.admin = decoded;
        next();
      });
  
      if(!token){
          res.status(401);
          throw new Error("User is not Authorized or token is missing");
      }
    }
}
catch(err)
{
    res.status(401).json({error:err.message});
}
}
  
module.exports={validateToken};