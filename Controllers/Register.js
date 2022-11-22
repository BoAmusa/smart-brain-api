const handleRegister = async (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }

  const hash = bcrypt.hashSync(password);

  db.set("name", name);
  db.set("hash", hash);
  db.set("email", email);

  try {
    let result = await db.save();

    if (result !== null) {
      return res.status(200).json("User created with success!");
    }
  } catch (error) {
    return res.status(500).json("User already exists \t" + result);
  }
};

module.exports = {
  handleRegister,
};
