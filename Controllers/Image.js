const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: process.env.API_CLARIFAI,
});

const handleApiCall = async (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImagePut = async (req, res, query) => {
  const { email } = req.body;
  console.log("Email \t" + email);
  try {
    query.equalTo("email", email);

    let user = await query.first();

    if (user.isDataAvailable) {
      updateUser(user);
    }
    return res.status(200).json("Success!!");
  } catch (error) {
    res.status(400).json("unable to get entries \t" + error);
  }
};

async function updateUser(userFound) {
  const entriesCount = userFound.get("entries");
  userFound.set("entries", entriesCount + 1);
  await userFound.save();
}

module.exports = {
  handleImagePut,
  handleApiCall,
};
