const handleSignin = async (req, res, query, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }

  try {
    query.equalTo("email", email);

    const object = query.first();

    if (object === null) {
      return res.status(400).json("unable to get user");
    }

    const isValid = bcrypt.compareSync(password, object.get("hash"));

    if (isValid) {
      return res.json(object);
    } else {
      return res.json("Error signing in ");
    }
  } catch (error) {
    return res.status(400).json("wrong credentials \t" + error);
  }
};

module.exports = {
  handleSignin,
};
