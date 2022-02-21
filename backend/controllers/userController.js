import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerUser = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.adress ||
    !req.body.phone ||
    !req.body.password ||
    !req.body.description
  )
    return res.status(400).send({ message: "Incomplete data" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const userSchema = new user({
    name: req.body.name,
    adress: req.body.adress,
    phone: req.body.phone,
    email: req.body.email,
    password: passHash,
    description: req.body.description,
    role: req.body.role,
    dbStatus: true,
  });

  const result = await userSchema.save();
  if (!result)
    return res.status(500).send({ message: "Failed to register user" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result.id,
          name: result.name,
          role: result.role,
          adress: result.adress,
          phone: result.phone,
          description: result.description,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Register error" });
  }
};

const listUserAdmin = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();

  return users.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ users });
};

const listUser = async (req, res) => {
  let users = await user
    .find({
      $and: [{ name: new RegExp(req.params["name"]) }, { dbStatus: "true" }],
    })
    .populate("role")
    .exec();

  return users.length === 0
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ users });
};

const login = async (req, res) => {
  const userLogin = await user.findOne({ email: req.body.email });
  if (!userLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  if (!userLogin.dbStatus)
    return res.status(400).send({ message: "User no found" });

  const passHash = await bcrypt.compare(req.body.password, userLogin.password);
  if (!passHash)
    return res.status(400).send({ message: "Wrong email or password" });

  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: userLogin.id,
          name: userLogin.name,
          role: userLogin.role,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(500).send({ message: "Login error" });
  }
};

const deleteUser = async (req, res) => {
  if (!req.params["_id"])
    return res.status(400).send({ message: "Incomplete data" });

  // const users = await user.findByIdAndDelete(req.body._id); eliminar si

  const users = await user.findByIdAndUpdate(req.params["_id"], {
    dbStatus: false,
  });

  return !users
    ? res.status(400).send({ message: "Error deleting user" })
    : res.status(200).send({ message: "User deleted" });
};

const updateUser = async (req, res) => {
  if (!req.body._id || !req.body.name || !req.body.role || !req.body.email)
    return res.status(400).send({ message: "Incomplete data" });

  let pass = "";

  if (!req.body.password) {
    const findUser = await user.findOne({ email: req.body.email });
    pass = findUser.password;

  } else {
    pass = await bcrypt.hash(req.body.password, 10);
  }

  const editUser = await user.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    adress: req.body.adress,
    phone: req.body.phone,
    password: pass,
    description: req.body.description,
    role: req.body.role,
    modifyDate: new Date(),
  });

  if (!editUser) return res.status(500).send({ message: "Error editing user" });
  return res.status(200).send({ message: "User updated" });
};

export default {
  registerUser,
  listUser,
  listUserAdmin,
  login,
  deleteUser,
  updateUser,
};
