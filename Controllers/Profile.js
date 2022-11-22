const handleProfileGet = async (req, res, query) => {
  const { email } = req.params;

  try {
    query.equalTo("email", email);

    const user = await query.first();

    if (user.isDataAvailable) {
      res.json(user);
    }
  } catch (err) {
    res.status(400).json("error getting user");
  }
};

module.exports = {
  handleProfileGet,
};
