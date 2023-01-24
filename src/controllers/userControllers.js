import UserSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";

const getAll = async (req, res) => {
  UserSchema.find(function (err, users) {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(200).send(users);
  });
};

export default {
  getAll,
};
