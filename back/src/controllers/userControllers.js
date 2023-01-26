import UserSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";

const getAll = async (req, res) => {
  UserSchema.find(function (err, users) {
    if (err) {
      res.status(500).json({
        statusCode: 500,
        message: err.message,
      });
    }
    res.status(200).json({
      statusCode: 200,
      data: {
        users,
      },
    });
  });
};

const getUserById = async (req, res) => {
  try {
    const userFound = await UserSchema.findById(req.params.id);

    if (userFound) {
      res.status(200).json({
        statusCode: 200,
        message: `The "${userFound.name}" user not found:`,
        data: {
          userFound,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      statusCode: 200,
      message: `This user couldn't be found. Please check if the id exists or try again later! ${err.message}`,
    });
  }
};

const getByNameOrNickname = async (req, res) => {
  try {
    const user = await UserSchema.find({
      $or: [{ name: req.query.name }, { nickname: req.query.name }],
    });

    res.status(200).json({
      statusCode: 200,
      data: {
        user,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const createUser = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  try {
    const newUser = new UserSchema(req.body);

    const savedUser = await newUser.save();

    res.status(201).json({
      statusCode: 201,
      message: "User adicionado com sucesso",
      data: {
        savedUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: err.message,
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await UserSchema.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      statusCode: 200,
      message: "User atualizada com sucesso",
      data: {
        user,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const deleteUserById = async (req, res) => {
  try {
    await UserSchema.findByIdAndDelete(req.params.id);

    res.status(200).json({
      statusCode: 200,
      message: "User deletada com sucesso",
    });
  } catch (err) {
    res.status(400).json({
      statusCode: 400,
      message: err.message,
    });
  }
};

export default {
  getAll,
  getUserById,
  getByNameOrNickname,
  createUser,
  updateUserById,
  deleteUserById,
};
