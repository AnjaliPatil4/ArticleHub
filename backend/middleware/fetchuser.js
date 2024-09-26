const jwt = require("jsonwebtoken");
const JWT_SECRET = "Enjoying the day";

const fetchuser = (req, res, next) => {
  // Get user from JSON web token and add id to req object
  const token = req.header("auth-token");

  // Check if the token is missing
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);

    req.user = data.user; // Attach the user ID to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    return res.status(401).send({
      error1: error.message,
      error: "Please authenticate using a valid token",
    });
  }
};

module.exports = fetchuser;
