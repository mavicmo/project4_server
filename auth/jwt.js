import jwt from "jsonwebtoken";

// creates a jwt
const createToken = (user) => {
  // payload for token
  const payload = {
    email: user.email,
    _id: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return token;
};

// decode the jwt token
const decodeUser = (token) => {
  let decoded = jwt.verify(token, process.env.JWT_SECRET);

  return decoded;
};

const jwtFunctions = {
  createToken,
  decodeUser,
};

export default jwtFunctions;
