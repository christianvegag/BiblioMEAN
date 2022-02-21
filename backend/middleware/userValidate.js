import user from "../models/user.js";


const existingUser = async (req, res, next) => {
    if (!req.body.email)
    return res.status(400).send({ message: "Incomplete data" });

    const existingEmail = await user.findOne({ email: req.body.email });

    if (existingEmail)
      return res.status(500).send({ message: "The user is already registered" });

      next();
};

const status = async (req, res, next) => {

  const status = await user.findOne({ email: req.body.email });

  if (status.dbStatus == false)
    return res.status(500).send({ message: "User not found" });

    next();
};

export default {existingUser, status}