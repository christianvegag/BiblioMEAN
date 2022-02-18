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

const listUser = async (req, res) => {
  let users = await user
    .find({ name: new RegExp(req.params["name"]) })
    .populate("role")
    .exec();
  if (users.length === 0)
    return res.status(400).send({ message: "No search results" });

  return res.status(200).send({ users });
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


export default { registerUser, listUser , login};
