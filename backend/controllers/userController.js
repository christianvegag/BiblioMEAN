import user from "../models/user.js";
import role from "../models/role.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const registerUser = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.adress ||
    !req.body.phone ||
    !req.body.email ||
    !req.body.password ||
    !req.body.description
  )
    return res.status(400).send({ message: "Incomplete data" });

  const existingUser = await user.findOne({ email: req.body.email });

  if (existingUser)
    return res.status(500).send({ message: "The user is already registered" });

  const passHash = await bcrypt.hash(req.body.password, 10);

  const roleId = await role.findOne({ name: "user" });

  if (!roleId) return res.status(500).send({ message: "No role was assigned" });

  const userSchema = new user({
    name: req.body.name,
    adress: req.body.adress,
    phone: req.body.phone,
    email: req.body.email,
    password: passHash,
    description: req.body.description,
    role: roleId._id,
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

export default { registerUser };
