import jwt from "jsonwebtoken";

const generateAuthToken = (_id, name, email, isAdmin, doNotLogout) => {
  return jwt.sign({ _id, name, email, isAdmin }, process.env.JWT_SECRET_KEY, {
    expiresIn: doNotLogout ? "7d" : "7h",
  });
};

export { generateAuthToken };
