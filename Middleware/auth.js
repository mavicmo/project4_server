import jwtFunctions from "../auth/jwt.js";

const authJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log(authHeader);
      console.log(`hit`);
      return res.status(403).send("A token is required for authentication");
    } else {
      const user = jwtFunctions.decodeUser(authHeader);

      req.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};

export default authJWT;
