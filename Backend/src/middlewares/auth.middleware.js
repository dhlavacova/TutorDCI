import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
// import {authorizedbuyersmarketplace} from "googleapis/build/src/apis/authorizedbuyersmarketplace/index.js";
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const auth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }
    else {
      jwt.verify(token, TOKEN_SECRET, (error, user) => {
        if (error) {
          return res.status(401).json({ message: "Token is not valid" });
        }
        req.user = user;

        next();
      })
    };
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
