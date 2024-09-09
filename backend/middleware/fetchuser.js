const jwt = require("jsonwebtoken");
JWT_SECRET = "Enjoying the day";

const fetchuser = (req, res, next) => {
  //here get user from json wewb token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({
      error1: error.message,
      error: "Please authenticate using a valid token",
    });
  }
};

module.exports = fetchuser;
