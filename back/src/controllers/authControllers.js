import UserSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET;

const login = (req, res) => {
  try {
    UserSchema.findOne({ email: req.body.email }, (error, user) => {
      if (!user) {
        return res.status(401).json({
          statusCode: 401,
          message: "User not found",
          data: {
            email: `${req.body.email}`,
          },
        });
      }

      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        return res.status(401).json({
          statusCOde: 401,
          message: "Not authorized",
        });
      }

      const token = jwt.sign({ name: user.name }, SECRET);

      res.status(200).json({
        statusCode: 200,
        message: "Login authorized",
        data: {
          token,
        },
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
};

const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: "Access denied",
    });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (e) {
    return res.status(500).json({
      statusCode: 500,
      message: "Please enter a valid token",
    });
  }
};

export default {
  checkToken,
  login,
};
