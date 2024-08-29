const db = require("../config/database.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAdmins = async (req, res) => {
  const query = `select * from admins`;

  try {
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createAdmin = async (req, res) => {
  const {
    admin_id,
    admin_name,
    admin_username,
    admin_email,
    admin_status,
    role_id,
    admin_password,
  } = req.body;

  const hashedPassword = await bcrypt.hash(admin_password, 10);

  const query = `insert into admins(admin_id, admin_name, admin_username, admin_email, admin_status, role_id, admin_password) values (?,?,?,?,?,?,?)`;

  try {
    const [results] = await db.query(query, [
      admin_id,
      admin_name,
      admin_username,
      admin_email,
      admin_status,
      role_id,
      hashedPassword,
    ]);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginAdmin = async (req, res) => {
  const { admin_email, admin_password } = req.body;

  const query = `select * from admins where admin_email=?`;

  try {
    const [availableAdmin] = await db.query(query, [admin_email]);

    if (availableAdmin.length === 0) throw new Error("Admin not found");

    const hashedPassword = availableAdmin[0].admin_password;

    const isMatch = await bcrypt.compare(admin_password, hashedPassword);

    if (!isMatch) throw new Error("Password doesn't match");

    const token = jwt.sign(
      {
        admin_id: availableAdmin[0].admin_id,
        admin_email: availableAdmin[0].admin_email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({accesstoken:token});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const currentAdmin=async(req,res)=>{
    const admin_id = req.admin.admin_id;

    const query="select * from admins where admin_id=?";
    try{
        const [availableAdmin]=await db.query(query,[admin_id]);

        if(availableAdmin.length===0)
        throw new Error("Admin not found");

        res.status(200).json(availableAdmin[0]);
    }
    catch(err)
    {
        res.status(500).json({error:err.message});
    }
}

const resetPassword=async(req,res)=>{
  const admin_id = req.admin.admin_id;

  const query="select * from admins where admin_id=?";

  try{
    const [availableAdmin]=await db.query(query,[admin_id]);

    const {old_password,new_password}=req.body;

    const hashedPassword = availableAdmin[0].admin_password;
    const isMatch = await bcrypt.compare(old_password, hashedPassword);

    if(availableAdmin.length===0)
    throw new Error("Admin not found");

    if(!isMatch)
    throw new Error("Incorrect Password");

    const hashedNewPassword = await bcrypt.hash(new_password, 10);

    const updateQuery="update admins set admin_password=? where admin_id=?";

    await db.query(updateQuery,[hashedNewPassword,admin_id]);
    res.status(200).json({message:"Password updated successfully"});
}
catch(err)
{
    res.status(500).json({error:err.message});
}

}
module.exports = { getAdmins, createAdmin, loginAdmin, currentAdmin, resetPassword };
