import user from "../models/user.js";

const existingUserBook = async (req, res, next) => {
  const userId = await user.findOne({ name: req.body.user });
  if (!userId) return res.status(500).send({ message: "User not found" });

  req.body.user = userId._id

  next ();
};

export default { existingUserBook };
