const Parse = require("parse/node");

const handleRegister = async (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }

  const query = new Parse.Query("smartbrain_db");

  query.equalTo("email", email);

  const user = await query.first();

  if (user.exists) return res.status(403).json("User already exists");

  const hash = bcrypt.hashSync(password);

  db.set("name", name);
  db.set("hash", hash);
  db.set("email", email);

  try {
    let result = await db.save();

    if (result !== null) {
      return res.status(200).json(result);
    }
  } catch (error) {
    return res.status(500).json("Error registering user \t" + error);
  }
};

module.exports = {
  handleRegister,
};
